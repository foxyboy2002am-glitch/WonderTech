-- WonderTech store foundation for Supabase (PostgreSQL).
-- Run in Supabase SQL Editor after creating the project.
-- RLS is enabled on every customer-facing table. No service_role key belongs in the browser.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name_ar text not null,
  name_en text not null,
  description_ar text not null default '',
  description_en text not null default '',
  sku text unique,
  price numeric(12,2) not null default 0 check (price >= 0),
  currency text not null default 'EGP',
  stock_quantity integer not null default 0 check (stock_quantity >= 0),
  image_url text,
  is_active boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table if not exists public.cart_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  quantity integer not null default 1 check (quantity between 1 and 99),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, product_id)
);
create table if not exists public.wishlist_items (
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, product_id)
);
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete restrict,
  status text not null default 'pending' check (status in ('pending','confirmed','processing','shipped','completed','cancelled')),
  currency text not null default 'EGP',
  subtotal numeric(12,2) not null default 0 check (subtotal >= 0),
  shipping_fee numeric(12,2) not null default 0 check (shipping_fee >= 0),
  total numeric(12,2) not null default 0 check (total >= 0),
  shipping_name text not null default '',
  shipping_phone text not null default '',
  shipping_address jsonb not null default '{}'::jsonb,
  customer_note text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  product_name text not null,
  sku text,
  unit_price numeric(12,2) not null check (unit_price >= 0),
  quantity integer not null check (quantity between 1 and 99),
  line_total numeric(12,2) not null check (line_total >= 0),
  created_at timestamptz not null default now()
);
create index if not exists products_active_created_idx on public.products (is_active, created_at desc);
create index if not exists cart_items_user_idx on public.cart_items (user_id);
create index if not exists wishlist_items_user_idx on public.wishlist_items (user_id);
create index if not exists orders_user_created_idx on public.orders (user_id, created_at desc);
create index if not exists order_items_order_idx on public.order_items (order_id);

alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.cart_items enable row level security;
alter table public.wishlist_items enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

drop policy if exists "Profiles: read own" on public.profiles;
create policy "Profiles: read own" on public.profiles for select to authenticated using (id = (select auth.uid()));
drop policy if exists "Profiles: update own" on public.profiles;
create policy "Profiles: update own" on public.profiles for update to authenticated using (id = (select auth.uid())) with check (id = (select auth.uid()));
drop policy if exists "Products: public reads active products" on public.products;
create policy "Products: public reads active products" on public.products for select to anon, authenticated using (is_active = true);
drop policy if exists "Cart: manage own items" on public.cart_items;
create policy "Cart: manage own items" on public.cart_items for all to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
drop policy if exists "Wishlist: manage own items" on public.wishlist_items;
create policy "Wishlist: manage own items" on public.wishlist_items for all to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
drop policy if exists "Orders: read own" on public.orders;
create policy "Orders: read own" on public.orders for select to authenticated using (user_id = (select auth.uid()));
drop policy if exists "Order items: read own order items" on public.order_items;
create policy "Order items: read own order items" on public.order_items for select to authenticated using (
  exists (select 1 from public.orders o where o.id = order_id and o.user_id = (select auth.uid()))
);

-- The browser cannot create orders or order items directly. Add a trusted Edge Function
-- that validates stock and prices and creates both rows transactionally before checkout.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', ''))
  on conflict (id) do nothing;
  return new;
end;
$$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
for each row execute procedure public.handle_new_user();

-- Checkout/payment intentionally remains disabled until a trusted server-side flow,
-- payment provider secrets, verified webhooks, and admin authorization are implemented.
