-- ==========================================================================
-- APEX FIX // Mobile, Laptop & EV Service Center Seed Data
-- Seed Realistic Jobs:
-- 1. iPhone 15 Pro Max logic board repair (Audio IC reballing)
-- 2. MacBook Pro M2 Liquid Damage (USB-C controller replacement)
-- 3. Ola S1 Pro EV BMS controller battery cell balancing
-- 4. Dell XPS 15 OLED display panel swap
-- ==========================================================================

-- 1. Spare Parts Inventory
INSERT INTO spare_parts_inventory (sku, name, category, brand_compat, wholesale_cost_inr, retail_price_inr, stock_qty, warranty_months, location_bin) VALUES
('IC-AP-PMIC-15', 'Apple Audio PMIC & Codec Power Diode IC', 'Logic Board / IC', 'Apple iPhone 15 / 15 Pro Max', 1850.00, 2800.00, 14, 6, 'BIN-A12'),
('IC-TI-CD3217', 'TI CD3217B12 USB-C Power Delivery Controller IC', 'Logic Board / IC', 'Apple MacBook Pro M1/M2/M3', 1950.00, 3400.00, 8, 6, 'BIN-A08'),
('EV-BMS-BAL-16S', 'Smart Active 5A Cell Balancer Module 4S-16S', 'Battery / BMS', 'Ola S1 Pro / Ather 450X', 5200.00, 7800.00, 5, 12, 'BIN-EV02'),
('SCR-DELL-XPS15', '15.6" 3.5K OLED 3456x2160 InfinityEdge Touch Assembly', 'Screen / OLED', 'Dell XPS 15 9500-9530', 9500.00, 13200.00, 3, 6, 'BIN-D03'),
('HNG-DELL-XPS15', 'CNC Magnesium Alloy Hinge Pair (Left + Right)', 'Housing / Ports', 'Dell XPS 15 9510/9520/9530', 1400.00, 1800.00, 6, 12, 'BIN-D04'),
('BAT-IP-15PM', 'OEM Grade 4,422mAh High-Density Battery Cell w/ Flex', 'Battery / BMS', 'Apple iPhone 15 Pro Max', 2100.00, 3600.00, 18, 6, 'BIN-B02'),
('CLN-FLUX-ULTRA', 'Branson EC-Ultrasonic Deoxidation & Thermal Flux Bake', 'Thermal / Cooling', 'Universal Logic Boards', 100.00, 350.00, 999, 3, 'BIN-LAB01'),
('LBR-BGA-REBALL', 'Precision Micro-BGA Stencil Soldering & Jumper Labor', 'Logic Board / IC', 'Universal Micro-Electronics', 600.00, 1700.00, 999, 6, 'BIN-LAB02');

-- 2. Repair Jobs
INSERT INTO repair_jobs (id, customer_name, customer_phone, customer_email, device_type, brand, model, serial_number, imei, issue_description, stage, priority, assigned_technician, bench_number, total_estimate_inr, total_cost_inr, margin_inr, customer_approved, approval_timestamp, return_reason, warranty_days, notes, created_at, updated_at) VALUES
('JOB-8842', 'Rahul Verma', '919847011223', 'rahul.verma@apexfix.demo', 'Smartphone', 'Apple', 'iPhone 15 Pro Max (256GB Natural Titanium)', 'F17NQ299K5', '358911094821094', 'No audio during incoming/outgoing cellular calls, ear speaker mute, recording voice memo causes immediate springboard reboot. Thermal imaging indicates localized short on Audio PMIC power rail (U3100).', 'AWAITING_APPROVAL', 'URGENT', 'Rahul Sharma', 'Bench #03 (ESD Solder Station)', 4850.00, 2550.00, 2300.00, NULL, NULL, NULL, 90, 'Customer reported issue began after dropping on marble floor with silicone case. Microscope inspection confirmed fractured solder balls under Audio IC.', datetime('now', '-2 hours'), datetime('now', '-15 minutes')),

