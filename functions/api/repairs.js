// Cloudflare Pages Functions - Repairs API
// GET /api/repairs?job=... or ?id=... or ?phone=...
// POST /api/repairs { job_id, action: 'approve' | 'decline', customer_name, return_reason }

import { getStore, jsonResponse } from './_store.js';

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  let id = url.searchParams.get('job') || url.searchParams.get('id') || url.searchParams.get('job_id') || url.searchParams.get('query');
  const phone = url.searchParams.get('phone');

  // Strip leading '#' if present
  if (id) {
    id = id.trim().replace(/^#/, '').toUpperCase();
    // Alias demo ticket #JOB-9412 to JOB-8842 for smooth backward compatibility with legacy demo link
    if (id === 'JOB-9412') {
      id = 'JOB-8842';
    }
  }

  // Attempt D1 DB lookup if env.DB is bound
  if (env && env.DB) {
    try {
      let jobRow = null;
      if (id) {
        jobRow = await env.DB.prepare('SELECT * FROM repair_jobs WHERE id = ? OR imei = ? OR serial_number = ?').bind(id, id, id).first();
      } else if (phone) {
        const cleanPhone = phone.replace(/[^0-9]/g, '');
        jobRow = await env.DB.prepare('SELECT * FROM repair_jobs WHERE customer_phone LIKE ?').bind(`%${cleanPhone}%`).first();
      }

      if (jobRow) {
        const checklist = await env.DB.prepare('SELECT * FROM intake_checklists WHERE job_id = ?').bind(jobRow.id).first();
        const estimatesRes = await env.DB.prepare('SELECT * FROM repair_estimates WHERE job_id = ? ORDER BY id ASC').bind(jobRow.id).all();
        const timelineRes = await env.DB.prepare('SELECT * FROM job_timeline WHERE job_id = ? ORDER BY timestamp ASC').bind(jobRow.id).all();

        const store = getStore();
        return jsonResponse({
          success: true,
          job: {
            ...jobRow,
            checklist: checklist || null,
            estimates: estimatesRes.results || [],
            timeline: timelineRes.results || [],
            photos: store.photos
          }
        });
      }
    } catch (e) {
      console.warn('D1 query fallback to in-memory store:', e.message);
    }
  }

  // In-memory request-time factory store
  const store = getStore();

  if (id) {
    const job = store.jobs.get(id);
    if (!job) {
      // Try search by IMEI or serial
      for (const j of store.jobs.values()) {
        if (j.imei === id || j.serial_number === id) {
          return jsonResponse({
            success: true,
            job: {
              ...j,
              checklist: store.checklists.get(j.id) || null,
              estimates: store.estimates.get(j.id) || [],
              timeline: store.timeline.get(j.id) || [],
              photos: store.photos
            }
          });
        }
      }
      return jsonResponse({ success: false, error: `Job ticket '${id}' not found in registry.` }, 404);
    }

    return jsonResponse({
      success: true,
      job: {
        ...job,
        checklist: store.checklists.get(job.id) || null,
        estimates: store.estimates.get(job.id) || [],
        timeline: store.timeline.get(job.id) || [],
        photos: store.photos
      }
    });
  }

  if (phone) {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    for (const job of store.jobs.values()) {
      if (job.customer_phone.includes(cleanPhone) || cleanPhone.includes(job.customer_phone)) {
        return jsonResponse({
          success: true,
          job: {
            ...job,
            checklist: store.checklists.get(job.id) || null,
            estimates: store.estimates.get(job.id) || [],
            timeline: store.timeline.get(job.id) || [],
            photos: store.photos
          }
        });
      }
    }
    return jsonResponse({ success: false, error: `No active job found for phone '${phone}'.` }, 404);
  }

  // Return all jobs if no parameter
  const allJobs = Array.from(store.jobs.values()).map(job => ({
    ...job,
    checklist: store.checklists.get(job.id) || null,
    estimates: store.estimates.get(job.id) || [],
    timeline: store.timeline.get(job.id) || []
  }));

  return jsonResponse({
    success: true,
    total: allJobs.length,
    jobs: allJobs
  });
}

