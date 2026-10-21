-- Fix RLS infinite recursion for wt_admin_roles.
-- Run this in Supabase SQL Editor. The SECURITY DEFINER helper reads the role
-- table as its owner so RLS policies do not recursively query themselves.
begin;
create or replace function public.wt_is_admin(allowed_roles text[] default array['owner','admin','manager'])
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.wt_admin_roles r
    where r.user_id = auth.uid()
      and r.is_active = true
      and r.role = any(allowed_roles)
  );
$$;
revoke all on function public.wt_is_admin(text[]) from public;
grant execute on function public.wt_is_admin(text[]) to authenticated;

-- Remove the self-referencing policy created by the earlier schema migration.
drop policy if exists wt_admin_roles_admin_all on public.wt_admin_roles;
drop policy if exists wt_admin_roles_self_read on public.wt_admin_roles;
create policy wt_admin_roles_self_or_admin_read
on public.wt_admin_roles for select to authenticated
using (user_id = auth.uid() or public.wt_is_admin(array['owner','admin']));

create policy wt_admin_roles_admin_manage
on public.wt_admin_roles for all to authenticated
using (public.wt_is_admin(array['owner','admin']))
with check (public.wt_is_admin(array['owner','admin']));

-- Replace policies on other tables so they use the safe helper too.
do $$
declare t text;
begin
 for t in select unnest(array[
  'wt_admin_audit_logs','wt_customers','wt_customer_addresses','wt_categories',
  'wt_products','wt_product_images','wt_inventory','wt_inventory_movements',
  'wt_orders','wt_order_items','wt_carts','wt_cart_items','wt_payment_methods',
  'wt_analytics_events','wt_settings','wt_coupons','wt_reviews','wt_shipments',
  'wt_payment_transactions','wt_wishlists','wt_wishlist_items'
 ]) loop
   if to_regclass('public.'||t) is not null then
     execute format('drop policy if exists %I on public.%I',t||'_admin_all',t);
     execute format(
       'create policy %I on public.%I for all to authenticated using (public.wt_is_admin(array[''owner'',''admin'',''manager''])) with check (public.wt_is_admin(array[''owner'',''admin'',''manager'']))',
       t||'_admin_all',t
     );
   end if;
 end loop;
end $$;
commit;
