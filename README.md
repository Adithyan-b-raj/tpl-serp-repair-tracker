# APEX FIX // Mobile, Laptop & EV Service Center Job-Sheet Tracker (`tpl-serp-repair-tracker`)

> **BMAD Template Arsenal Vertical — Small ERP Suite (Ticket 3.4)**  
> **Movement P: High-Precision Technical Diagnostic & Repair Stepper**  
> *Awwwards / iFixit Pro / Apple Self Service / Rossmann Repair Bench Archetype*

---

## 🎯 Architecture & Design Movement

| Attribute | Specification |
| :--- | :--- |
| **Movement** | `Movement P: ESD Service Workbench & Public IMEI Tracker` |
| **Customer Portal Archetype** | `data-layout-archetype="technical-repair-stepper"` (`public/index.html`) |
| **Technician Workbench Archetype** | `data-layout-archetype="repair-bench-kanban"` (`public/admin.html`) |
| **Edge Runtime** | Cloudflare Pages Functions (`/api/*`) with V8 snapshot drift guard |
| **Database** | Cloudflare D1 Relational Engine (`schema.sql` + `seed.sql`) + Request-time In-Memory Fallback |
| **Whitelabel Engine** | `public/whitelabel.js` supporting `?brand=...&primary=...&phone=...&wa=...` |

---

## 🛠️ Key Features

### 1. Customer Diagnostic Portal (`/` or `/index.html`)
- **Real-Time Job Telemetry Lookup:** Enter ticket (`#JOB-8842`), phone, serial, or IMEI. Auto-loads via query string `?job=JOB-8842`.
- **6-Stage Visual Diagnostic Stepper:**
  1. `01 INTAKE` (Front desk check-in)
  2. `02 TRIAGE` (12-point hardware scan)
  3. `03 QUOTE` (Diagnostic & client authorization)
  4. `04 SOLDER` (Level 4 micro-BGA soldering)
  5. `05 BURN-IN QA` (24-hour stress test)
  6. `06 HANDOVER` (Counter pickup ready)
- **12-Point Multi-Triage Matrix:** Real-time visual status for Power Boot, 120Hz Touch, FaceID/Biometrics, SIM LCI Liquid Indicator, iCloud/Passcode, Frame Scratches, Audio/Mic, Charge Port, Dual Cameras, Wi-Fi 6E, Battery Health %, and Ultrasonic Seal.
- **High-Magnification Microscope Lightbox:** Switchable Leica S9i 40x optical microscope inspection, FLIR thermal imaging @ 74.2°C hotspot, and CD3217 liquid corrosion mapping.
- **Interactive Estimate Authorization Card:** Itemized parts + labor with 1-tap "Authorize Estimate (₹4,850)" or "Request Return".
- **Printable Job Sheet Preview:** Formatted for `@media print` with barcode, ISO calibration seal, and warranty certificate.

### 2. Technician Workbench Kanban (`/admin.html`)
- **5-Stage Kanban Board:** `INTAKE`, `DIAGNOSIS`, `AWAITING_APPROVAL`, `IN_REPAIR`, `READY_FOR_PICKUP`.
- **1-Tap Stage Bump Buttons:** Smooth transitions between triage, quoting, bench repair, and final pickup.
- **Multi-Point Intake Inspection Drawer:** Form modal capturing customer details, device specs, priority (`URGENT`/`STANDARD`), and all 12 triage inspection points.
- **Spare Parts Consumption & Margin Calculator:** Live component picker showing wholesale cost vs retail customer price vs gross margin (₹ and %).
- **1-Click WhatsApp Customer Notification Hub:** Pre-formatted status templates for intake confirmation, estimate authorization, and ready-for-pickup notifications.

---

## 🔌 Cloudflare Pages Functions API

All API endpoints avoid top-level `Date.now()` freezing by using lazy request-time factories:

- `GET /api/repairs?job=JOB-8842` — Retrieve repair job, 12-point inspection, estimates, timeline milestones, and microscope photos.
- `POST /api/repairs` — Approve or decline repair estimate (`{ job_id, action: 'approve' | 'decline' }`).
- `GET /api/kanban` — 5-stage categorized jobs with real-time KPI telemetry.
- `POST /api/kanban` — Bump job status between stages.
- `POST /api/intake` — Register new device with complete 12-point checklist.
- `GET /api/parts` — Spare parts inventory with wholesale cost & retail margin.
- `POST /api/parts` — Attach calculated estimate to a repair ticket or add parts.
- `GET /api/[[route]]` — Wildcard service health check and route discovery.

---

## 🚀 Realistic Seed Scenarios Included

1. **iPhone 15 Pro Max Logic Board Repair (`JOB-8842`):** Audio IC (U3100) micro-BGA reballing & diode thermal short repair (`₹4,850`).
2. **MacBook Pro 14" M2 Liquid Damage (`JOB-9413`):** CD3217 USB-C controller replacement & ultrasonic PCB deoxidation (`₹7,670`).
3. **Ola S1 Pro EV Smart BMS (`JOB-9414`):** 4.0kWh NMC pack active cell balancing & CAN-bus calibration (`₹12,400`).
4. **Dell XPS 15 9530 (`JOB-9415`):** 3.5K OLED touch panel swap & magnesium hinge torque calibration (`₹15,800`).

---

## 🧪 Automated Verification

Run test suite:
```bash
node tests/verify-repair-tracker.mjs
```
Runs 73 automated assertions validating file structure, gitignore, schema, seed data, HTML archetypes, whitelabel contract, and Cloudflare Pages Functions API in-memory execution.