('JOB-9413', 'Arunima Menon', '919447022334', 'arunima.menon@apexfix.demo', 'Laptop', 'Apple', 'MacBook Pro 14" M2 Pro (16GB / 512GB Space Grey)', 'C02Y88LKMD6T', 'N/A', 'Accidental cappuccino spill on left MagSafe 3 & dual Thunderbolt ports. Unit drawing 5.02V / 0.04A on Type-C meter with zero fan spin. Corroded CD3217 USB-C PD controller and burnt bypass capacitor C3205.', 'IN_REPAIR', 'URGENT', 'Priya Nair', 'Bench #01 (Micro-Soldering)', 7670.00, 3850.00, 3820.00, 1, datetime('now', '-3 hours'), NULL, 90, 'Customer authorized repair on WhatsApp. Ultrasonic deoxidation complete; micro-soldering replacement CD3217 IC and jumpering corroded PP3V3_G3H pad in progress.', datetime('now', '-18 hours'), datetime('now', '-30 minutes')),

('JOB-9414', 'Vivek Pillai', '919895033445', 'vivek.pillai@apexfix.demo', 'EV / BMS', 'Ola Electric', 'Ola S1 Pro Gen 2 (4.0kWh NMC Pack)', 'OLA-S1P-882104-KL07', 'N/A', 'Dashboard displaying error code #BMS-09 (Cell Imbalance Warning). Throttle limited to turtle mode (max 15 km/h). Diagnostic CAN-bus scan reveals Cell Bank #04 delta-V is 342mV lower than nominal string voltage (3.68V vs 4.02V).', 'DIAGNOSIS', 'URGENT', 'Amit Patel', 'EV Bay #02 (High Voltage Isolation)', 12400.00, 8800.00, 3600.00, NULL, NULL, NULL, 180, '72V high-voltage safety interlock engaged. Connected 16-channel active cell balancer to equalize Cell Bank #04. Performing BMS EEPROM firmware reflash and discharge stress test.', datetime('now', '-5 hours'), datetime('now', '-1 hour')),

('JOB-9415', 'TechWorks Studio (Karan S.)', '919876543210', 'karan@techworks.io', 'Laptop', 'Dell', 'Dell XPS 15 9530 (i7-13700H, 3.5K OLED Touch)', '8J29KL3', 'N/A', 'Cracked upper-right OLED digitizer glass with vertical green/purple artifact lines across display. Right CNC magnesium hinge binding and clicking against top palmrest chassis.', 'READY_FOR_PICKUP', 'STANDARD', 'Sneha Joseph', 'Bench #04 (Assembly & QA Burn-In)', 15800.00, 11700.00, 4100.00, 1, datetime('now', '-1 day'), NULL, 180, 'Complete 3.5K OLED touch clamshell swap and hinge alignment completed. Passed 24-hour UNIGINE Heaven stress burn-in and color calibration 100% DCI-P3.', datetime('now', '-2 days'), datetime('now', '-45 minutes'));

-- 3. 12-Point Intake Checklists
INSERT INTO intake_checklists (job_id, power_on, display_touch_status, biometrics_status, liquid_damage_lci, icloud_passcode_status, cosmetic_scratches, audio_mic, charging_port, camera_front_rear, wifi_bluetooth, battery_health_pct, physical_inspection_notes, updated_at) VALUES
('JOB-8842', 1, 'PASS', 'PASS', 'WHITE', 'PIN_PROVIDED', 'MINOR_SCUFFS', 'FAIL', 'PASS', 'PASS', 'PASS', 92, 'Device powers on normally. Touch, 120Hz ProMotion, and FaceID operational. LCI indicators inside SIM tray are pristine white. Audio IC failed; ear speaker mute; voice memo crashes.', datetime('now', '-2 hours')),

('JOB-9413', 0, 'UNTESTED', 'UNTESTED', 'RED', 'UNLOCKED', 'PRISTINE', 'UNTESTED', 'FAIL', 'UNTESTED', 'UNTESTED', 89, 'Liquid contact indicators near MagSafe and Type-C daughterboard tripped red. White corrosion residue on CD3217 IC and C3205 bypass rail. No visual liquid contact on CPU heatsink area.', datetime('now', '-18 hours')),

