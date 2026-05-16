-- ============================================================
-- QUITLY — Migration RLS (à exécuter dans Supabase SQL Editor)
-- Résout l'alerte "Table publicly accessible"
-- Sûr à exécuter plusieurs fois (DROP IF EXISTS + IF NOT EXISTS)
-- ============================================================

-- ──────────────────────────────────────────────
-- 1. TABLE WAITLIST (manquait dans schema.sql)
-- ──────────────────────────────────────────────
create table if not exists waitlist (
  id         bigserial primary key,
  email      text not null unique,
  name       text not null,
  source     text not null default 'site',
  created_at timestamptz default now()
);

-- Active RLS sur waitlist
alter table waitlist enable row level security;

-- Politique : n'importe qui peut s'inscrire (INSERT public)
drop policy if exists "waitlist: inscription publique" on waitlist;
create policy "waitlist: inscription publique"
  on waitlist for insert
  with check (true);

-- Lecture réservée aux admins via service_role uniquement
-- (pas de SELECT policy → le RLS bloque tout SELECT côté anon/user)

-- ──────────────────────────────────────────────
-- 2. TOUTES LES AUTRES TABLES (activer RLS)
-- Ces commandes sont idempotentes
-- ──────────────────────────────────────────────
alter table user_profiles      enable row level security;
alter table devices             enable row level security;
alter table puff_records        enable row level security;
alter table behavioral_profiles enable row level security;
alter table cessation_programs  enable row level security;
alter table program_steps       enable row level security;
alter table nicotine_schedule   enable row level security;
alter table daily_stats         enable row level security;
alter table product_scans       enable row level security;

-- ──────────────────────────────────────────────
-- 3. POLITIQUES — recréer toutes proprement
-- (DROP IF EXISTS → pas d'erreur si elles existent déjà)
-- ──────────────────────────────────────────────

-- user_profiles
drop policy if exists "user_profiles: lecture perso"  on user_profiles;
drop policy if exists "user_profiles: insert perso"   on user_profiles;
drop policy if exists "user_profiles: update perso"   on user_profiles;
create policy "user_profiles: lecture perso"  on user_profiles for select using (auth.uid() = id);
create policy "user_profiles: insert perso"   on user_profiles for insert with check (auth.uid() = id);
create policy "user_profiles: update perso"   on user_profiles for update using (auth.uid() = id);

-- devices
drop policy if exists "devices: lecture perso"  on devices;
drop policy if exists "devices: insert perso"   on devices;
drop policy if exists "devices: update perso"   on devices;
create policy "devices: lecture perso"  on devices for select using (auth.uid() = user_id);
create policy "devices: insert perso"   on devices for insert with check (auth.uid() = user_id);
create policy "devices: update perso"   on devices for update using (auth.uid() = user_id);

-- puff_records
drop policy if exists "puff_records: lecture perso"  on puff_records;
drop policy if exists "puff_records: insert perso"   on puff_records;
create policy "puff_records: lecture perso"  on puff_records for select using (auth.uid() = user_id);
create policy "puff_records: insert perso"   on puff_records for insert with check (auth.uid() = user_id);

-- behavioral_profiles
drop policy if exists "behavioral_profiles: lecture perso" on behavioral_profiles;
drop policy if exists "behavioral_profiles: insert perso"  on behavioral_profiles;
drop policy if exists "behavioral_profiles: update perso"  on behavioral_profiles;
create policy "behavioral_profiles: lecture perso" on behavioral_profiles for select using (auth.uid() = user_id);
create policy "behavioral_profiles: insert perso"  on behavioral_profiles for insert with check (auth.uid() = user_id);
create policy "behavioral_profiles: update perso"  on behavioral_profiles for update using (auth.uid() = user_id);

-- cessation_programs
drop policy if exists "cessation_programs: lecture perso" on cessation_programs;
drop policy if exists "cessation_programs: insert perso"  on cessation_programs;
create policy "cessation_programs: lecture perso" on cessation_programs for select using (auth.uid() = user_id);
create policy "cessation_programs: insert perso"  on cessation_programs for insert with check (auth.uid() = user_id);

-- program_steps (accès via le program_id → vérifie que le programme appartient à l'user)
drop policy if exists "program_steps: lecture perso" on program_steps;
drop policy if exists "program_steps: insert perso"  on program_steps;
drop policy if exists "program_steps: update perso"  on program_steps;
create policy "program_steps: lecture perso" on program_steps for select
  using (program_id in (select id from cessation_programs where user_id = auth.uid()));
create policy "program_steps: insert perso"  on program_steps for insert
  with check (program_id in (select id from cessation_programs where user_id = auth.uid()));
create policy "program_steps: update perso"  on program_steps for update
  using (program_id in (select id from cessation_programs where user_id = auth.uid()));

-- nicotine_schedule
drop policy if exists "nicotine_schedule: lecture perso" on nicotine_schedule;
drop policy if exists "nicotine_schedule: insert perso"  on nicotine_schedule;
create policy "nicotine_schedule: lecture perso" on nicotine_schedule for select
  using (program_id in (select id from cessation_programs where user_id = auth.uid()));
create policy "nicotine_schedule: insert perso"  on nicotine_schedule for insert
  with check (program_id in (select id from cessation_programs where user_id = auth.uid()));

-- daily_stats
drop policy if exists "daily_stats: lecture perso" on daily_stats;
drop policy if exists "daily_stats: insert perso"  on daily_stats;
drop policy if exists "daily_stats: update perso"  on daily_stats;
create policy "daily_stats: lecture perso" on daily_stats for select using (auth.uid() = user_id);
create policy "daily_stats: insert perso"  on daily_stats for insert with check (auth.uid() = user_id);
create policy "daily_stats: update perso"  on daily_stats for update using (auth.uid() = user_id);

-- product_scans
drop policy if exists "product_scans: lecture perso" on product_scans;
drop policy if exists "product_scans: insert perso"  on product_scans;
create policy "product_scans: lecture perso" on product_scans for select using (auth.uid() = user_id);
create policy "product_scans: insert perso"  on product_scans for insert with check (auth.uid() = user_id);
