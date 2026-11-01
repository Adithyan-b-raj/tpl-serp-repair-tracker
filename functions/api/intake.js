// Cloudflare Pages Functions - Device Intake API
// POST /api/intake (New Device Intake with 12-Point Inspection Checklist)

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

export async function onRequestPost({ request, env }) {
  try {
    const data = await request.json();

    const {
      customer_name,
      customer_phone,
      customer_email,
      device_type,
      brand,
      model,
      serial_number,
      imei,
      issue_description,
      priority = 'STANDARD',
      assigned_technician = 'Rahul Sharma',
      bench_number = 'Bench #03',
      checklist = {}
    } = data;

    if (!customer_name || !customer_phone || !device_type || !brand || !model || !issue_description) {
      return jsonResponse({
        success: false,
        error: 'Missing required fields: customer_name, customer_phone, device_type, brand, model, issue_description'
      }, 400);
    }

    const now = Date.now();
    const timestampStr = new Date(now).toISOString();

    // Generate unique job ticket ID: JOB-XXXX
    const randomTicketNum = Math.floor(1000 + Math.random() * 9000);
    const newJobId = `JOB-${randomTicketNum}`;

    const newJob = {
      id: newJobId,
      customer_name: customer_name.trim(),
      customer_phone: customer_phone.trim().replace(/[^0-9]/g, ''),
      customer_email: customer_email ? customer_email.trim() : null,
      device_type: device_type.trim(),
      brand: brand.trim(),
      model: model.trim(),
      serial_number: serial_number ? serial_number.trim() : 'N/A',
      imei: imei ? imei.trim() : 'N/A',
      issue_description: issue_description.trim(),
      stage: 'INTAKE',
      priority: priority.toUpperCase() === 'URGENT' ? 'URGENT' : 'STANDARD',
      assigned_technician: assigned_technician || 'Rahul Sharma',
      bench_number: bench_number || 'Bench #03',
      total_estimate_inr: 0,
      total_cost_inr: 0,
      margin_inr: 0,
      customer_approved: null,
      approval_timestamp: null,
      return_reason: null,
      warranty_days: 90,
      notes: `Intake registered at ESD front desk. Priority: ${priority}.`,
      created_at: timestampStr,
      updated_at: timestampStr
    };

    // 12-point inspection checklist
    const newChecklist = {
      job_id: newJobId,
      power_on: checklist.power_on !== undefined ? Number(checklist.power_on) : 1,
      display_touch_status: checklist.display_touch_status || 'PASS',
      biometrics_status: checklist.biometrics_status || 'PASS',
      liquid_damage_lci: checklist.liquid_damage_lci || 'WHITE',
      icloud_passcode_status: checklist.icloud_passcode_status || 'PIN_PROVIDED',
      cosmetic_scratches: checklist.cosmetic_scratches || 'MINOR_SCUFFS',
      audio_mic: checklist.audio_mic || 'PASS',
      charging_port: checklist.charging_port || 'PASS',
      camera_front_rear: checklist.camera_front_rear || 'PASS',
      wifi_bluetooth: checklist.wifi_bluetooth || 'PASS',
      battery_health_pct: checklist.battery_health_pct ? Number(checklist.battery_health_pct) : 90,
      physical_inspection_notes: checklist.physical_inspection_notes || 'Initial intake visual inspection completed.',
      updated_at: timestampStr
    };

    const initialTimeline = [
      {
        id: now,
        job_id: newJobId,
        stage: 'INTAKE',
        title: 'Device Checked In & 12-Point Inspection Completed',
        notes: `Intake completed for ${customer_name}. Assigned to ${newJob.assigned_technician} on ${newJob.bench_number}.`,
        technician: 'Front Desk ESD Reception',
        timestamp: timestampStr,
        photo_url: null
      }
    ];

    // D1 Insert if available
    if (env && env.DB) {
      try {
        await env.DB.prepare(`
          INSERT INTO repair_jobs (
            id, customer_name, customer_phone, customer_email, device_type, brand, model,
            serial_number, imei, issue_description, stage, priority, assigned_technician,
            bench_number, total_estimate_inr, total_cost_inr, margin_inr, notes, created_at, updated_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
          newJob.id, newJob.customer_name, newJob.customer_phone, newJob.customer_email,
          newJob.device_type, newJob.brand, newJob.model, newJob.serial_number, newJob.imei,
          newJob.issue_description, newJob.stage, newJob.priority, newJob.assigned_technician,
          newJob.bench_number, 0, 0, 0, newJob.notes, timestampStr, timestampStr
        ).run();

        await env.DB.prepare(`
          INSERT INTO intake_checklists (
            job_id, power_on, display_touch_status, biometrics_status, liquid_damage_lci,
            icloud_passcode_status, cosmetic_scratches, audio_mic, charging_port,
            camera_front_rear, wifi_bluetooth, battery_health_pct, physical_inspection_notes, updated_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
          newChecklist.job_id, newChecklist.power_on, newChecklist.display_touch_status,
          newChecklist.biometrics_status, newChecklist.liquid_damage_lci,
          newChecklist.icloud_passcode_status, newChecklist.cosmetic_scratches,
          newChecklist.audio_mic, newChecklist.charging_port, newChecklist.camera_front_rear,
          newChecklist.wifi_bluetooth, newChecklist.battery_health_pct,
          newChecklist.physical_inspection_notes, timestampStr
        ).run();

        await env.DB.prepare(`
          INSERT INTO job_timeline (job_id, stage, title, notes, technician, timestamp)
          VALUES (?, 'INTAKE', 'Device Checked In & 12-Point Inspection Completed', ?, ?, ?)
        `).bind(newJobId, `Device checked in for ${customer_name}`, 'Front Desk ESD Reception', timestampStr).run();
      } catch (e) {
        console.warn('D1 intake insert error:', e.message);
      }
    }

    // Update in-memory store
    const store = getStore();
    store.jobs.set(newJobId, newJob);
    store.checklists.set(newJobId, newChecklist);
    store.estimates.set(newJobId, []);
    store.timeline.set(newJobId, initialTimeline);

    return jsonResponse({
      success: true,
      job_id: newJobId,
      message: `Intake completed successfully for ${customer_name} (#${newJobId}).`,
      job: {
        ...newJob,
        checklist: newChecklist,
        estimates: [],
        timeline: initialTimeline
      }
    }, 201);
  } catch (err) {
    return jsonResponse({ success: false, error: err.message }, 500);
  }
}
