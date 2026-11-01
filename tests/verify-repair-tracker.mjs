// Automated Verification Test Suite for tpl-serp-repair-tracker
// Tests schema, seed, HTML archetypes, whitelabel contract, and Cloudflare Pages Functions API

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ PASS: ${message}`);
  } else {
    failedTests++;
    console.error(`  ✕ FAIL: ${message}`);
  }
}

async function runTests() {
  console.log('====================================================');
  console.log('APEX FIX // Diagnostic Workbench & Job-Sheet Tracker');
  console.log('Automated Test Suite (Movement P)');
  console.log('====================================================\n');

  // 1. Static File Existence
  console.log('--- 1. File Structure & Delivery Verification ---');
  const requiredFiles = [
    'schema.sql',
    'seed.sql',
    '.gitignore',
    'wrangler.toml',
    'public/index.html',
    'public/admin.html',
    'public/theme-tokens.css',
    'public/whitelabel.js',
    'functions/api/_store.js',
    'functions/api/repairs.js',
    'functions/api/kanban.js',
    'functions/api/intake.js',
    'functions/api/parts.js',
    'functions/api/[[route]].js'
  ];

  requiredFiles.forEach(file => {
    const exists = fs.existsSync(path.join(rootDir, file));
    assert(exists, `Required file exists: ${file}`);
  });

  // 2. Gitignore check
  console.log('\n--- 2. Gitignore Verification ---');
  const gitignoreContent = fs.readFileSync(path.join(rootDir, '.gitignore'), 'utf8');
  assert(gitignoreContent.includes('.wrangler'), '.gitignore ignores .wrangler');
  assert(gitignoreContent.includes('node_modules'), '.gitignore ignores node_modules');
  assert(gitignoreContent.includes('*.log'), '.gitignore ignores *.log');

  // 3. Schema & Seed SQL Verification
  console.log('\n--- 3. D1 Relational Schema & Seed Verification ---');
  const schemaSql = fs.readFileSync(path.join(rootDir, 'schema.sql'), 'utf8');
  const seedSql = fs.readFileSync(path.join(rootDir, 'seed.sql'), 'utf8');

  const requiredTables = [
    'repair_jobs',
    'intake_checklists',
    'repair_estimates',
    'spare_parts_inventory',
    'job_timeline'
  ];
  requiredTables.forEach(tbl => {
    assert(schemaSql.includes(`CREATE TABLE IF NOT EXISTS ${tbl}`), `schema.sql creates table: ${tbl}`);
  });

  assert(seedSql.includes('iPhone 15 Pro Max'), 'seed.sql contains iPhone 15 Pro Max (Audio IC reballing)');
  assert(seedSql.includes('MacBook Pro 14" M2'), 'seed.sql contains MacBook Pro M2 Liquid Damage (CD3217)');
  assert(seedSql.includes('Ola S1 Pro'), 'seed.sql contains Ola S1 Pro EV BMS controller cell balancing');
  assert(seedSql.includes('Dell XPS 15 9530'), 'seed.sql contains Dell XPS 15 OLED display panel swap');
  assert(seedSql.includes('IC-AP-PMIC-15'), 'seed.sql contains Audio PMIC diode IC');
  assert(seedSql.includes('IC-TI-CD3217'), 'seed.sql contains CD3217 USB-C controller IC');
  assert(seedSql.includes('EV-BMS-BAL-16S'), 'seed.sql contains EV BMS cell balancer module');
  assert(seedSql.includes('SCR-DELL-XPS15'), 'seed.sql contains 3.5K OLED touch panel');

  // 4. HTML Archetypes & Movement P Verification
  console.log('\n--- 4. DOM Layout Archetypes & Movement P Contract ---');
  const indexHtml = fs.readFileSync(path.join(rootDir, 'public/index.html'), 'utf8');
  const adminHtml = fs.readFileSync(path.join(rootDir, 'public/admin.html'), 'utf8');

  assert(indexHtml.includes('data-layout-archetype="technical-repair-stepper"'), 'index.html has archetype technical-repair-stepper');
  assert(adminHtml.includes('data-layout-archetype="repair-bench-kanban"'), 'admin.html has archetype repair-bench-kanban');

  assert(indexHtml.includes('whitelabel.js'), 'index.html loads whitelabel.js');
  assert(adminHtml.includes('whitelabel.js'), 'admin.html loads whitelabel.js');

  assert(indexHtml.includes('stepper-rail'), 'index.html includes 6-stage visual diagnostic progress stepper');
  assert(indexHtml.includes('estimateApprovalCard'), 'index.html includes interactive estimate approval card');
  assert(indexHtml.includes('microscope-pmic-diode'), 'index.html includes microscope photo inspection lightbox');
  assert(indexHtml.includes('printJobSheet()'), 'index.html includes digital diagnostic job sheet print preview');

  assert(adminHtml.includes('kanban-container'), 'admin.html includes 5-stage technician Kanban board');
  assert(adminHtml.includes('intakeModal'), 'admin.html includes 12-point intake inspection drawer');
  assert(adminHtml.includes('partsCalcModal'), 'admin.html includes spare parts consumption & margin calculator');
  assert(adminHtml.includes('whatsappModal'), 'admin.html includes 1-click WhatsApp customer notification generator');

  // 5. Whitelabel Script Verification
  console.log('\n--- 5. Whitelabel Contract Verification ---');
  const wlJs = fs.readFileSync(path.join(rootDir, 'public/whitelabel.js'), 'utf8');
  assert(wlJs.includes('brand'), 'whitelabel.js handles ?brand=');
  assert(wlJs.includes('primary'), 'whitelabel.js handles ?primary=');
  assert(wlJs.includes('phone'), 'whitelabel.js handles ?phone=');
  assert(wlJs.includes('wa'), 'whitelabel.js handles ?wa=');

  // 6. Cloudflare Pages Functions API Execution
  console.log('\n--- 6. Cloudflare Functions API In-Memory Execution ---');

  // Dynamic import of API modules
  const { onRequestGet: repairsGet, onRequestPost: repairsPost } = await import('../functions/api/repairs.js');
  const { onRequestGet: kanbanGet, onRequestPost: kanbanPost } = await import('../functions/api/kanban.js');
  const { onRequestPost: intakePost } = await import('../functions/api/intake.js');
  const { onRequestGet: partsGet, onRequestPost: partsPost } = await import('../functions/api/parts.js');
  const { onRequest: wildcardHandler } = await import('../functions/api/[[route]].js');

  // 6.1 Wildcard handler
  const wildRes = await wildcardHandler({ request: new Request('http://localhost/api/health') });
  const wildData = await wildRes.json();
  assert(wildData.service === 'tpl-serp-repair-tracker', 'Wildcard API returns correct service name');
  assert(wildData.archetypes.customer === 'technical-repair-stepper', 'Wildcard API reports customer archetype');
  assert(wildData.archetypes.admin === 'repair-bench-kanban', 'Wildcard API reports admin archetype');

  // 6.2 Query repairs by job ID
  const jobReq = new Request('http://localhost/api/repairs?job=JOB-8842');
  const jobRes = await repairsGet({ request: jobReq });
  const jobData = await jobRes.json();
  assert(jobData.success === true, 'Query JOB-8842 succeeded');
  assert(jobData.job.brand === 'Apple' && jobData.job.model.includes('iPhone 15 Pro Max'), 'JOB-8842 device model matches');
  assert(jobData.job.total_estimate_inr === 4850, 'JOB-8842 estimate total is ₹4,850');
  assert(jobData.job.checklist && jobData.job.checklist.battery_health_pct === 92, '12-point checklist returned for JOB-8842');
  assert(jobData.job.photos && jobData.job.photos['microscope-pmic-diode'], 'Microscope photos returned for inspection lightbox');

  // 6.3 Query repairs by legacy alias JOB-9412
  const aliasReq = new Request('http://localhost/api/repairs?job=JOB-9412');
  const aliasRes = await repairsGet({ request: aliasReq });
  const aliasData = await aliasRes.json();
  assert(aliasData.success === true && aliasData.job.id === 'JOB-8842', 'Query alias JOB-9412 maps to JOB-8842');

  // 6.4 Query repairs by phone
  const phoneReq = new Request('http://localhost/api/repairs?phone=919447022334');
  const phoneRes = await repairsGet({ request: phoneReq });
  const phoneData = await phoneRes.json();
  assert(phoneData.success === true && phoneData.job.id === 'JOB-9413', 'Query by phone returns MacBook Pro M2 job');

  // 6.5 Approve Estimate via POST
  const approveReq = new Request('http://localhost/api/repairs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      job_id: 'JOB-8842',
      action: 'approve',
      customer_name: 'Rahul Verma'
    })
  });
  const approveRes = await repairsPost({ request: approveReq });
  const approveData = await approveRes.json();
  assert(approveData.success === true, 'POST /api/repairs approve returned success');
  assert(approveData.job.customer_approved === 1, 'Job customer_approved updated to 1');
  assert(approveData.job.stage === 'IN_REPAIR', 'Job stage advanced to IN_REPAIR');

  // 6.6 Kanban API GET
  const kanbanRes = await kanbanGet({});
  const kanbanData = await kanbanRes.json();
  assert(kanbanData.success === true, 'GET /api/kanban returns success');
  assert(Array.isArray(kanbanData.stages.IN_REPAIR), 'Kanban stages has IN_REPAIR column');
  assert(kanbanData.stats.total >= 4, `Kanban stats has total >= 4 (actual: ${kanbanData.stats.total})`);

  // 6.7 Kanban API POST Bump Stage
  const bumpReq = new Request('http://localhost/api/kanban', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      job_id: 'JOB-8842',
      stage: 'READY_FOR_PICKUP',
      technician: 'Rahul Sharma',
      notes: 'Micro-soldering complete; burn-in passed.'
    })
  });
  const bumpRes = await kanbanPost({ request: bumpReq });
  const bumpData = await bumpRes.json();
  assert(bumpData.success === true, 'POST /api/kanban bump returned success');
  assert(bumpData.job.stage === 'READY_FOR_PICKUP', 'Job stage bumped to READY_FOR_PICKUP');

  // 6.8 New Device Intake via POST
  const intakeReq = new Request('http://localhost/api/intake', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      customer_name: 'Dr. Anand Kumar',
      customer_phone: '919895112233',
      customer_email: 'anand@hospital.org',
      device_type: 'Laptop',
      brand: 'Lenovo',
      model: 'ThinkPad X1 Carbon Gen 11',
      serial_number: 'PF49LK01',
      priority: 'URGENT',
      assigned_technician: 'Sneha Joseph',
      bench_number: 'Bench #04',
      issue_description: 'Spilled tea on keyboard, trackpoint unresponsive, USB-C port intermittent.',
      checklist: {
        power_on: 1,
        display_touch_status: 'PASS',
        biometrics_status: 'PASS',
        liquid_damage_lci: 'RED',
        icloud_passcode_status: 'PIN_PROVIDED',
        cosmetic_scratches: 'PRISTINE',
        audio_mic: 'PASS',
        charging_port: 'FAIL',
        camera_front_rear: 'PASS',
        wifi_bluetooth: 'PASS',
        battery_health_pct: 95,
        physical_inspection_notes: 'Tripped LCI under trackpad daughterboard.'
      }
    })
  });
  const intakeRes = await intakePost({ request: intakeReq });
  const intakeData = await intakeRes.json();
  assert(intakeData.success === true, 'POST /api/intake succeeded');
  assert(intakeData.job_id && intakeData.job_id.startsWith('JOB-'), `New job ticket generated: ${intakeData.job_id}`);
  assert(intakeData.job.checklist.liquid_damage_lci === 'RED', '12-point intake checklist stored properly');

  // 6.9 Parts Catalog GET
  const partsRes = await partsGet({});
  const partsData = await partsRes.json();
  assert(partsData.success === true, 'GET /api/parts succeeded');
  assert(partsData.parts.length >= 8, `Parts catalog count >= 8 (actual: ${partsData.parts.length})`);
  const firstPart = partsData.parts[0];
  assert(firstPart.margin_inr !== undefined && firstPart.margin_pct !== undefined, 'Spare parts include calculated margin_inr and margin_pct');

  // 6.10 Attach Estimate via POST /api/parts
  const attachReq = new Request('http://localhost/api/parts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action: 'attach_estimate',
      job_id: intakeData.job_id,
      items: [
        {
          item_type: 'PART',
          description: 'ThinkPad X1 Keyboard & C-Cover Clamshell',
          part_sku: 'KB-TP-X1C11',
          unit_cost_inr: 3200,
          customer_price_inr: 5400,
          quantity: 1
        }
      ],
      ultrasonic_fee: 350,
      labor_fee: 1200,
      warranty_days: 90
    })
  });
  const attachRes = await partsPost({ request: attachReq });
  const attachData = await attachRes.json();
  assert(attachData.success === true, 'Attach estimate to new job succeeded');
  assert(attachData.job.total_estimate_inr === 5400 + 350 + 1200, `Total estimate computed accurately: ₹${attachData.job.total_estimate_inr}`);
  assert(attachData.job.stage === 'AWAITING_APPROVAL', 'Job stage updated to AWAITING_APPROVAL after quote generation');

  console.log('\n====================================================');
  console.log(`Test Execution Complete: ${passedTests}/${totalTests} Passed (${failedTests} Failed)`);
  console.log('====================================================\n');

  if (failedTests > 0) {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Fatal Test Runner Error:', err);
  process.exit(1);
});
