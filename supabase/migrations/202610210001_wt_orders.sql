-- WonderTech orders and payment attempts.
-- Run in Supabase SQL Editor. Never store card numbers or CVV.
create extension if not exists pgcrypto;

create table if not exists public.wt_orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  user_id uuid not null references auth.users(id) on delete restrict,
  customer_name text not null,
  customer_email text not null,
  customer_phone text not null,
  customer_city text not null,
  customer_address text not null,
  customer_notes text,
  currency text not null default 'EGP' check (currency = 'EGP'),
  subtotal_piasters bigint not null check (subtotal_piasters >= 0),
  payment_method text not null check (payment_method in ('paymob','cod','whatsapp')),
  payment_status text not null default 'pending' check (payment_status in ('pending','paid','failed','cancelled','cod_pending')),
  order_status text not null default 'pending_confirmation' check (order_status in ('pending_payment','pending_confirmation','confirmed','processing','shipped','completed','cancelled')),
  paymob_order_id text,
  paymob_transaction_id text unique,
  payment_reference text unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.wt_order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.wt_orders(id) on delete cascade,
  product_id text not null,
  product_name text not null,
  quantity integer not null check (quantity between 1 and 99),
  unit_price_piasters bigint not null check (unit_price_piasters >= 0),
  line_total_piasters bigint not null check (line_total_piasters >= 0)
);

alter table public.wt_orders enable row level security;
alter table public.wt_order_items enable row level security;

drop policy if exists "Customers can read own orders" on public.wt_orders;
create policy "Customers can read own orders" on public.wt_orders
  for select to authenticated using (auth.uid() = user_id);

drop policy if exists "Customers can read own order items" on public.wt_order_items;
create policy "Customers can read own order items" on public.wt_order_items
  for select to authenticated using (
    exists (select 1 from public.wt_orders o where o.id = order_id and o.user_id = auth.uid())
  );

-- No browser insert/update/delete policies: order creation and payment state
-- changes must be performed by server-side Edge Functions using secrets.
