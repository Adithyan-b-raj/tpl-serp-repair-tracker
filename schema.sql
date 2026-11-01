-- ==========================================================================
-- APEX FIX // Mobile, Laptop & EV Service Center Job-Sheet Tracker
-- Movement P: High-Precision Technical Diagnostic & Repair Stepper
-- Archetypes: technical-repair-stepper (index.html) & repair-bench-kanban (admin.html)
-- D1 Database Relational Schema
-- ==========================================================================

DROP TABLE IF EXISTS job_timeline;
DROP TABLE IF EXISTS repair_estimates;
DROP TABLE IF EXISTS intake_checklists;
DROP TABLE IF EXISTS spare_parts_inventory;
DROP TABLE IF EXISTS repair_jobs;

-- 1. Repair Jobs Table
CREATE TABLE IF NOT EXISTS repair_jobs (
  id TEXT PRIMARY KEY,                       -- e.g. 'JOB-8842', 'JOB-9412'
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  device_type TEXT NOT NULL,                 -- 'Smartphone', 'Laptop', 'EV / BMS', 'Tablet'
  brand TEXT NOT NULL,                       -- 'Apple', 'Dell', 'Ola Electric', 'Samsung'
  model TEXT NOT NULL,                       -- e.g. 'iPhone 15 Pro Max (256GB Titanium)'
  serial_number TEXT,
  imei TEXT,
  issue_description TEXT NOT NULL,
  stage TEXT NOT NULL DEFAULT 'INTAKE',      -- 'INTAKE', 'DIAGNOSIS', 'AWAITING_APPROVAL', 'IN_REPAIR', 'READY_FOR_PICKUP', 'DELIVERED'
  priority TEXT NOT NULL DEFAULT 'STANDARD', -- 'STANDARD', 'URGENT'
  assigned_technician TEXT DEFAULT 'Rahul Sharma',
  bench_number TEXT DEFAULT 'Bench #03',
  total_estimate_inr REAL DEFAULT 0,
  total_cost_inr REAL DEFAULT 0,
  margin_inr REAL DEFAULT 0,
  customer_approved INTEGER DEFAULT NULL,    -- NULL = pending, 1 = approved, 0 = declined
  approval_timestamp TIMESTAMP,
  return_reason TEXT,
  warranty_days INTEGER DEFAULT 90,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. 12-Point Intake Inspection Checklist
CREATE TABLE IF NOT EXISTS intake_checklists (
  job_id TEXT PRIMARY KEY,
  power_on INTEGER NOT NULL DEFAULT 1,                      -- 1 = Yes/Pass, 0 = No/Fail
  display_touch_status TEXT NOT NULL DEFAULT 'PASS',        -- 'PASS', 'FAIL', 'GLITCH', 'UNTESTED'
  biometrics_status TEXT NOT NULL DEFAULT 'PASS',           -- 'PASS', 'FAIL', 'UNTESTED'
  liquid_damage_lci TEXT NOT NULL DEFAULT 'WHITE',          -- 'WHITE' (Intact), 'RED' (Tripped), 'NOT_FOUND'
  icloud_passcode_status TEXT NOT NULL DEFAULT 'PIN_PROVIDED', -- 'UNLOCKED', 'LOCKED', 'PIN_PROVIDED', 'PATTERN_PROVIDED'
  cosmetic_scratches TEXT NOT NULL DEFAULT 'MINOR_SCUFFS',  -- 'PRISTINE', 'MINOR_SCUFFS', 'DENTED_FRAME', 'SHATTERED_BACK'
  audio_mic TEXT NOT NULL DEFAULT 'PASS',                   -- 'PASS', 'FAIL'
  charging_port TEXT NOT NULL DEFAULT 'PASS',               -- 'PASS', 'FAIL'
  camera_front_rear TEXT NOT NULL DEFAULT 'PASS',           -- 'PASS', 'FAIL'
  wifi_bluetooth TEXT NOT NULL DEFAULT 'PASS',              -- 'PASS', 'FAIL'
  battery_health_pct INTEGER DEFAULT 88,                    -- Health % or cell delta mV
  physical_inspection_notes TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (job_id) REFERENCES repair_jobs(id) ON DELETE CASCADE
);

-- 3. Itemized Repair Estimates (Parts + Labor)
CREATE TABLE IF NOT EXISTS repair_estimates (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  job_id TEXT NOT NULL,
  item_type TEXT NOT NULL,                                  -- 'PART', 'LABOR', 'DIAGNOSTIC'
  description TEXT NOT NULL,
  part_sku TEXT,
  unit_cost_inr REAL NOT NULL DEFAULT 0,
  customer_price_inr REAL NOT NULL DEFAULT 0,
  quantity INTEGER NOT NULL DEFAULT 1,
  approved INTEGER NOT NULL DEFAULT 0,
  FOREIGN KEY (job_id) REFERENCES repair_jobs(id) ON DELETE CASCADE
);

-- 4. Spare Parts & Components Inventory
CREATE TABLE IF NOT EXISTS spare_parts_inventory (
  sku TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,                                   -- 'Screen / OLED', 'Logic Board / IC', 'Battery / BMS', 'Housing / Ports', 'Thermal / Cooling'
  brand_compat TEXT NOT NULL,
  wholesale_cost_inr REAL NOT NULL,
  retail_price_inr REAL NOT NULL,
  stock_qty INTEGER NOT NULL DEFAULT 0,
  warranty_months INTEGER DEFAULT 6,
  location_bin TEXT NOT NULL
);

-- 5. Diagnostic & Repair Event Timeline
CREATE TABLE IF NOT EXISTS job_timeline (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  job_id TEXT NOT NULL,
  stage TEXT NOT NULL,
  title TEXT NOT NULL,
  notes TEXT,
  technician TEXT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  photo_url TEXT,
  FOREIGN KEY (job_id) REFERENCES repair_jobs(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_repairs_phone ON repair_jobs(customer_phone);
CREATE INDEX IF NOT EXISTS idx_repairs_stage ON repair_jobs(stage);
CREATE INDEX IF NOT EXISTS idx_timeline_job ON job_timeline(job_id);
