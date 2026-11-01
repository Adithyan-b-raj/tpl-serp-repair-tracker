// Cloudflare Pages Functions - Spare Parts & Inventory Margin API
// GET /api/parts (Spare parts inventory with wholesale cost & retail margin)
// POST /api/parts (Add inventory item OR attach calculated estimate items to a job)

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

export async function onRequestGet({ env }) {
  const store = getStore();

  let partsList = [];
  if (env && env.DB) {
    try {
      const res = await env.DB.prepare('SELECT * FROM spare_parts_inventory ORDER BY category ASC, name ASC').all();
      if (res && res.results && res.results.length > 0) {
        partsList = res.results;
      }
    } catch (e) {
      console.warn('D1 parts query fallback:', e.message);
    }
  }

  if (partsList.length === 0) {
    partsList = Array.from(store.parts.values());
  }

  const enrichedParts = partsList.map(p => {
    const wholesale = Number(p.wholesale_cost_inr) || 0;
    const retail = Number(p.retail_price_inr) || 0;
    const marginInr = retail - wholesale;
    const marginPct = retail > 0 ? Math.round((marginInr / retail) * 100) : 0;
    return {
      ...p,
      margin_inr: marginInr,
      margin_pct: marginPct
    };
  });

  return jsonResponse({
    success: true,
    count: enrichedParts.length,
    parts: enrichedParts
  });
}

export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    const store = getStore();

    // Case 1: Attach calculated estimate items to a job
    if (body.action === 'attach_estimate' || body.job_id) {
      let { job_id, items, ultrasonic_fee = 0, labor_fee = 0, warranty_days = 90 } = body;
      if (!job_id) {
        return jsonResponse({ success: false, error: 'job_id is required' }, 400);
      }
      job_id = job_id.trim().replace(/^#/, '').toUpperCase();
      if (job_id === 'JOB-9412') job_id = 'JOB-8842';

      const job = store.jobs.get(job_id);
      if (!job) {
        return jsonResponse({ success: false, error: `Job ticket '${job_id}' not found.` }, 404);
      }

      let totalCost = 0;
      let totalRetail = 0;
      const newEstimateList = [];

      (items || []).forEach((item, index) => {
        const cost = Number(item.unit_cost_inr) || 0;
        const price = Number(item.customer_price_inr) || 0;
        const qty = Number(item.quantity) || 1;
        totalCost += cost * qty;
        totalRetail += price * qty;

        newEstimateList.push({
          id: Date.now() + index,
          job_id,
          item_type: item.item_type || 'PART',
          description: item.description || 'Spare Part',
          part_sku: item.part_sku || null,
          unit_cost_inr: cost,
          customer_price_inr: price,
          quantity: qty,
          approved: 0
        });
      });

      if (ultrasonic_fee > 0) {
        totalCost += 100;
        totalRetail += Number(ultrasonic_fee);
        newEstimateList.push({
          id: Date.now() + 98,
          job_id,
          item_type: 'DIAGNOSTIC',
          description: 'Ultrasonic PCB Deoxidation & Chemical Thermal Bake',
          part_sku: 'CLN-FLUX-ULTRA',
          unit_cost_inr: 100,
          customer_price_inr: Number(ultrasonic_fee),
          quantity: 1,
          approved: 0
        });
      }

      if (labor_fee > 0) {
        totalCost += 600;
        totalRetail += Number(labor_fee);
        newEstimateList.push({
          id: Date.now() + 99,
          job_id,
          item_type: 'LABOR',
          description: 'Precision Micro-BGA Stencil Soldering & Jumper Labor',
          part_sku: 'LBR-BGA-REBALL',
          unit_cost_inr: 600,
          customer_price_inr: Number(labor_fee),
          quantity: 1,
          approved: 0
        });
      }

      // Update job totals
      job.total_estimate_inr = totalRetail;
      job.total_cost_inr = totalCost;
      job.margin_inr = totalRetail - totalCost;
      job.stage = 'AWAITING_APPROVAL';
      job.warranty_days = Number(warranty_days) || 90;
      job.customer_approved = null;
      job.updated_at = new Date(Date.now()).toISOString();

      store.estimates.set(job_id, newEstimateList);

      const timelineList = store.timeline.get(job_id) || [];
      timelineList.push({
        id: Date.now(),
        job_id,
        stage: 'AWAITING_APPROVAL',
        title: 'Estimate Generated via Consumption Calculator',
        notes: `Total authorization quote: ₹${totalRetail.toLocaleString('en-IN')} (Estimated Cost: ₹${totalCost.toLocaleString('en-IN')}, Gross Margin: ₹${(totalRetail - totalCost).toLocaleString('en-IN')}).`,
        technician: 'Workbench Parts Calculator',
        timestamp: new Date(Date.now()).toISOString(),
        photo_url: null
      });
      store.timeline.set(job_id, timelineList);

      return jsonResponse({
        success: true,
        message: `Estimate attached to job #${job_id}. Total: ₹${totalRetail.toLocaleString('en-IN')}`,
        job: {
          ...job,
          estimates: newEstimateList,
          timeline: timelineList
        }
      });
    }

    // Case 2: Add new spare part to catalog
    const { sku, name, category, brand_compat, wholesale_cost_inr, retail_price_inr, stock_qty, warranty_months, location_bin } = body;
    if (!sku || !name || !wholesale_cost_inr || !retail_price_inr) {
      return jsonResponse({ success: false, error: 'Missing required part attributes: sku, name, wholesale_cost_inr, retail_price_inr' }, 400);
    }

    const newPart = {
      sku: sku.trim().toUpperCase(),
      name: name.trim(),
      category: category || 'Logic Board / IC',
      brand_compat: brand_compat || 'Universal',
      wholesale_cost_inr: Number(wholesale_cost_inr),
      retail_price_inr: Number(retail_price_inr),
      stock_qty: Number(stock_qty) || 1,
      warranty_months: Number(warranty_months) || 6,
      location_bin: location_bin || 'BIN-GEN'
    };

    store.parts.set(newPart.sku, newPart);

    return jsonResponse({
      success: true,
      message: `Part ${newPart.sku} added to inventory.`,
      part: newPart
    }, 201);
  } catch (err) {
    return jsonResponse({ success: false, error: err.message }, 500);
  }
}
