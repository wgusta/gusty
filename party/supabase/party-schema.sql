create extension if not exists pgcrypto;

create table if not exists public.party_items (
  id text primary key default gen_random_uuid()::text,
  category text not null,
  title text not null,
  note text,
  unit_label text not null,
  target_quantity integer not null check (target_quantity > 0),
  sort_order integer not null default 500,
  is_custom boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.party_submissions (
  id uuid primary key default gen_random_uuid(),
  display_name text not null,
  note text,
  created_at timestamptz not null default now()
);

create table if not exists public.party_submission_items (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.party_submissions(id) on delete cascade,
  item_id text not null references public.party_items(id) on delete cascade,
  quantity integer not null check (quantity > 0)
);

create table if not exists public.party_settings (
  id text primary key,
  event_closed boolean not null default false,
  updated_at timestamptz not null default now()
);

insert into public.party_settings (id, event_closed)
values ('main', false)
on conflict (id) do nothing;

alter table public.party_items enable row level security;
alter table public.party_submissions enable row level security;
alter table public.party_submission_items enable row level security;
alter table public.party_settings enable row level security;

drop policy if exists "party public read items" on public.party_items;
create policy "party public read items"
on public.party_items
for select
to anon, authenticated
using (true);

drop policy if exists "party public insert custom items" on public.party_items;
create policy "party public insert custom items"
on public.party_items
for insert
to anon, authenticated
with check (
  is_custom = true
  and category = 'Süsch no öppis'
  and char_length(title) >= 2
);

drop policy if exists "party public read submissions" on public.party_submissions;
create policy "party public read submissions"
on public.party_submissions
for select
to anon, authenticated
using (true);

drop policy if exists "party public insert submissions" on public.party_submissions;
create policy "party public insert submissions"
on public.party_submissions
for insert
to anon, authenticated
with check (char_length(display_name) >= 2);

drop policy if exists "party public read submission items" on public.party_submission_items;
create policy "party public read submission items"
on public.party_submission_items
for select
to anon, authenticated
using (true);

drop policy if exists "party public insert submission items" on public.party_submission_items;
create policy "party public insert submission items"
on public.party_submission_items
for insert
to anon, authenticated
with check (quantity > 0);

drop policy if exists "party public read settings" on public.party_settings;
create policy "party public read settings"
on public.party_settings
for select
to anon, authenticated
using (true);

