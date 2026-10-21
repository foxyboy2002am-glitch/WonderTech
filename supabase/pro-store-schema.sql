-- WONDERTECH Professional Store Database (Supabase / PostgreSQL)
-- Additive migration: preserves existing wt_admins, wt_orders and wt_analytics_events.
-- Run once in Supabase SQL Editor. Back up production before changing a live store.
begin;

create extension if not exists pgcrypto;

-- Staff roles and audit trail
create table if not exists public.wt_admin_roles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'admin' check (role in ('owner','admin','manager','support','analyst','warehouse')),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
insert into public.wt_admin_roles(user_id,role)
select user_id,'owner' from public.wt_admins
on conflict(user_id) do nothing;

create table if not exists public.wt_admin_audit_logs (
  id bigint generated always as identity primary key,
  actor_user_id uuid references auth.users(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id text,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- Customer records / addresses
create table if not exists public.wt_customers (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique references auth.users(id) on delete set null,
  full_name text not null,
  email text,
  phone text not null,
  phone_normalized text,
  marketing_consent boolean not null default false,
  notes text not null default '',
  tags text[] not null default '{}',
  is_blocked boolean not null default false,
  first_seen_at timestamptz not null default now(),
  last_seen_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create unique index if not exists wt_customers_phone_normalized_uq on public.wt_customers(phone_normalized) where phone_normalized is not null and phone_normalized <> '';
create index if not exists wt_customers_created_idx on public.wt_customers(created_at desc);
create table if not exists public.wt_customer_addresses (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.wt_customers(id) on delete cascade,
  label text not null default 'المنزل',
  recipient_name text not null,
  phone text not null,
  governorate text,
  city text not null,
  district text,
  address_line text not null,
  building text,
  floor text,
  apartment text,
  landmark text,
  postal_code text,
  is_default boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists wt_customer_addresses_customer_idx on public.wt_customer_addresses(customer_id);

-- Product catalog
create table if not exists public.wt_categories (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid references public.wt_categories(id) on delete set null,
  name text not null,
  slug text not null unique,
  description text not null default '',
  image_url text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table if not exists public.wt_products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.wt_categories(id) on delete set null,
  sku text unique,
  slug text not null unique,
  name text not null,
  short_description text not null default '',
  description text not null default '',
  brand text,
  product_type text not null default 'physical' check(product_type in ('physical','digital','service')),
  status text not null default 'draft' check(status in ('draft','active','archived')),
  currency char(3) not null default 'EGP',
  price numeric(12,2) not null default 0 check(price>=0),
  compare_at_price numeric(12,2) check(compare_at_price is null or compare_at_price>=0),
  cost_price numeric(12,2) check(cost_price is null or cost_price>=0),
  barcode text,
  track_inventory boolean not null default true,
  allow_backorder boolean not null default false,
  weight_grams integer check(weight_grams is null or weight_grams>=0),
  seo_title text,
  seo_description text,
  attributes jsonb not null default '{}'::jsonb,
  metadata jsonb not null default '{}'::jsonb,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists wt_products_category_idx on public.wt_products(category_id,status);
create index if not exists wt_products_name_idx on public.wt_products using gin(to_tsvector('simple',name));
create table if not exists public.wt_product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.wt_products(id) on delete cascade,
  storage_path text not null,
  alt_text text not null default '',
  sort_order integer not null default 0,
  is_primary boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists wt_product_images_product_idx on public.wt_product_images(product_id,sort_order);
create table if not exists public.wt_product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.wt_products(id) on delete cascade,
  sku text unique,
  option_values jsonb not null default '{}'::jsonb,
  price_override numeric(12,2) check(price_override is null or price_override>=0),
  compare_at_price numeric(12,2),
  barcode text,
  weight_grams integer,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists wt_product_variants_product_idx on public.wt_product_variants(product_id);

-- Inventory / stock movements
create table if not exists public.wt_inventory (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references public.wt_products(id) on delete cascade,
  variant_id uuid references public.wt_product_variants(id) on delete cascade,
  location_code text not null default 'MAIN',
  quantity_on_hand integer not null default 0,
  quantity_reserved integer not null default 0,
  reorder_level integer not null default 0,
  updated_at timestamptz not null default now(),
  check(product_id is not null or variant_id is not null),
  check(quantity_reserved>=0 and quantity_on_hand>=0 and quantity_reserved<=quantity_on_hand),
  unique(product_id,variant_id,location_code)
);
create table if not exists public.wt_inventory_movements (
  id bigint generated always as identity primary key,
  product_id uuid references public.wt_products(id) on delete set null,
  variant_id uuid references public.wt_product_variants(id) on delete set null,
  location_code text not null default 'MAIN',
  movement_type text not null check(movement_type in ('opening','purchase','sale','return','adjustment','reservation','release','damage','transfer_in','transfer_out')),
  quantity_delta integer not null,
  reference_type text,
  reference_id text,
  note text not null default '',
  actor_user_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);
create index if not exists wt_inventory_movements_created_idx on public.wt_inventory_movements(created_at desc);
create index if not exists wt_inventory_movements_product_idx on public.wt_inventory_movements(product_id,created_at desc);

-- Shopping carts: supports guest and signed-in sessions
create table if not exists public.wt_carts (
  id uuid primary key default gen_random_uuid(),
  session_id text,
  customer_id uuid references public.wt_customers(id) on delete set null,
  status text not null default 'active' check(status in ('active','converted','abandoned','expired')),
  currency char(3) not null default 'EGP',
  subtotal numeric(12,2) not null default 0,
  discount_total numeric(12,2) not null default 0,
  shipping_total numeric(12,2) not null default 0,
  tax_total numeric(12,2) not null default 0,
  grand_total numeric(12,2) not null default 0,
  coupon_code text,
  last_activity_at timestamptz not null default now(),
  converted_order_id bigint,
  expires_at timestamptz not null default (now()+interval '30 days'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists wt_carts_active_idx on public.wt_carts(status,last_activity_at desc);
create index if not exists wt_carts_session_idx on public.wt_carts(session_id,last_activity_at desc);
create table if not exists public.wt_cart_items (
  id uuid primary key default gen_random_uuid(),
  cart_id uuid not null references public.wt_carts(id) on delete cascade,
  product_id uuid references public.wt_products(id) on delete set null,
  variant_id uuid references public.wt_product_variants(id) on delete set null,
  product_name_snapshot text not null,
  sku_snapshot text,
  unit_price numeric(12,2) not null check(unit_price>=0),
  quantity integer not null check(quantity>0),
  line_total numeric(12,2) generated always as (unit_price*quantity) stored,
  options_snapshot jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(cart_id,product_id,variant_id)
);

-- Extend the existing order table without dropping its existing data
alter table public.wt_orders add column if not exists order_number text;
alter table public.wt_orders add column if not exists customer_id uuid references public.wt_customers(id) on delete set null;
alter table public.wt_orders add column if not exists email text;
alter table public.wt_orders add column if not exists currency char(3) not null default 'EGP';
alter table public.wt_orders add column if not exists subtotal numeric(12,2) not null default 0;
alter table public.wt_orders add column if not exists discount_total numeric(12,2) not null default 0;
alter table public.wt_orders add column if not exists shipping_total numeric(12,2) not null default 0;
alter table public.wt_orders add column if not exists tax_total numeric(12,2) not null default 0;
alter table public.wt_orders add column if not exists payment_method text;
alter table public.wt_orders add column if not exists payment_status text not null default 'unpaid';
alter table public.wt_orders add column if not exists fulfillment_status text not null default 'unfulfilled';
alter table public.wt_orders add column if not exists shipping_address jsonb not null default '{}'::jsonb;
alter table public.wt_orders add column if not exists billing_address jsonb not null default '{}'::jsonb;
alter table public.wt_orders add column if not exists source text not null default 'website';
alter table public.wt_orders add column if not exists tracking_number text;
alter table public.wt_orders add column if not exists shipped_at timestamptz;
alter table public.wt_orders add column if not exists delivered_at timestamptz;
alter table public.wt_orders add column if not exists cancelled_at timestamptz;
alter table public.wt_orders add column if not exists cancellation_reason text;
alter table public.wt_orders add column if not exists internal_notes text not null default '';
alter table public.wt_orders add column if not exists updated_at timestamptz not null default now();
create unique index if not exists wt_orders_order_number_uq on public.wt_orders(order_number) where order_number is not null;
create index if not exists wt_orders_status_created_idx on public.wt_orders(status,created_at desc);
create index if not exists wt_orders_customer_idx on public.wt_orders(customer_id,created_at desc);
create index if not exists wt_orders_payment_status_idx on public.wt_orders(payment_status,created_at desc);

create table if not exists public.wt_order_items (
  id uuid primary key default gen_random_uuid(),
  order_id bigint not null references public.wt_orders(id) on delete cascade,
  product_id uuid references public.wt_products(id) on delete set null,
  variant_id uuid references public.wt_product_variants(id) on delete set null,
  product_name_snapshot text not null,
  sku_snapshot text,
  unit_price numeric(12,2) not null check(unit_price>=0),
  quantity integer not null check(quantity>0),
  discount_amount numeric(12,2) not null default 0 check(discount_amount>=0),
  tax_amount numeric(12,2) not null default 0 check(tax_amount>=0),
  line_total numeric(12,2) not null check(line_total>=0),
  options_snapshot jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index if not exists wt_order_items_order_idx on public.wt_order_items(order_id);
create index if not exists wt_order_items_product_idx on public.wt_order_items(product_id);
create table if not exists public.wt_order_status_history (
  id bigint generated always as identity primary key,
  order_id bigint not null references public.wt_orders(id) on delete cascade,
  old_status text,
  new_status text not null,
  note text not null default '',
  changed_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);
create index if not exists wt_order_status_history_order_idx on public.wt_order_status_history(order_id,created_at desc);

-- Payments, shipping and refunds
create table if not exists public.wt_payments (
  id uuid primary key default gen_random_uuid(),
  order_id bigint not null references public.wt_orders(id) on delete cascade,
  provider text not null default 'cash_on_delivery',
  provider_reference text,
  amount numeric(12,2) not null check(amount>=0),
  currency char(3) not null default 'EGP',
  status text not null default 'pending' check(status in ('pending','authorized','paid','failed','refunded','partially_refunded')),
  paid_at timestamptz,
  raw_response jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists wt_payments_order_idx on public.wt_payments(order_id,created_at desc);
create table if not exists public.wt_refunds (
  id uuid primary key default gen_random_uuid(),
  payment_id uuid not null references public.wt_payments(id) on delete restrict,
  order_id bigint not null references public.wt_orders(id) on delete restrict,
  amount numeric(12,2) not null check(amount>0),
  reason text not null default '',
  status text not null default 'requested' check(status in ('requested','approved','rejected','processed')),
  provider_reference text,
  processed_at timestamptz,
  created_at timestamptz not null default now()
);
create table if not exists public.wt_shipments (
  id uuid primary key default gen_random_uuid(),
  order_id bigint not null references public.wt_orders(id) on delete cascade,
  carrier text,
  service_name text,
  tracking_number text,
  status text not null default 'pending' check(status in ('pending','packed','shipped','in_transit','delivered','failed','returned')),
  shipping_cost numeric(12,2) not null default 0 check(shipping_cost>=0),
  shipped_at timestamptz,
  delivered_at timestamptz,
  notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Discounts / coupon campaigns
create table if not exists public.wt_coupons (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  description text not null default '',
  discount_type text not null check(discount_type in ('percentage','fixed','free_shipping')),
  discount_value numeric(12,2) not null default 0 check(discount_value>=0),
  minimum_order numeric(12,2) not null default 0,
  usage_limit integer,
  per_customer_limit integer,
  usage_count integer not null default 0,
  starts_at timestamptz,
  expires_at timestamptz,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);
create table if not exists public.wt_coupon_redemptions (
  id bigint generated always as identity primary key,
  coupon_id uuid not null references public.wt_coupons(id) on delete restrict,
  order_id bigint not null references public.wt_orders(id) on delete cascade,
  customer_id uuid references public.wt_customers(id) on delete set null,
  discount_amount numeric(12,2) not null check(discount_amount>=0),
  created_at timestamptz not null default now(),
  unique(coupon_id,order_id)
);

-- Reviews, wishlists, notifications and configuration
create table if not exists public.wt_product_reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.wt_products(id) on delete cascade,
  customer_id uuid references public.wt_customers(id) on delete set null,
  order_id bigint references public.wt_orders(id) on delete set null,
  rating integer not null check(rating between 1 and 5),
  title text not null default '',
  body text not null default '',
  status text not null default 'pending' check(status in ('pending','approved','rejected')),
  created_at timestamptz not null default now()
);
create table if not exists public.wt_wishlists (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.wt_customers(id) on delete cascade,
  product_id uuid not null references public.wt_products(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique(customer_id,product_id)
);
create table if not exists public.wt_notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  type text not null,
  title text not null,
  body text not null default '',
  link text,
  read_at timestamptz,
  created_at timestamptz not null default now()
);
create table if not exists public.wt_store_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_by uuid references auth.users(id) on delete set null,
  updated_at timestamptz not null default now()
);

-- Analytics additions for funnel, attribution, product views and cart abandonment
alter table public.wt_analytics_events add column if not exists customer_id uuid references public.wt_customers(id) on delete set null;
alter table public.wt_analytics_events add column if not exists product_id uuid references public.wt_products(id) on delete set null;
alter table public.wt_analytics_events add column if not exists cart_id uuid references public.wt_carts(id) on delete set null;
alter table public.wt_analytics_events add column if not exists order_id bigint references public.wt_orders(id) on delete set null;
alter table public.wt_analytics_events add column if not exists referrer text;
alter table public.wt_analytics_events add column if not exists utm_source text;
alter table public.wt_analytics_events add column if not exists utm_medium text;
alter table public.wt_analytics_events add column if not exists utm_campaign text;
create index if not exists wt_analytics_event_type_created_idx on public.wt_analytics_events(event_type,created_at desc);
create index if not exists wt_analytics_product_idx on public.wt_analytics_events(product_id,created_at desc);

-- Common reporting views
create or replace view public.wt_report_daily_sales as
select date_trunc('day',created_at)::date as sales_date,
       count(*) filter(where status='completed') as completed_orders,
       count(*) filter(where status='pending') as pending_orders,
       count(*) filter(where status='cancelled') as cancelled_orders,
       coalesce(sum(total) filter(where status='completed'),0)::numeric(12,2) as gross_sales,
       coalesce(avg(total) filter(where status='completed'),0)::numeric(12,2) as average_order_value
from public.wt_orders group by 1;

create or replace view public.wt_report_top_products as
select product_name_snapshot as product_name, sum(quantity)::bigint as units_sold,
       sum(line_total)::numeric(12,2) as gross_revenue, count(distinct order_id)::bigint as orders_count
from public.wt_order_items oi join public.wt_orders o on o.id=oi.order_id
where o.status='completed' group by product_name_snapshot;

create or replace view public.wt_report_low_stock as
select p.id as product_id,p.name,p.sku,i.location_code,i.quantity_on_hand,i.quantity_reserved,
       (i.quantity_on_hand-i.quantity_reserved) as available_quantity,i.reorder_level
from public.wt_inventory i join public.wt_products p on p.id=i.product_id
where p.track_inventory and (i.quantity_on_hand-i.quantity_reserved)<=i.reorder_level;

-- Enable RLS everywhere; deny public table access by default, then allow admin roles.
do $$
declare t text;
begin
 foreach t in array array[
 'wt_admin_roles','wt_admin_audit_logs','wt_customers','wt_customer_addresses','wt_categories',
 'wt_products','wt_product_images','wt_product_variants','wt_inventory','wt_inventory_movements',
 'wt_carts','wt_cart_items','wt_order_items','wt_order_status_history','wt_payments','wt_refunds',
 'wt_shipments','wt_coupons','wt_coupon_redemptions','wt_product_reviews','wt_wishlists',
 'wt_notifications','wt_store_settings'
 ] loop
   execute format('alter table public.%I enable row level security',t);
   execute format('drop policy if exists %I on public.%I',t||'_admin_all',t);
   execute format('create policy %I on public.%I for all to authenticated using (exists (select 1 from public.wt_admin_roles r where r.user_id=auth.uid() and r.is_active and r.role in (''owner'',''admin'',''manager''))) with check (exists (select 1 from public.wt_admin_roles r where r.user_id=auth.uid() and r.is_active and r.role in (''owner'',''admin'',''manager'')))',t||'_admin_all',t);
 end loop;
end $$;

alter table public.wt_admin_roles enable row level security;
drop policy if exists wt_admin_roles_self_read on public.wt_admin_roles;
create policy wt_admin_roles_self_read on public.wt_admin_roles for select to authenticated using(user_id=auth.uid());
alter table public.wt_admin_audit_logs enable row level security;
drop policy if exists wt_admin_audit_read on public.wt_admin_audit_logs;
create policy wt_admin_audit_read on public.wt_admin_audit_logs for select to authenticated using(exists(select 1 from public.wt_admin_roles r where r.user_id=auth.uid() and r.is_active and r.role in ('owner','admin')));

commit;
