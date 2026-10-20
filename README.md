# WONDERTECH | واندر تك

- `index.html`: page shell.
- `assets/app.js`: bilingual site, Supabase auth, sample catalog/cart/wishlist and demo checkout.
- `assets/site.css`: responsive styles.
- `assets/clients/`: upload client logos here; see its README.
- `assets/supabase-config.js`: public URL and anon-key placeholders only.
- `supabase/schema.sql`: schema and Row Level Security.
- `supabase/seed-demo.sql`: optional inactive demo catalog records.

## Supabase
Create a Supabase project, configure its URL and `anon/public` key in `assets/supabase-config.js`, run `supabase/schema.sql`, and configure Auth redirect URLs. Never commit service-role keys, passwords, or payment secrets. Passwords are handled by Supabase Auth. Real sign-up/login requires a configured project.

## Demo store
Six sample products show EGP demo prices for UI testing. Cart and demo checkout are local to the current browser; demo checkout does not charge money, create a real order, or collect card data. Optional database sample rows are inactive and have zero stock.

## Before live payments
GitHub Pages is static and cannot securely process payments alone. Add a trusted backend/Edge Function to validate prices and stock and create orders, integrate a selected payment provider with secrets stored server-side, and verify signed webhooks. Never trust browser state to mark orders paid. Real payments are not enabled.

## Performance
Optimize images (WebP when suitable), lazy-load below-the-fold images, set image dimensions/aspect ratios, avoid autoplay and heavy animation libraries, and run Lighthouse plus real mobile-device tests before launch.
