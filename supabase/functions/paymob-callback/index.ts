// Supabase Edge Function: paymob-callback
// Configure Paymob to send transaction callbacks to this function.
// PAYMOB_HMAC_SECRET must be stored as a Supabase Edge Function secret.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
const cors = { "Access-Control-Allow-Origin": "https://wondertecheg.com", "Content-Type": "application/json" };
const reply = (status: number, body: unknown) => new Response(JSON.stringify(body), { status, headers: cors });

function constantTimeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}
async function hmacHex(secret: string, data: string) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-512" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data));
  return Array.from(new Uint8Array(sig)).map(x => x.toString(16).padStart(2, "0")).join("");
}
Deno.serve(async (req) => {
  if (req.method !== "POST") return reply(405, { error: "Method not allowed" });
  const secret = Deno.env.get("PAYMOB_HMAC_SECRET");
  const url = Deno.env.get("SUPABASE_URL"), serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!secret || !url || !serviceKey) return reply(503, { error: "Webhook is not configured." });
  let body: any;
  try { body = await req.json(); } catch { return reply(400, { error: "Invalid JSON." }); }
  const obj = body?.obj;
  const supplied = String(body?.hmac ?? req.headers.get("x-paymob-hmac") ?? "");
  if (!obj || !supplied) return reply(400, { error: "Missing transaction data or HMAC." });

  // Paymob Accept HMAC field order, concatenated without separators.
  const fields = [
    obj.amount_cents, obj.created_at, obj.currency, obj.error_occured, obj.has_parent_transaction,
    obj.id, obj.integration_id, obj.is_3d_secure, obj.is_auth, obj.is_capture, obj.is_refunded,
    obj.is_standalone_payment, obj.is_voided, obj.order?.id, obj.owner, obj.pending, obj.source_data?.pan,
    obj.source_data?. sub_type, obj.source_data?.type, obj.success,
  ];
  const payload = fields.map(v => String(v ?? "")).join("");
  const expected = await hmacHex(secret, payload);
  if (!constantTimeEqual(expected.toLowerCase(), supplied.toLowerCase())) return reply(401, { error: "Invalid HMAC." });

  const admin = createClient(url, serviceKey, { auth: { persistSession: false } });
  const transactionId = String(obj.id ?? "");
  const paymobOrderId = String(obj.order?.id ?? "");
  const success = obj.success === true && obj.pending === false && obj.error_occured === false;
  if (!transactionId || !paymobOrderId) return reply(400, { error: "Missing payment identifiers." });

  const { data: order, error } = await admin.from("wt_orders").select("id,subtotal_piasters,payment_status").eq("paymob_order_id", paymobOrderId).maybeSingle();
  if (error || !order) return reply(404, { error: "Order not found." });
  if (Number(obj.amount_cents) !== Number(order.subtotal_piasters) || String(obj.currency) !== "EGP") return reply(400, { error: "Amount or currency mismatch." });
  if (order.payment_status === "paid") return reply(200, { ok: true, duplicate: true });

  const { error: updateError } = await admin.from("wt_orders").update({
    payment_status: success ? "paid" : "failed",
    order_status: success ? "confirmed" : "pending_payment",
    paymob_transaction_id: transactionId,
    updated_at: new Date().toISOString(),
  }).eq("id", order.id);
  if (updateError) return reply(500, { error: "Could not update order." });
  return reply(200, { ok: true });
});
