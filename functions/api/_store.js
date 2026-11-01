// Cloudflare Pages Functions - Central Data Store & Request-Time Factory
// Movement P: High-Precision Technical Diagnostic & Repair Stepper
// Architecture Note: Request-time factory avoids V8 snapshot Date.now() freezing.

export function createInitialData() {
  const now = Date.now();
  const m = 60 * 1000;
  const h = 60 * m;
  const d = 24 * h;

  const parts = [
    {
      sku: 'IC-AP-PMIC-15',
      name: 'Apple Audio PMIC & Codec Power Diode IC',
      category: 'Logic Board / IC',
      brand_compat: 'Apple iPhone 15 / 15 Pro Max',
      wholesale_cost_inr: 1850.00,
      retail_price_inr: 2800.00,
      stock_qty: 14,
      warranty_months: 6,
      location_bin: 'BIN-A12'
    },
    {
      sku: 'IC-TI-CD3217',
      name: 'TI CD3217B12 USB-C Power Delivery Controller IC',
      category: 'Logic Board / IC',
      brand_compat: 'Apple MacBook Pro M1/M2/M3',
      wholesale_cost_inr: 1950.00,
      retail_price_inr: 3400.00,
      stock_qty: 8,
      warranty_months: 6,
      location_bin: 'BIN-A08'
    },
    {
      sku: 'EV-BMS-BAL-16S',
      name: 'Smart Active 5A Cell Balancer Module 4S-16S',
      category: 'Battery / BMS',
      brand_compat: 'Ola S1 Pro / Ather 450X',
      wholesale_cost_inr: 5200.00,
      retail_price_inr: 7800.00,
      stock_qty: 5,
      warranty_months: 12,
      location_bin: 'BIN-EV02'
    },
    {
      sku: 'SCR-DELL-XPS15',
      name: '15.6" 3.5K OLED 3456x2160 InfinityEdge Touch Assembly',
      category: 'Screen / OLED',
      brand_compat: 'Dell XPS 15 9500-9530',
      wholesale_cost_inr: 9500.00,
      retail_price_inr: 13200.00,
      stock_qty: 3,
      warranty_months: 6,
      location_bin: 'BIN-D03'
    },
    {
      sku: 'HNG-DELL-XPS15',
      name: 'CNC Magnesium Alloy Hinge Pair (Left + Right)',
      category: 'Housing / Ports',
      brand_compat: 'Dell XPS 15 9510/9520/9530',
      wholesale_cost_inr: 1400.00,
      retail_price_inr: 1800.00,
      stock_qty: 6,
      warranty_months: 12,
      location_bin: 'BIN-D04'
    },
    {
      sku: 'BAT-IP-15PM',
      name: 'OEM Grade 4,422mAh High-Density Battery Cell w/ Flex',
      category: 'Battery / BMS',
      brand_compat: 'Apple iPhone 15 Pro Max',
      wholesale_cost_inr: 2100.00,
      retail_price_inr: 3600.00,
      stock_qty: 18,
      warranty_months: 6,
      location_bin: 'BIN-B02'
    },
    {
      sku: 'CLN-FLUX-ULTRA',
      name: 'Branson EC-Ultrasonic Deoxidation & Thermal Flux Bake',
      category: 'Thermal / Cooling',
      brand_compat: 'Universal Logic Boards',
      wholesale_cost_inr: 100.00,
      retail_price_inr: 350.00,
      stock_qty: 999,
      warranty_months: 3,
      location_bin: 'BIN-LAB01'
    },
    {
      sku: 'LBR-BGA-REBALL',
      name: 'Precision Micro-BGA Stencil Soldering & Jumper Labor',
      category: 'Logic Board / IC',
      brand_compat: 'Universal Micro-Electronics',
      wholesale_cost_inr: 600.00,
      retail_price_inr: 1700.00,
      stock_qty: 999,
      warranty_months: 6,
      location_bin: 'BIN-LAB02'
    }
  ];

  const jobs = [
    {
      id: 'JOB-8842',
      customer_name: 'Rahul Verma',
      customer_phone: '919847011223',
      customer_email: 'rahul.verma@apexfix.demo',
      device_type: 'Smartphone',
      brand: 'Apple',
      model: 'iPhone 15 Pro Max (256GB Natural Titanium)',
      serial_number: 'F17NQ299K5',
      imei: '358911094821094',
      issue_description: 'No audio during incoming/outgoing cellular calls, ear speaker mute, recording voice memo causes immediate springboard crash. Thermal imaging indicates localized short on Audio PMIC power rail (U3100).',
      stage: 'AWAITING_APPROVAL',
      priority: 'URGENT',
      assigned_technician: 'Rahul Sharma',
      bench_number: 'Bench #03 (ESD Solder Station)',
      total_estimate_inr: 4850.00,
      total_cost_inr: 2550.00,
      margin_inr: 2300.00,
      customer_approved: null,
      approval_timestamp: null,
      return_reason: null,
      warranty_days: 90,
      notes: 'Customer reported issue began after dropping on marble floor with silicone case. Microscope inspection confirmed fractured solder balls under Audio IC.',
      created_at: new Date(now - 2 * h).toISOString(),
      updated_at: new Date(now - 15 * m).toISOString()
    },
    {
      id: 'JOB-9413',
      customer_name: 'Arunima Menon',
      customer_phone: '919447022334',
      customer_email: 'arunima.menon@apexfix.demo',
      device_type: 'Laptop',
      brand: 'Apple',
      model: 'MacBook Pro 14" M2 Pro (16GB / 512GB Space Grey)',
      serial_number: 'C02Y88LKMD6T',
      imei: 'N/A',
      issue_description: 'Accidental cappuccino spill on left MagSafe 3 & dual Thunderbolt ports. Unit drawing 5.02V / 0.04A on Type-C meter with zero fan spin. Corroded CD3217 USB-C PD controller and burnt bypass capacitor C3205.',
      stage: 'IN_REPAIR',
      priority: 'URGENT',
      assigned_technician: 'Priya Nair',
      bench_number: 'Bench #01 (Micro-Soldering)',
      total_estimate_inr: 7670.00,
      total_cost_inr: 3850.00,
      margin_inr: 3820.00,
      customer_approved: 1,
      approval_timestamp: new Date(now - 3 * h).toISOString(),
      return_reason: null,
      warranty_days: 90,
      notes: 'Customer authorized repair on WhatsApp. Ultrasonic deoxidation complete; micro-soldering replacement CD3217 IC and jumpering corroded PP3V3_G3H pad in progress.',
      created_at: new Date(now - 18 * h).toISOString(),
      updated_at: new Date(now - 30 * m).toISOString()
    },
    {
      id: 'JOB-9414',
      customer_name: 'Vivek Pillai',
      customer_phone: '919895033445',
      customer_email: 'vivek.pillai@apexfix.demo',
      device_type: 'EV / BMS',
      brand: 'Ola Electric',
      model: 'Ola S1 Pro Gen 2 (4.0kWh NMC Pack)',
      serial_number: 'OLA-S1P-882104-KL07',
      imei: 'N/A',
      issue_description: 'Dashboard displaying error code #BMS-09 (Cell Imbalance Warning). Throttle limited to turtle mode (max 15 km/h). Diagnostic CAN-bus scan reveals Cell Bank #04 delta-V is 342mV lower than nominal string voltage (3.68V vs 4.02V).',
      stage: 'DIAGNOSIS',
      priority: 'URGENT',
      assigned_technician: 'Amit Patel',
      bench_number: 'EV Bay #02 (High Voltage Isolation)',
      total_estimate_inr: 12400.00,
      total_cost_inr: 8800.00,
      margin_inr: 3600.00,
      customer_approved: null,
      approval_timestamp: null,
      return_reason: null,
      warranty_days: 180,
      notes: '72V high-voltage safety interlock engaged. Connected 16-channel active cell balancer to equalize Cell Bank #04. Performing BMS EEPROM firmware reflash and discharge stress test.',
      created_at: new Date(now - 5 * h).toISOString(),
      updated_at: new Date(now - 1 * h).toISOString()
    },
    {
      id: 'JOB-9415',
      customer_name: 'TechWorks Studio (Karan S.)',
      customer_phone: '919876543210',
      customer_email: 'karan@techworks.io',
      device_type: 'Laptop',
      brand: 'Dell',
      model: 'Dell XPS 15 9530 (i7-13700H, 3.5K OLED Touch)',
      serial_number: '8J29KL3',
      imei: 'N/A',
      issue_description: 'Cracked upper-right OLED digitizer glass with vertical green/purple artifact lines across display. Right CNC magnesium hinge binding and clicking against top palmrest chassis.',
      stage: 'READY_FOR_PICKUP',
      priority: 'STANDARD',
      assigned_technician: 'Sneha Joseph',
      bench_number: 'Bench #04 (Assembly & QA Burn-In)',
      total_estimate_inr: 15800.00,
      total_cost_inr: 11700.00,
      margin_inr: 4100.00,
      customer_approved: 1,
      approval_timestamp: new Date(now - 1.5 * d).toISOString(),
      return_reason: null,
      warranty_days: 180,
      notes: 'Complete 3.5K OLED touch clamshell swap and hinge alignment completed. Passed 24-hour UNIGINE Heaven stress burn-in and color calibration 100% DCI-P3.',
      created_at: new Date(now - 2 * d).toISOString(),
      updated_at: new Date(now - 45 * m).toISOString()
    }
  ];

  const checklists = {
    'JOB-8842': {
      job_id: 'JOB-8842',
      power_on: 1,
      display_touch_status: 'PASS',
      biometrics_status: 'PASS',
      liquid_damage_lci: 'WHITE',
      icloud_passcode_status: 'PIN_PROVIDED',
      cosmetic_scratches: 'MINOR_SCUFFS',
      audio_mic: 'FAIL',
      charging_port: 'PASS',
      camera_front_rear: 'PASS',
      wifi_bluetooth: 'PASS',
      battery_health_pct: 92,
      physical_inspection_notes: 'Device powers on normally. Touch, 120Hz ProMotion, and FaceID operational. LCI indicators inside SIM tray are pristine white. Audio IC failed; ear speaker mute; voice memo crashes.',
      updated_at: new Date(now - 2 * h).toISOString()
    },
    'JOB-9413': {
      job_id: 'JOB-9413',
      power_on: 0,
      display_touch_status: 'UNTESTED',
      biometrics_status: 'UNTESTED',
      liquid_damage_lci: 'RED',
      icloud_passcode_status: 'UNLOCKED',
      cosmetic_scratches: 'PRISTINE',
      audio_mic: 'UNTESTED',
      charging_port: 'FAIL',
      camera_front_rear: 'UNTESTED',
      wifi_bluetooth: 'UNTESTED',
      battery_health_pct: 89,
      physical_inspection_notes: 'Liquid contact indicators near MagSafe and Type-C daughterboard tripped red. White corrosion residue on CD3217 IC and C3205 bypass rail. No visual liquid contact on CPU heatsink area.',
      updated_at: new Date(now - 18 * h).toISOString()
    },
    'JOB-9414': {
      job_id: 'JOB-9414',
      power_on: 1,
      display_touch_status: 'PASS',
      biometrics_status: 'PASS',
      liquid_damage_lci: 'WHITE',
      icloud_passcode_status: 'UNLOCKED',
      cosmetic_scratches: 'MINOR_SCUFFS',
      audio_mic: 'PASS',
      charging_port: 'PASS',
      camera_front_rear: 'PASS',
      wifi_bluetooth: 'PASS',
      battery_health_pct: 84,
      physical_inspection_notes: 'Ola OS boot successful, 7" touchscreen responsive. CAN bus diagnostics communicate without packet loss. Cell Bank #04 delta-V 342mV triggering limp mode. Battery casing seal intact with zero moisture penetration.',
      updated_at: new Date(now - 5 * h).toISOString()
    },
    'JOB-9415': {
      job_id: 'JOB-9415',
      power_on: 1,
      display_touch_status: 'FAIL',
      biometrics_status: 'PASS',
      liquid_damage_lci: 'WHITE',
      icloud_passcode_status: 'PIN_PROVIDED',
      cosmetic_scratches: 'DENTED_FRAME',
      audio_mic: 'PASS',
      charging_port: 'PASS',
      camera_front_rear: 'PASS',
      wifi_bluetooth: 'PASS',
      battery_health_pct: 94,
      physical_inspection_notes: 'OLED glass cracked diagonally from top-right bezel. Touch digitizer unresponsive in upper quadrant. Audio, keyboard backlighting, fingerprint reader, and Wi-Fi 6E all verified functional.',
      updated_at: new Date(now - 2 * d).toISOString()
    }
  };

  const estimates = {
    'JOB-8842': [
      { id: 1, job_id: 'JOB-8842', item_type: 'PART', description: 'Apple Audio PMIC & Codec Power Diode IC', part_sku: 'IC-AP-PMIC-15', unit_cost_inr: 1850.00, customer_price_inr: 2800.00, quantity: 1, approved: 0 },
      { id: 2, job_id: 'JOB-8842', item_type: 'LABOR', description: 'Precision Micro-BGA Stencil Soldering & Laser Reballing', part_sku: 'LBR-BGA-REBALL', unit_cost_inr: 600.00, customer_price_inr: 1700.00, quantity: 1, approved: 0 },
      { id: 3, job_id: 'JOB-8842', item_type: 'DIAGNOSTIC', description: 'Ultrasonic PCB Deoxidation & Chemical Thermal Bake', part_sku: 'CLN-FLUX-ULTRA', unit_cost_inr: 100.00, customer_price_inr: 350.00, quantity: 1, approved: 0 }
    ],
    'JOB-9413': [
      { id: 4, job_id: 'JOB-9413', item_type: 'PART', description: 'TI CD3217B12 USB-C Power Delivery Controller IC', part_sku: 'IC-TI-CD3217', unit_cost_inr: 1950.00, customer_price_inr: 3400.00, quantity: 1, approved: 1 },
      { id: 5, job_id: 'JOB-9413', item_type: 'LABOR', description: 'Trace Jumper Wire Reconstruction & BGA Soldering', part_sku: 'LBR-BGA-REBALL', unit_cost_inr: 1200.00, customer_price_inr: 2470.00, quantity: 1, approved: 1 },
      { id: 6, job_id: 'JOB-9413', item_type: 'DIAGNOSTIC', description: 'Ultrasonic PCB Deoxidation & Chemical Ultrasonic Bath', part_sku: 'CLN-FLUX-ULTRA', unit_cost_inr: 700.00, customer_price_inr: 1800.00, quantity: 1, approved: 1 }
    ],
    'JOB-9414': [
      { id: 7, job_id: 'JOB-9414', item_type: 'PART', description: 'Smart Active 5A Cell Balancer Module 4S-16S', part_sku: 'EV-BMS-BAL-16S', unit_cost_inr: 5200.00, customer_price_inr: 7800.00, quantity: 1, approved: 0 },
      { id: 8, job_id: 'JOB-9414', item_type: 'LABOR', description: '72V High-Voltage Bench Labor & Safety Isolation Test', part_sku: 'LBR-BGA-REBALL', unit_cost_inr: 2600.00, customer_price_inr: 3600.00, quantity: 1, approved: 0 },
      { id: 9, job_id: 'JOB-9414', item_type: 'DIAGNOSTIC', description: 'BMS Firmware Reflash & CAN-Bus Pack Calibration', part_sku: 'LBR-BGA-REBALL', unit_cost_inr: 1000.00, customer_price_inr: 1000.00, quantity: 1, approved: 0 }
    ],
    'JOB-9415': [
      { id: 10, job_id: 'JOB-9415', item_type: 'PART', description: '15.6" 3.5K OLED 3456x2160 InfinityEdge Touch Assembly', part_sku: 'SCR-DELL-XPS15', unit_cost_inr: 9500.00, customer_price_inr: 13200.00, quantity: 1, approved: 1 },
      { id: 11, job_id: 'JOB-9415', item_type: 'PART', description: 'CNC Magnesium Alloy Hinge Pair (Left + Right)', part_sku: 'HNG-DELL-XPS15', unit_cost_inr: 1400.00, customer_price_inr: 1800.00, quantity: 1, approved: 1 },
      { id: 12, job_id: 'JOB-9415', item_type: 'LABOR', description: 'Precision Calibrated Display Assembly & Hinge Torque Labor', part_sku: 'LBR-BGA-REBALL', unit_cost_inr: 800.00, customer_price_inr: 800.00, quantity: 1, approved: 1 }
    ]
  };

  const timeline = {
    'JOB-8842': [
      { id: 1, job_id: 'JOB-8842', stage: 'INTAKE', title: 'Intake Check-In Completed', notes: 'Device checked in at front desk by customer Rahul Verma. Reported audio mute and voice memo crash.', technician: 'Priya S. (Front Desk)', timestamp: new Date(now - 2 * h).toISOString(), photo_url: null },
      { id: 2, job_id: 'JOB-8842', stage: 'DIAGNOSIS', title: '12-Point Multi-Triage Completed', notes: 'Visual physical inspection clean. SIM tray LCI white. Touch and FaceID operational. Audio loopback test failed with 0dB input signal.', technician: 'Rahul Sharma', timestamp: new Date(now - 1.75 * h).toISOString(), photo_url: null },
      { id: 3, job_id: 'JOB-8842', stage: 'DIAGNOSIS', title: 'Microscope & Thermal Short Discovered', notes: 'FLIR thermal camera revealed U3100 Audio PMIC heat signature spiked to 74.2°C within 3 seconds of boot. High-res microscope inspection shows micro-fractured solder ball array.', technician: 'Rahul Sharma', timestamp: new Date(now - 1.25 * h).toISOString(), photo_url: 'microscope-pmic-diode' },
      { id: 4, job_id: 'JOB-8842', stage: 'AWAITING_APPROVAL', title: 'Itemized Estimate Submitted for Authorization', notes: 'Itemized estimate of ₹4,850 generated (Parts: ₹2,800 + Reballing: ₹1,700 + Deoxidation: ₹350). Customer SMS & WhatsApp notification dispatched.', technician: 'Automated Dispatch', timestamp: new Date(now - 15 * m).toISOString(), photo_url: null }
    ],
    'JOB-9413': [
      { id: 5, job_id: 'JOB-9413', stage: 'INTAKE', title: 'Emergency Water Damage Intake', notes: 'Unit arrived in sealed anti-static bag after morning cappuccino spill. Customer urged data recovery priority.', technician: 'Priya S.', timestamp: new Date(now - 18 * h).toISOString(), photo_url: null },
      { id: 6, job_id: 'JOB-9413', stage: 'DIAGNOSIS', title: 'Corrosion Mapping & LCI Tripped Red', notes: 'Internal inspection confirmed liquid entry through MagSafe port. LCI tripped red. 5V 0.04A loop.', technician: 'Priya Nair', timestamp: new Date(now - 16 * h).toISOString(), photo_url: 'corrosion-under-bga' },
      { id: 7, job_id: 'JOB-9413', stage: 'AWAITING_APPROVAL', title: 'Estimate ₹7,670 Dispatched to Arunima', notes: 'Quote sent via WhatsApp tracking portal.', technician: 'Priya Nair', timestamp: new Date(now - 14 * h).toISOString(), photo_url: null },
      { id: 8, job_id: 'JOB-9413', stage: 'IN_REPAIR', title: 'Customer Approved via WhatsApp Portal', notes: 'Estimate authorized by customer Arunima Menon at 10:14 AM. Micro-soldering CD3217 IC and jumper wire started.', technician: 'Priya Nair', timestamp: new Date(now - 3 * h).toISOString(), photo_url: null }
    ],
    'JOB-9414': [
      { id: 9, job_id: 'JOB-9414', stage: 'INTAKE', title: 'EV High-Voltage Intake Check-In', notes: 'Ola S1 Pro Gen 2 brought in on flatbed. Code #BMS-09 logged.', technician: 'Amit Patel', timestamp: new Date(now - 5 * h).toISOString(), photo_url: null },
      { id: 10, job_id: 'JOB-9414', stage: 'DIAGNOSIS', title: 'CAN-Bus Telemetry & Cell Bank Analysis', notes: 'Cell Bank #04 delta-V 342mV confirmed. Active balancer connected for cell equalization.', technician: 'Amit Patel', timestamp: new Date(now - 1 * h).toISOString(), photo_url: 'thermal-cell-balance' }
    ],
    'JOB-9415': [
      { id: 11, job_id: 'JOB-9415', stage: 'INTAKE', title: 'Device Intake & Display Inspection', notes: 'Cracked upper-right OLED with touch dead zone.', technician: 'Sneha Joseph', timestamp: new Date(now - 2 * d).toISOString(), photo_url: null },
      { id: 12, job_id: 'JOB-9415', stage: 'AWAITING_APPROVAL', title: 'Display Quote Authorized by TechWorks Studio', notes: 'Approved for OEM 3.5K OLED panel swap.', technician: 'Sneha Joseph', timestamp: new Date(now - 1.75 * d).toISOString(), photo_url: null },
      { id: 13, job_id: 'JOB-9415', stage: 'IN_REPAIR', title: 'Display Swap & Hinge Calibration Complete', notes: 'Installed new OLED panel and torque-adjusted magnesium hinges.', technician: 'Sneha Joseph', timestamp: new Date(now - 1 * d).toISOString(), photo_url: null },
      { id: 14, job_id: 'JOB-9415', stage: 'READY_FOR_PICKUP', title: 'QA Burn-In Passed • Ready for Counter Pickup', notes: 'Passed 24h stress test. Calibrated color profiles. Ready for customer pickup.', technician: 'Sneha Joseph', timestamp: new Date(now - 45 * m).toISOString(), photo_url: null }
    ]
  };

  const photos = {
    'microscope-pmic-diode': {
      id: 'microscope-pmic-diode',
      title: 'Burned PMIC Diode & Fractured BGA (Microscope 40x)',
      type: 'microscope',
      caption: 'Visual inspection under Leica S9i 40x stereo microscope revealing micro-cracked solder ball array on Audio PMIC (U3100) and diode thermal cratering.',
      spec: '40x Optical Magnification • Dual Gooseneck Ring Light • ESD-Safe Stage',
      svg: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 260" width="100%" height="100%"><rect width="400" height="260" fill="%230f172a"/><circle cx="200" cy="130" r="110" fill="%23030712" stroke="%2338bdf8" stroke-width="2" stroke-dasharray="4 4"/><circle cx="200" cy="130" r="80" fill="%231e293b" opacity="0.8"/><rect x="150" y="85" width="100" height="90" rx="6" fill="%23334155" stroke="%2394a3b8" stroke-width="1.5"/><circle cx="165" cy="100" r="4" fill="%2322c55e"/><circle cx="185" cy="100" r="4" fill="%23e2e8f0"/><circle cx="205" cy="100" r="4" fill="%23e2e8f0"/><circle cx="225" cy="100" r="4" fill="%23e2e8f0"/><circle cx="165" cy="120" r="4" fill="%23e2e8f0"/><circle cx="185" cy="120" r="5" fill="%23ef4444" stroke="%23f87171" stroke-width="2"/><circle cx="205" cy="120" r="5" fill="%23ef4444"/><circle cx="225" cy="120" r="4" fill="%23e2e8f0"/><circle cx="165" cy="140" r="4" fill="%23e2e8f0"/><circle cx="185" cy="140" r="4" fill="%23f97316"/><circle cx="205" cy="140" r="4" fill="%23e2e8f0"/><circle cx="225" cy="140" r="4" fill="%23e2e8f0"/><circle cx="165" cy="160" r="4" fill="%23e2e8f0"/><circle cx="185" cy="160" r="4" fill="%23e2e8f0"/><circle cx="205" cy="160" r="4" fill="%23e2e8f0"/><circle cx="225" cy="160" r="4" fill="%2322c55e"/><path d="M182 118 L210 122" stroke="%23facc15" stroke-width="2"/><text x="200" y="22" fill="%2338bdf8" font-family="monospace" font-size="11" text-anchor="middle" font-weight="bold">LEICA S9i 40X STEREO MICROSCOPE // U3100 AUDIO IC</text><text x="200" y="248" fill="%23f87171" font-family="monospace" font-size="10" text-anchor="middle">▲ FRACTURED SOLDER BALLS & CHARRED DIODE D3101</text></svg>'
    },
    'corrosion-under-bga': {
      id: 'corrosion-under-bga',
      title: 'Liquid Corrosion Under CD3217 BGA (Microscope 100x)',
      type: 'corrosion',
      caption: 'Severe copper oxide and ionic crystallization under TI CD3217 USB-C PD Controller IC following cappuccino ingress. Shorting PP3V3_G3H to ground.',
      spec: '100x Magnification • Polarized UV Ring Light • Chemical LCI Red Confirmed',
      svg: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 260" width="100%" height="100%"><rect width="400" height="260" fill="%230b132b"/><circle cx="200" cy="130" r="115" fill="%2306101e" stroke="%2310b981" stroke-width="1.5"/><rect x="140" y="70" width="120" height="120" rx="4" fill="%231c2541" stroke="%2348cae4" stroke-width="1.5"/><path d="M160 85 Q175 105 165 130 T190 150 T220 160" fill="none" stroke="%2310b981" stroke-width="6" opacity="0.85"/><circle cx="170" cy="110" r="12" fill="%23059669" opacity="0.7"/><circle cx="185" cy="125" r="16" fill="%2310b981" opacity="0.6"/><circle cx="160" cy="95" r="8" fill="%2334d399" opacity="0.8"/><circle cx="205" cy="140" r="10" fill="%23059669" opacity="0.7"/><text x="200" y="22" fill="%2334d399" font-family="monospace" font-size="11" text-anchor="middle" font-weight="bold">CD3217 USB-C CONTROLLER // CORROSION CRUST</text><text x="200" y="248" fill="%23ef4444" font-family="monospace" font-size="10" text-anchor="middle">▲ PP3V3_G3H BRIDGE TO GROUND • ULTRASONIC WASH REQUIRED</text></svg>'
    },
    'thermal-cell-balance': {
      id: 'thermal-cell-balance',
      title: 'FLIR Thermal Heat Signature @ 74.2°C Hotspot',
      type: 'thermal',
      caption: 'FLIR E8-XT thermal camera mapping shows concentrated short circuit generating 74.2°C localized thermal hotspot with ambient PCB at 28.1°C.',
      spec: 'FLIR E8-XT 320x240 Infrared • False-Color Ironbow • Delta-T: +46.1°C',
      svg: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 260" width="100%" height="100%"><defs><radialGradient id="flirHot" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="%23ffffff"/><stop offset="25%" stop-color="%23facc15"/><stop offset="50%" stop-color="%23ef4444"/><stop offset="75%" stop-color="%238b5cf6"/><stop offset="100%" stop-color="%231e1b4b"/></radialGradient></defs><rect width="400" height="260" fill="%230f0e26"/><circle cx="200" cy="130" r="95" fill="url(%23flirHot)"/><path d="M190 130 L210 130 M200 120 L200 140" stroke="%23ffffff" stroke-width="2"/><text x="200" y="112" fill="%23ffffff" font-family="monospace" font-size="12" font-weight="bold" text-anchor="middle">74.2°C</text><text x="370" y="30" fill="%23facc15" font-family="monospace" font-size="10" text-anchor="end">MAX: 78.4°C</text><text x="370" y="45" fill="%23818cf8" font-family="monospace" font-size="10" text-anchor="end">MIN: 28.1°C</text><text x="200" y="22" fill="%23f43f5e" font-family="monospace" font-size="11" text-anchor="middle" font-weight="bold">FLIR E8-XT THERMAL RADIOMETRIC SCAN</text><text x="200" y="248" fill="%23fde047" font-family="monospace" font-size="10" text-anchor="middle">HOTSPOT AT U3100 POWER RAIL // SHORT CIRCUIT DETECTED</text></svg>'
    }
  };

  const jobsMap = new Map();
  jobs.forEach(j => jobsMap.set(j.id, j));

  const partsMap = new Map();
  parts.forEach(p => partsMap.set(p.sku, p));

  return {
    jobs: jobsMap,
    checklists: new Map(Object.entries(checklists)),
    estimates: new Map(Object.entries(estimates)),
    timeline: new Map(Object.entries(timeline)),
    parts: partsMap,
    photos: photos
  };
}

let memoryStore = null;

export function getStore() {
  if (!memoryStore) {
    memoryStore = createInitialData();
  }
  // Defensive time drift guard against snapshot freezing
  const now = Date.now();
  for (const job of memoryStore.jobs.values()) {
    const createdMs = new Date(job.created_at).getTime();
    if (isNaN(createdMs) || createdMs > now || createdMs < 1672531199000) {
      job.created_at = new Date(now - 2 * 3600 * 1000).toISOString();
      job.updated_at = new Date(now - 15 * 60 * 1000).toISOString();
    }
  }
  return memoryStore;
}

export function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
