-- WONDERTECH admin analytics setup (run in Supabase SQL Editor once)
create table if not exists public.wt_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
create table if not exists public.wt_analytics_events (
  id bigint generated always as identity primary key,
  session_id text not null,
  event_type text not null check (event_type in ('page_view','cart_update','order_submitted')),
  page_path text,
  item_count integer not null default 0,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index if not exists wt_analytics_events_created_at_idx on public.wt_analytics_events(created_at desc);
create index if not exists wt_analytics_events_session_idx on public.wt_analytics_events(session_id, created_at desc);
create table if not exists public.wt_orders (
  id bigint generated always as identity primary key,
  session_id text not null,
  customer_name text not null,
  customer_phone text not null,
  customer_address text not null,
  items jsonb not null default '[]'::jsonb,
  total numeric(12,2) not null default 0,
  notes text not null default '',
  status text not null default 'pending' check (status in ('pending','completed','cancelled')),
  created_at timestamptz not null default now(),
  completed_at timestamptz
);
create index if not exists wt_orders_created_at_idx on public.wt_orders(created_at desc);
alter table public.wt_admins enable row level security;
alter table public.wt_analytics_events enable row level security;
alter table public.wt_orders enable row level security;
drop policy if exists "admin can read own admin row" on public.wt_admins;
create policy "admin can read own admin row" on public.wt_admins for select to authenticated using (user_id = auth.uid());
drop policy if exists "public can record analytics" on public.wt_analytics_events;
create policy "public can record analytics" on public.wt_analytics_events for insert to anon, authenticated with check (
  event_type in ('page_view','cart_update','order_submitted')
  and length(session_id) between 8 and 100
  and item_count between 0 and 1000
);
drop policy if exists "admins can read analytics" on public.wt_analytics_events;
create policy "admins can read analytics" on public.wt_analytics_events for select to authenticated using (
  exists (select 1 from public.wt_admins a where a.user_id = auth.uid())
);
drop policy if exists "public can create orders" on public.wt_orders;
create policy "public can create orders" on public.wt_orders for insert to anon, authenticated with check (
  status = 'pending' and length(customer_name) between 1 and 160
  and length(customer_phone) between 3 and 40
  and length(customer_address) between 1 and 500
);
drop policy if exists "admins can read orders" on public.wt_orders;
create policy "admins can read orders" on public.wt_orders for select to authenticated using (
  exists (select 1 from public.wt_admins a where a.user_id = auth.uid())
);
drop policy if exists "admins can update orders" on public.wt_orders;
create policy "admins can update orders" on public.wt_orders for update to authenticated using (
  exists (select 1 from public.wt_admins a where a.user_id = auth.uid())
) with check (
  exists (select 1 from public.wt_admins a where a.user_id = auth.uid())
);