('JOB-9414', 1, 'PASS', 'PASS', 'WHITE', 'UNLOCKED', 'MINOR_SCUFFS', 'PASS', 'PASS', 'PASS', 'PASS', 84, 'Ola OS boot successful, 7" touchscreen responsive. CAN bus diagnostics communicate without packet loss. Cell Bank #04 delta-V 342mV triggering limp mode. Battery casing seal intact with zero moisture penetration.', datetime('now', '-5 hours')),

('JOB-9415', 1, 'FAIL', 'PASS', 'WHITE', 'PIN_PROVIDED', 'DENTED_FRAME', 'PASS', 'PASS', 'PASS', 'PASS', 94, 'OLED glass cracked diagonally from top-right bezel. Touch digitizer unresponsive in upper quadrant. Audio, keyboard backlighting, fingerprint reader, and Wi-Fi 6E all verified functional.', datetime('now', '-2 days'));

-- 4. Itemized Repair Estimates
INSERT INTO repair_estimates (job_id, item_type, description, part_sku, unit_cost_inr, customer_price_inr, quantity, approved) VALUES
-- JOB-8842 (iPhone 15 Pro Max)
('JOB-8842', 'PART', 'Apple Audio PMIC & Codec Power Diode IC', 'IC-AP-PMIC-15', 1850.00, 2800.00, 1, 0),
('JOB-8842', 'LABOR', 'Precision Micro-BGA Stencil Soldering & Laser Reballing', 'LBR-BGA-REBALL', 600.00, 1700.00, 1, 0),
('JOB-8842', 'DIAGNOSTIC', 'Ultrasonic PCB Deoxidation & Chemical Thermal Bake', 'CLN-FLUX-ULTRA', 100.00, 350.00, 1, 0),

-- JOB-9413 (MacBook Pro M2)
('JOB-9413', 'PART', 'TI CD3217B12 USB-C Power Delivery Controller IC', 'IC-TI-CD3217', 1950.00, 3400.00, 1, 1),
('JOB-9413', 'LABOR', 'Trace Jumper Wire Reconstruction & BGA Soldering', 'LBR-BGA-REBALL', 1200.00, 2470.00, 1, 1),
('JOB-9413', 'DIAGNOSTIC', 'Ultrasonic PCB Deoxidation & Chemical Ultrasonic Bath', 'CLN-FLUX-ULTRA', 700.00, 1800.00, 1, 1),

-- JOB-9414 (Ola S1 Pro EV)
('JOB-9414', 'PART', 'Smart Active 5A Cell Balancer Module 4S-16S', 'EV-BMS-BAL-16S', 5200.00, 7800.00, 1, 0),
('JOB-9414', 'LABOR', '72V High-Voltage Bench Labor & Safety Isolation Test', 'LBR-BGA-REBALL', 2600.00, 3600.00, 1, 0),
('JOB-9414', 'DIAGNOSTIC', 'BMS Firmware Reflash & CAN-Bus Pack Calibration', 'LBR-BGA-REBALL', 1000.00, 1000.00, 1, 0),

-- JOB-9415 (Dell XPS 15)
('JOB-9415', 'PART', '15.6" 3.5K OLED 3456x2160 InfinityEdge Touch Assembly', 'SCR-DELL-XPS15', 9500.00, 13200.00, 1, 1),
('JOB-9415', 'PART', 'CNC Magnesium Alloy Hinge Pair (Left + Right)', 'HNG-DELL-XPS15', 1400.00, 1800.00, 1, 1),
('JOB-9415', 'LABOR', 'Precision Calibrated Display Assembly & Hinge Torque Labor', 'LBR-BGA-REBALL', 800.00, 800.00, 1, 1);

