-- ============================================================
-- FEATHERED FRIENDS — TEAM PORTAL SCHEMA
-- Run this once in Supabase → SQL editor after creating a
-- project. Then set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
-- (Netlify → Site settings → Environment variables) and redeploy.
-- ============================================================

-- Approved volunteers (the allowlist that gates the portal).
-- Add a row per volunteer; they then sign in with a magic link.
create table if not exists volunteers (
  email text primary key,
  name text,
  role text default 'volunteer',
  added_at timestamptz default now()
);

create table if not exists birds (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  "group" text not null default 'Other',
  species text,
  age text,
  sex text,
  noise int default 3,
  exp text default 'Some experience',
  bonded boolean default false,
  special text,
  photo text,
  bio text,
  status text default 'available', -- available | adopted | hidden
  updated_at timestamptz default now()
);

create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  starts_at timestamptz,
  location text,
  blurb text,
  published boolean default true,
  updated_at timestamptz default now()
);

create table if not exists notices (
  id text primary key, -- 'main'
  message text,
  active boolean default true,
  updated_at timestamptz default now()
);

create table if not exists rates (
  id uuid primary key default gen_random_uuid(),
  price int not null,
  per text default '/day',
  who text,
  updated_at timestamptz default now()
);

create table if not exists stories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  species text,
  blurb text,
  adopted_on date default current_date,
  updated_at timestamptz default now()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- Public: read-only. Writes: only signed-in approved volunteers.
-- ============================================================
alter table volunteers enable row level security;
alter table birds enable row level security;
alter table events enable row level security;
alter table notices enable row level security;
alter table rates enable row level security;
alter table stories enable row level security;

create or replace function is_volunteer() returns boolean
language sql stable security definer as $$
  select exists (
    select 1 from volunteers where email = auth.jwt() ->> 'email'
  );
$$;

-- volunteers can see the allowlist (to know they're approved);
-- only service role edits it (add volunteers from the Supabase dashboard)
create policy "volunteers readable by volunteers" on volunteers
  for select using (is_volunteer());

-- public content: anyone reads, volunteers write
do $$
declare t text;
begin
  foreach t in array array['birds','events','notices','rates','stories'] loop
    execute format('create policy "public read" on %I for select using (true)', t);
    execute format('create policy "volunteer insert" on %I for insert with check (is_volunteer())', t);
    execute format('create policy "volunteer update" on %I for update using (is_volunteer())', t);
    execute format('create policy "volunteer delete" on %I for delete using (is_volunteer())', t);
  end loop;
end $$;

-- Seed the notice bar
insert into notices (id, message, active)
values ('main', 'Open by appointment only — email us to schedule a visit', true)
on conflict (id) do nothing;

-- Seed boarding rates
insert into rates (price, per, who) values
  (15, '/day', 'Budgies, parakeets, cockatiels, parrotlets, conures, Senegals…'),
  (20, '/day', 'Amazons, greys, eclectus, Alexandrines…'),
  (30, '/day', 'Macaws, cockatoos…');
