-- Run this once in Supabase: SQL Editor > New Query > paste this > Run

create table if not exists businesses (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  tone text,
  target_audience text,
  status text not null default 'active',
  created_at timestamptz not null default now()
);

-- Row Level Security: on by default per your project settings.
-- This policy allows the dashboard (using the publishable/anon key) to
-- read and write businesses. We'll tighten this once real login/auth
-- for Shaelee is added in a later milestone.
alter table businesses enable row level security;

create policy "Allow all access for now"
  on businesses
  for all
  using (true)
  with check (true);

grant select, insert, update, delete on businesses to anon, authenticated;

-- Approval Queue: holds AI-generated posts and review replies waiting
-- for Shaelee (or a client) to approve, edit, or deny before anything
-- actually publishes to Google.
create table if not exists content_items (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  type text not null, -- 'post' or 'review_reply'
  content text not null,
  status text not null default 'pending', -- 'pending' | 'approved' | 'denied'
  created_at timestamptz not null default now()
);

alter table content_items enable row level security;

create policy "Allow all access for now"
  on content_items
  for all
  using (true)
  with check (true);

grant select, insert, update, delete on content_items to anon, authenticated;