-- 5. Job Timeline Milestones
INSERT INTO job_timeline (job_id, stage, title, notes, technician, timestamp, photo_url) VALUES
-- JOB-8842
('JOB-8842', 'INTAKE', 'Intake Check-In Completed', 'Device checked in at front desk by customer Rahul Verma. Reported audio and voice memo crash.', 'Priya S. (Front Desk)', datetime('now', '-2 hours'), NULL),
('JOB-8842', 'DIAGNOSIS', '12-Point Multi-Triage Completed', 'Visual physical inspection clean. SIM tray LCI white. Touch and FaceID functional. Audio loopback test failed with 0dB input signal.', 'Rahul Sharma', datetime('now', '-1 hour 45 minutes'), NULL),
('JOB-8842', 'DIAGNOSIS', 'Microscope & Thermal Short Discovered', 'FLIR thermal camera revealed U3100 Audio PMIC heat signature spiked to 74.2°C within 3 seconds of boot. High-res microscope inspection shows micro-fractured solder ball array.', 'Rahul Sharma', datetime('now', '-1 hour 15 minutes'), 'microscope-pmic-diode.jpg'),
('JOB-8842', 'AWAITING_APPROVAL', 'Itemized Estimate Submitted for Authorization', 'Itemized estimate of ₹4,850 generated (Parts: ₹2,800 + Reballing: ₹1,700 + Deoxidation: ₹350). Customer SMS & WhatsApp notification dispatched.', 'System Automated Dispatch', datetime('now', '-15 minutes'), NULL),

-- JOB-9413
('JOB-9413', 'INTAKE', 'Emergency Water Damage Intake', 'Unit arrived in sealed anti-static bag after morning cappuccino spill. Customer urged data recovery priority.', 'Priya S.', datetime('now', '-18 hours'), NULL),
('JOB-9413', 'DIAGNOSIS', 'Corrosion Mapping & LCI Tripped Red', 'Internal inspection confirmed liquid entry through MagSafe port. LCI tripped red. 5V 0.04A loop.', 'Priya Nair', datetime('now', '-16 hours'), 'corrosion-under-bga.jpg'),
('JOB-9413', 'AWAITING_APPROVAL', 'Estimate ₹7,670 Dispatched to Arunima', 'Quote sent via WhatsApp tracking portal.', 'Priya Nair', datetime('now', '-14 hours'), NULL),
('JOB-9413', 'IN_REPAIR', 'Customer Approved via WhatsApp Portal', 'Estimate authorized by customer Arunima Menon at 10:14 AM. Micro-soldering CD3217 IC and jumper wire started.', 'Priya Nair', datetime('now', '-3 hours'), NULL),

-- JOB-9414
('JOB-9414', 'INTAKE', 'EV High-Voltage Intake Check-In', 'Ola S1 Pro Gen 2 brought in on flatbed. Code #BMS-09 logged.', 'Amit Patel', datetime('now', '-5 hours'), NULL),
('JOB-9414', 'DIAGNOSIS', 'CAN-Bus Telemetry & Cell Bank Analysis', 'Cell Bank #04 delta-V 342mV confirmed. Active balancer connected for cell equalization.', 'Amit Patel', datetime('now', '-1 hour'), 'thermal-cell-balance.jpg'),

-- JOB-9415
('JOB-9415', 'INTAKE', 'Device Intake & Display Inspection', 'Cracked upper-right OLED with touch dead zone.', 'Sneha Joseph', datetime('now', '-2 days'), NULL),
('JOB-9415', 'AWAITING_APPROVAL', 'Display Quote Authorized by TechWorks Studio', 'Approved for OEM 3.5K OLED panel swap.', 'Sneha Joseph', datetime('now', '-1 day 18 hours'), NULL),
('JOB-9415', 'IN_REPAIR', 'Display Swap & Hinge Calibration Complete', 'Installed new OLED panel and torque-adjusted magnesium hinges.', 'Sneha Joseph', datetime('now', '-1 day'), NULL),
('JOB-9415', 'READY_FOR_PICKUP', 'QA Burn-In Passed • Ready for Counter Pickup', 'Passed 24h stress test. Calibrated color profiles. Ready for customer pickup.', 'Sneha Joseph', datetime('now', '-45 minutes'), NULL);
