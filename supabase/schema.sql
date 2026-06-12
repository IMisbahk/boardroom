-- Boardroom data schema (run in Supabase SQL editor)

create extension if not exists pgcrypto;

create table if not exists public.board_meetings (
  id text primary key,
  title text not null,
  topic text not null,
  status text not null check (status in ('live', 'scheduled', 'closed')),
  consensus integer not null default 70,
  confidence integer not null default 70,
  recommendation text not null,
  risks jsonb not null default '[]'::jsonb,
  opportunities jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.board_turns (
  id uuid primary key default gen_random_uuid(),
  meeting_id text not null references public.board_meetings(id) on delete cascade,
  speaker text not null,
  role text not null,
  content text not null,
  tone text not null check (tone in ('support', 'caution', 'oppose')),
  event_time text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.startup_context (
  startup text primary key,
  stage text not null,
  runway_months integer not null,
  active_priorities jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

insert into public.startup_context (startup, stage, runway_months, active_priorities)
values (
  'Nimbus',
  'Series A',
  18,
  '["Retention over pure acquisition","Compliance-ready EU expansion","Engineering debt reduction"]'::jsonb
)
on conflict (startup) do update
set stage = excluded.stage,
    runway_months = excluded.runway_months,
    active_priorities = excluded.active_priorities,
    updated_at = now();

alter table public.board_meetings enable row level security;
alter table public.board_turns enable row level security;
alter table public.startup_context enable row level security;

-- Demo policy (anon read/write for hackathon). Tighten before production.
drop policy if exists "anon full board_meetings" on public.board_meetings;
create policy "anon full board_meetings" on public.board_meetings
for all
to anon
using (true)
with check (true);

drop policy if exists "anon full board_turns" on public.board_turns;
create policy "anon full board_turns" on public.board_turns
for all
to anon
using (true)
with check (true);

drop policy if exists "anon read startup_context" on public.startup_context;
create policy "anon read startup_context" on public.startup_context
for select
to anon
using (true);
