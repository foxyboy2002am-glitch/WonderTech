// Supabase Edge Function: create-checkout
// Deploy with Supabase CLI. Keep PAYMOB_API_KEY, PAYMOB_INTEGRATION_ID,
// PAYMOB_IFRAME_ID and SUPABASE_SERVICE_ROLE_KEY in Edge Function secrets only.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": Deno.env.get("CHECKOUT_ALLOWED_ORIGIN") ?? "https://wondertecheg.com",
  "Access-Control-Allow-Headers": "authorization, apikey, content-type, x-client-info",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json",
};
const reply = (status: number, body: unknown) => new Response(JSON.stringify(body), { status, headers: cors });
const piasters = (value: number) => Math.round(value * 100);

// Do not add demo catalog items here. Replace this allowlist with live products
// managed server-side before enabling online charges.
const LIVE_CATALOG: Record<string, { name: string; priceEgp: number; active: boolean }> = {
  "demo-laptop": { name: "Laptop — demo item", priceEgp: 18500, active: false },
  "demo-camera": { name: "Security camera — demo item", priceEgp: 1450, active: false },
  "demo-pos": { name: "POS system — demo item", priceEgp: 8900, active: false },
  "demo-network": { name: "Networking equipment — demo item", priceEgp: 2350, active: false },
  "demo-erp": { name: "Software & ERP — demo item", priceEgp: 500, active: false },
  "demo-support": { name: "Technical support — demo item", priceEgp: 750, active: false },
  // Add real SKU entries with verified prices and active: true before enabling Paymob.
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return reply(405, { error: "Method not allowed" });

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !anonKey || !serviceKey) return reply(503, { error: "Checkout backend is not configured." });

  const authHeader = req.headers.get("Authorization") ?? "";
  if (!authHeader.startsWith("Bearer ")) return reply(401, { error: "Please sign in to checkout." });

  const userClient = createClient(supabaseUrl, anonKey, { global: { headers: { Authorization: authHeader } } });
  const { data: { user }, error: userError } = await userClient.auth.getUser();
  if (userError || !user) return reply(401, { error: "Invalid or expired session." });

  let input: any;
  try { input = await req.json(); } catch { return reply(400, { error: "Invalid request body." }); }
  const method = input?.paymentMethod;
  if (!["paymob", "cod", "whatsapp"].includes(method)) return reply(400, { error: "Unsupported payment method." });

  const customer = input?.customer ?? {};
  const name = String(customer.name ?? "").trim().slice(0, 100);
  const phone = String(customer.phone ?? "").trim().slice(0, 30);
  const city = String(customer.city ?? "").trim().slice(0, 100);
  const address = String(customer.address ?? "").trim().slice(0, 400);
  const notes = String(customer.notes ?? "").trim().slice(0, 300);
  if (!name || !phone || !city || !address) return reply(400, { error: "Complete all required delivery details." });

  const items = input?.items;
  if (!Array.isArray(items) || items.length < 1 || items.length > 30) return reply(400, { error: "Invalid cart." });

  // Server calculates prices; browser-provided totals and prices are ignored.
  let totalPiasters = 0;
  const checked: Array<{ id: string; name: string; qty: number; unit: number; line: number }> = [];
  for (const item of items) {
    const id = String(item?.id ?? "");
    const qty = Number(item?.qty);
    const product = LIVE_CATALOG[id];
    if (!product || (method === "paymob" && !product.active)) {
      return reply(409, { error: "Online checkout is not available for demo or unavailable products yet." });
    }
    if (!Number.isInteger(qty) || qty < 1 || qty > 99) return reply(400, { error: "Invalid quantity." });
    const unit = piasters(product.priceEgp);
    const line = unit * qty;
    totalPiasters += line;
    checked.push({ id, name: product.name, qty, unit, line });
  }
  if (totalPiasters <= 0 || totalPiasters > 500000000) return reply(400, { error: "Order total is invalid." });

  const admin = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });
  const orderNumber = "WT-" + crypto.randomUUID().replaceAll("-", "").slice(0, 10).toUpperCase();
  const paymentReference = crypto.randomUUID();

  const { data: order, error: insertError } = await admin.from("wt_orders").insert({
    order_number: orderNumber, user_id: user.id, customer_name: name,
    customer_email: user.email ?? "", customer_phone: phone, customer_city: city,
    customer_address: address, customer_notes: notes, subtotal_piasters: totalPiasters,
    payment_method: method, payment_status: method === "cod" || method === "whatsapp" ? "cod_pending" : "pending",
    order_status: method === "paymob" ? "pending_payment" : "pending_confirmation",
    payment_reference: paymentReference,
  }).select("id,order_number").single();
  if (insertError || !order) return reply(500, { error: "Could not create order." });

  const { error: itemsError } = await admin.from("wt_order_items").insert(checked.map(x => ({
    order_id: order.id, product_id: x.id, product_name: x.name,
    quantity: x.qty, unit_price_piasters: x.unit, line_total_piasters: x.line,
  })));
  if (itemsError) {
    await admin.from("wt_orders").delete().eq("id", order.id);
    return reply(500, { error: "Could not save order items." });
  }

  if (method !== "paymob") {
    return reply(200, { orderId: order.id, orderNumber: order.order_number, paymentMethod: method, status: "pending_confirmation" });
  }

  const apiKey = Deno.env.get("PAYMOB_API_KEY");
  const integrationId = Deno.env.get("PAYMOB_INTEGRATION_ID");
  const iframeId = Deno.env.get("PAYMOB_IFRAME_ID");
  if (!apiKey || !integrationId || !iframeId) return reply(503, {
    error: "Paymob credentials are not configured on the server.",
    orderNumber: order.order_number,
  });

  try {
    const authRes = await fetch("https://accept.paymob.com/api/auth/tokens", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ api_key: apiKey }),
    });
    if (!authRes.ok) throw new Error("Paymob authentication failed");
    const auth = await authRes.json();

    const orderRes = await fetch("https://accept.paymob.com/api/ecommerce/orders", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        auth_token: auth.token, delivery_needed: false, amount_cents: totalPiasters,
        currency: "EGP", merchant_order_id: order.order_number,
        items: checked.map(x => ({ name: x.name, amount_cents: x.unit, quantity: x.qty })),
      }),
    });
    if (!orderRes.ok) throw new Error("Paymob order creation failed");
    const paymobOrder = await orderRes.json();

    const paymentRes = await fetch("https://accept.paymob.com/api/acceptance/payment_keys", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        auth_token: auth.token, amount_cents: totalPiasters, expiration: 3600,
        order_id: paymobOrder.id, currency: "EGP", integration_id: Number(integrationId),
        lock_order_when_paid: true,
        billing_data: {
          apartment: "NA", email: user.email ?? "customer@example.com", floor: "NA",
          first_name: name.split(" ")[0] || "Customer", street: address,
          building: "NA", phone_number: phone, shipping_method: "NA",
          postal_code: "NA", city, country: "EG",
          last_name: name.split(" ").slice(1).join(" ") || "Customer",
          state: city,
        },
      }),
    });
    if (!paymentRes.ok) throw new Error("Paymob payment key creation failed");
    const payment = await paymentRes.json();
    await admin.from("wt_orders").update({ paymob_order_id: String(paymobOrder.id), updated_at: new Date().toISOString() }).eq("id", order.id);
    return reply(200, {
      orderId: order.id, orderNumber: order.order_number,
      paymentUrl: "https://accept.paymob.com/api/acceptance/iframes/" + encodeURIComponent(iframeId) + "?payment_token=" + encodeURIComponent(payment.token),
      status: "pending",
    });
  } catch (_err) {
    // Do not leak provider errors or credentials to the browser.
    await admin.from("wt_orders").update({ payment_status: "failed", updated_at: new Date().toISOString() }).eq("id", order.id);
    return reply(502, { error: "Could not start Paymob checkout. Please try again or choose cash on delivery." });
  }
});
