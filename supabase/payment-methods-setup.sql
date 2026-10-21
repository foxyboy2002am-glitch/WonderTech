-- WONDERTECH payment configuration, safe to run after pro-store-schema.sql
begin;
create table if not exists public.wt_payment_methods (
 id uuid primary key default gen_random_uuid(),
 method_code text not null unique check(method_code in ('cash_on_delivery','bank_transfer','wallet','card_gateway')),
 display_name text not null,
 is_enabled boolean not null default false,
 instructions text not null default '',
 bank_name text,
 account_name text,
 account_number text,
 iban text,
 wallet_provider text,
 wallet_number text,
 gateway_provider text,
 gateway_public_key text,
 -- Secret keys must be stored server-side (Edge Function / vault), never here.
 sort_order integer not null default 0,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);
alter table public.wt_payment_methods enable row level security;
drop policy if exists wt_payment_methods_admin_all on public.wt_payment_methods;
create policy wt_payment_methods_admin_all on public.wt_payment_methods for all to authenticated
using (exists(select 1 from public.wt_admin_roles r where r.user_id=auth.uid() and r.is_active and r.role in ('owner','admin','manager')))
with check (exists(select 1 from public.wt_admin_roles r where r.user_id=auth.uid() and r.is_active and r.role in ('owner','admin','manager')));
drop policy if exists wt_payment_methods_public_read_enabled on public.wt_payment_methods;
create policy wt_payment_methods_public_read_enabled on public.wt_payment_methods for select to anon, authenticated using (is_enabled = true);
insert into public.wt_payment_methods(method_code,display_name,is_enabled,sort_order)
values ('cash_on_delivery','الدفع عند الاستلام',true,1),
('bank_transfer','تحويل بنكي',false,2),
('wallet','محفظة إلكترونية',false,3),
('card_gateway','فيزا / ماستركارد',false,4)
on conflict(method_code) do nothing;
commit;
