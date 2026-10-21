# WonderTech checkout and Paymob setup

## Current safeguards

- The browser never receives Paymob secret credentials.
- create-checkout requires a signed-in Supabase user and calculates totals server-side.
- Paymob is deliberately blocked for the current demo catalog entries.
- COD and WhatsApp requests are recorded in wt_orders / wt_order_items after deployment.
- The browser cannot insert or change order/payment status directly.
- paymob-callback verifies Paymob's HMAC before changing payment status.

## Required before production

1. Replace the demo catalog in assets/app.js with real product IDs and real prices, and add those same SKUs/prices to LIVE_CATALOG in supabase/functions/create-checkout/index.ts with active: true. Ideally load products from a protected server-side catalog table rather than maintain two copies.
2. Review the checkout, privacy notice, delivery fees, cancellation/refund policy, and tax/invoice requirements for your business.
3. Install Supabase CLI and link the project:
   supabase login
   supabase link --project-ref lvfuebglrgdaqzdoetos
4. Run the SQL migration in the Supabase SQL Editor:
   supabase/migrations/202610210001_wt_orders.sql
5. Set server-only secrets (never commit them to GitHub or put them in assets/):
   - SUPABASE_URL
   - SUPABASE_ANON_KEY
   - SUPABASE_SERVICE_ROLE_KEY
   - PAYMOB_API_KEY
   - PAYMOB_INTEGRATION_ID
   - PAYMOB_IFRAME_ID
   - PAYMOB_HMAC_SECRET
   - CHECKOUT_ALLOWED_ORIGIN=https://wondertecheg.com
6. Deploy:
   supabase functions deploy create-checkout
   supabase functions deploy paymob-callback --no-verify-jwt
7. Configure the Paymob transaction callback URL to:
   https://lvfuebglrgdaqzdoetos.supabase.co/functions/v1/paymob-callback
   Confirm the callback payload format and HMAC settings with the Paymob dashboard/account documentation before enabling live charges.
8. Test with Paymob test credentials and test cards first. Verify successful, failed, cancelled, duplicate callback, amount mismatch, and unauthenticated cases. Only then use live credentials.

## Important notes

- This repository update does not deploy Edge Functions to Supabase automatically. GitHub Pages hosts the frontend only; Edge Functions and database migration must be deployed separately.
- No card number or CVV is collected by this website. Card details are entered only on Paymob's hosted payment page.
- The current product data is demo-only, so Paymob online payments will return an explicit unavailable response until real SKUs/prices are configured.
- Confirm Paymob's legacy Accept API access and callback HMAC configuration for your merchant account; account-specific API versions and credentials may differ.
