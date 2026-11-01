export async function onRequest() {
  return new Response(JSON.stringify({ service: 'tpl-serp-repair-tracker', status: 'ok', items: [{"id":"JOB-9412","name":"Arunima Menon — MacBook Pro 14\" M2 (SN: C02Y88)","phone":"919847011223","detail":"Intake: No Power (Liquid Spill) • Part: CD3217 IC + Ultrasonic • Bench #2","status":"READY FOR PICKUP ✅","amount":"₹7,670"},{"id":"JOB-9413","name":"Vivek Pillai — iPhone 15 Pro (IMEI: 35891109)","phone":"919447022334","detail":"Intake: Cracked OLED Glass (FaceID OK) • Waiting Customer Approval","status":"AWAITING APPROVAL","amount":"₹14,900"},{"id":"JOB-9414","name":"TechWorks Studio — Seagate 4TB NAS Drive","phone":"919895033445","detail":"Intake: Clicking Head • Cleanroom Donor Swap in Progress","status":"ON BENCH // TESTING","amount":"₹11,800"}] }), {
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=30, s-maxage=60, stale-while-revalidate=120' }
  });
}
