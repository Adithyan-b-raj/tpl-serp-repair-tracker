// Cloudflare Pages Functions - Wildcard Route Handler & API Catalog
// Movement P: High-Precision Technical Diagnostic & Repair Stepper

import { jsonResponse, getStore } from './_store.js';

export async function onRequest({ request }) {
  const url = new URL(request.url);
  const store = getStore();

  return jsonResponse({
    service: 'tpl-serp-repair-tracker',
    title: 'APEX FIX // Diagnostic Workbench & Job-Sheet Tracker',
    archetypes: {
      customer: 'technical-repair-stepper',
      admin: 'repair-bench-kanban'
    },
    status: 'operational',
    version: '2026.11-p-movement',
    telemetry: {
      active_jobs: store.jobs.size,
      inventory_skus: store.parts.size,
      esd_calibration: 'ISO-9001:2026 ESD-S20.20 Pass',
      server_time: new Date().toISOString()
    },
    routes: [
      { path: '/api/repairs?job=JOB-8842', method: 'GET', description: 'Query repair job by job_id, serial, imei or phone' },
      { path: '/api/repairs', method: 'POST', description: 'Approve or decline repair estimate' },
      { path: '/api/kanban', method: 'GET', description: '5-Stage Kanban board data and stage counts' },
      { path: '/api/kanban', method: 'POST', description: 'Bump job stage between Kanban columns' },
      { path: '/api/intake', method: 'POST', description: 'Register new device intake with 12-point inspection' },
      { path: '/api/parts', method: 'GET', description: 'Spare parts inventory catalog with margin analysis' },
      { path: '/api/parts', method: 'POST', description: 'Add inventory part or attach calculated estimate' }
    ]
  });
}
