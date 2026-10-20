-- WonderTech admin dashboard foundation. Run after schema.sql.
-- SECURITY: never grant admin by client-side metadata. Add a trusted user's auth UUID to admin_users manually.
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.admin_users enable row level security;
revoke all on public.admin_users from anon, authenticated;
grant select on public.admin_users to authenticated;
drop policy if exists "Admins can read own admin grant" on public.admin_users;
create policy "Admins can read own admin grant" on public.admin_users
  for select to authenticated using (user_id = (select auth.uid()));

create or replace function public.is_wondertech_admin()
returns boolean language sql stable security definer set search_path = ''
as $$
  select exists(select 1 from public.admin_users a where a.user_id = (select auth.uid()));
$$;
revoke all on function public.is_wondertech_admin() from public;
grant execute on function public.is_wondertech_admin() to authenticated;

-- Admin-only product management; public storefront can only read active products.
drop policy if exists "Admins manage products" on public.products;
create policy "Admins manage products" on public.products
  for all to authenticated using (public.is_wondertech_admin()) with check (public.is_wondertech_admin());

-- Admin-only order and order-item visibility for reporting and fulfilment.
drop policy if exists "Admins read all orders" on public.orders;
create policy "Admins read all orders" on public.orders
  for select to authenticated using (public.is_wondertech_admin());
drop policy if exists "Admins update orders" on public.orders;
create policy "Admins update orders" on public.orders
  for update to authenticated using (public.is_wondertech_admin()) with check (public.is_wondertech_admin());
drop policy if exists "Admins read all order items" on public.order_items;
create policy "Admins read all order items" on public.order_items
  for select to authenticated using (public.is_wondertech_admin());

-- After the first admin account signs up, replace the UUID below and run manually:
-- insert into public.admin_users(user_id) values ('PASTE-AUTH-USER-UUID-HERE');