export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    let { job_id, action, customer_name, return_reason } = body;

    if (!job_id) {
      return jsonResponse({ success: false, error: 'Missing job_id parameter' }, 400);
    }
    job_id = job_id.trim().replace(/^#/, '').toUpperCase();
    if (job_id === 'JOB-9412') job_id = 'JOB-8842';

    if (action !== 'approve' && action !== 'decline') {
      return jsonResponse({ success: false, error: "Action must be 'approve' or 'decline'" }, 400);
    }

    const now = Date.now();
    const timestampStr = new Date(now).toISOString();

    // D1 Update if available
    if (env && env.DB) {
      try {
        if (action === 'approve') {
          await env.DB.prepare(`
            UPDATE repair_jobs
            SET stage = 'IN_REPAIR', customer_approved = 1, approval_timestamp = ?, updated_at = ?
            WHERE id = ?
          `).bind(timestampStr, timestampStr, job_id).run();

          await env.DB.prepare(`
            INSERT INTO job_timeline (job_id, stage, title, notes, technician, timestamp)
            VALUES (?, 'IN_REPAIR', 'Customer Approved Estimate', 'Customer authorized estimate via digital portal. Transferred to technician bench.', ?, ?)
          `).bind(job_id, customer_name || 'Customer Authorization Portal', timestampStr).run();
        } else {
          await env.DB.prepare(`
            UPDATE repair_jobs
            SET stage = 'READY_FOR_PICKUP', customer_approved = 0, return_reason = ?, updated_at = ?
            WHERE id = ?
          `).bind(return_reason || 'Customer declined estimate', timestampStr, job_id).run();

          await env.DB.prepare(`
            INSERT INTO job_timeline (job_id, stage, title, notes, technician, timestamp)
            VALUES (?, 'READY_FOR_PICKUP', 'Estimate Declined • Return Requested', ?, 'Customer Portal', ?)
          `).bind(job_id, return_reason || 'Return requested without repair', timestampStr).run();
        }
      } catch (e) {
        console.warn('D1 update fallback:', e.message);
      }
    }

    // Update in-memory store
    const store = getStore();
    const job = store.jobs.get(job_id);
    if (!job) {
      return jsonResponse({ success: false, error: `Job ticket '${job_id}' not found.` }, 404);
    }

    let timelineEvent = null;
    if (action === 'approve') {
      job.customer_approved = 1;
      job.stage = 'IN_REPAIR';
      job.approval_timestamp = timestampStr;
      job.updated_at = timestampStr;

      // Mark estimates as approved
      const ests = store.estimates.get(job_id) || [];
      ests.forEach(e => e.approved = 1);

      timelineEvent = {
        id: now,
        job_id,
        stage: 'IN_REPAIR',
        title: 'Customer Approved Estimate',
        notes: `Customer authorized total estimate of ₹${job.total_estimate_inr.toLocaleString('en-IN')}. Work order assigned to ${job.assigned_technician} on ${job.bench_number}.`,
        technician: customer_name ? `${customer_name} (Verified Client)` : 'Customer Authorization Portal',
        timestamp: timestampStr,
        photo_url: null
      };
    } else {
      job.customer_approved = 0;
      job.stage = 'READY_FOR_PICKUP';
      job.return_reason = return_reason || 'Customer declined estimate. Device reassembled for return.';
      job.updated_at = timestampStr;

      timelineEvent = {
        id: now,
        job_id,
        stage: 'READY_FOR_PICKUP',
        title: 'Estimate Declined • Return Without Repair',
        notes: `Customer declined repair authorization. Reason: ${job.return_reason}. Device scheduled for return handover.`,
        technician: 'Customer Portal',
        timestamp: timestampStr,
        photo_url: null
      };
    }

    const tList = store.timeline.get(job_id) || [];
    tList.push(timelineEvent);
    store.timeline.set(job_id, tList);

    return jsonResponse({
      success: true,
      action,
      job: {
        ...job,
        checklist: store.checklists.get(job_id) || null,
        estimates: store.estimates.get(job_id) || [],
        timeline: tList,
        photos: store.photos
      },
      message: action === 'approve'
        ? `Estimate of ₹${job.total_estimate_inr.toLocaleString('en-IN')} approved successfully. Technician notified!`
        : 'Repair declined. Return order confirmed.'
    });
  } catch (err) {
    return jsonResponse({ success: false, error: err.message }, 500);
  }
}
