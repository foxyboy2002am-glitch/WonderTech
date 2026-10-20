# WONDERTECH | واندر تك

موقع WonderTech الرسمي، مع تجهيز أولي لتسجيل الحسابات والمتجر الإلكتروني.

## Project structure
- `index.html` — page shell and metadata.
- `assets/site.css` — responsive styles, motion, and accessibility.
- `assets/app.js` — bilingual site, routing, account UI, demo catalog/cart/wishlist.
- `assets/logo.png` — brand logo.
- `assets/supabase-config.js` — public client configuration placeholders only.
- `supabase/schema.sql` — initial database schema and Row Level Security policies.

## Supabase setup
1. Create a Supabase project.
2. Copy the project URL and the **anon/public** browser key into `assets/supabase-config.js`.
3. Never put a Supabase `service_role` key, payment secret, or any server secret in frontend files.
4. Run `supabase/schema.sql` in the Supabase SQL Editor.
5. In Supabase Authentication settings, configure the site URL and allowed redirect URLs for your GitHub Pages/custom domain, and enable email confirmation as desired.
6. Test signup, confirmation, sign-in, sign-out, and password reset on the deployed site.

Until a real project URL and anon key are configured, account pages intentionally show setup guidance. No real user credentials are stored by this site.

## Store readiness
The catalog items are explicitly demo placeholders with no sale prices and are not represented as real inventory. Cart and wishlist currently use browser-local storage for preview only. Checkout and payment are disabled.

Before selling:
- Replace demo items with approved product data and images.
- Add a trusted server-side/Edge Function checkout flow that calculates prices and checks stock.
- Integrate a payment provider using server-side secrets and verified webhooks.
- Add administrator roles and protected server-side product/order management.
- Test Row Level Security and checkout/order creation before launch.

## Deployment
GitHub Pages should use branch `main` and folder `/(root)`. Keep the `CNAME` file in the repository root for the custom domain.
