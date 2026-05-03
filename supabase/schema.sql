-- ============================================================
-- QUITLY — Schéma base de données
-- À exécuter dans : Supabase Dashboard → SQL Editor
-- ============================================================

-- ──────────────────────────────────────────────
-- 1. PROFILS UTILISATEURS (données onboarding)
-- ──────────────────────────────────────────────
create table if not exists user_profiles (
  id                    uuid primary key references auth.users(id) on delete cascade,
  first_name            text,
  years_smoked          smallint,          -- ancienneté tabagisme
  cigarettes_per_day    smallint,          -- auto-déclaré à l'inscription
  motivation            text,              -- raison d'arrêt (libre)
  wake_time_hour        smallint default 7,
  work_start_hour       smallint default 9,
  work_end_hour         smallint default 18,
  onboarding_completed  boolean default false,
  current_phase         smallint default 1, -- 1=observation, 2=miroir, 3=programme
  created_at            timestamptz default now(),
  updated_at            timestamptz default now()
);

-- ──────────────────────────────────────────────
-- 2. APPAREILS (CE Quitly liée au compte)
-- ──────────────────────────────────────────────
create table if not exists devices (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references auth.users(id) on delete cascade,
  device_name      text not null default 'Quitly CE',
  firmware_version text,
  ble_mac          text unique,              -- adresse BLE de la CE
  paired_at        timestamptz default now(),
  last_sync_at     timestamptz,
  created_at       timestamptz default now()
);

-- ──────────────────────────────────────────────
-- 3. BOUFFÉES (cœur du système)
-- Chaque bouffée = 1 ligne, envoyées en batch depuis l'app
-- ──────────────────────────────────────────────
create table if not exists puff_records (
  id           bigserial primary key,
  device_id    uuid not null references devices(id) on delete cascade,
  user_id      uuid not null references auth.users(id) on delete cascade,
  recorded_at  timestamptz not null,   -- heure réelle de la bouffée (depuis la CE)
  duration_ms  smallint not null,      -- durée en millisecondes
  avg_flow     smallint,               -- débit ADC moyen (proxy intensité)
  synced_at    timestamptz default now()
);

-- Index pour les requêtes dashboard (par user + date)
create index if not exists idx_puff_records_user_date
  on puff_records(user_id, recorded_at desc);

-- ──────────────────────────────────────────────
-- 4. PROFIL COMPORTEMENTAL (résultat Phase 1)
-- Généré après 14 jours d'observation
-- ──────────────────────────────────────────────
create table if not exists behavioral_profiles (
  id                          uuid primary key default gen_random_uuid(),
  user_id                     uuid not null unique references auth.users(id) on delete cascade,
  observation_start           timestamptz not null,
  observation_end             timestamptz not null,
  daily_avg_puffs             numeric(6,1) not null,
  peak_hours                  integer[] not null default '{}', -- heures de forte conso
  weak_hours                  integer[] not null default '{}', -- heures de faible conso
  first_puff_after_wake_min   smallint,
  morning_intensity           numeric(5,1),
  smoking_profile             text check (smoking_profile in ('light','moderate','heavy')),
  cigarettes_equiv_per_day    numeric(5,1),
  dependency_score            smallint check (dependency_score between 0 and 10),
  years_smoked                smallint,
  start_nicotine_level        smallint check (start_nicotine_level in (18,12,6,3,0)),
  created_at                  timestamptz default now(),
  updated_at                  timestamptz default now()
);

-- ──────────────────────────────────────────────
-- 5. PROGRAMMES DE SEVRAGE
-- Un programme = ensemble de paliers générés par l'algorithme
-- ──────────────────────────────────────────────
create table if not exists cessation_programs (
  id                   uuid primary key default gen_random_uuid(),
  user_id              uuid not null references auth.users(id) on delete cascade,
  profile_id           uuid references behavioral_profiles(id),
  generated_at         timestamptz default now(),
  total_duration_weeks smallint,
  target_quit_date     timestamptz,
  is_active            boolean default true,
  created_at           timestamptz default now()
);

-- ──────────────────────────────────────────────
-- 6. PALIERS DE RÉDUCTION (Phase 3)
-- ──────────────────────────────────────────────
create table if not exists program_steps (
  id               uuid primary key default gen_random_uuid(),
  program_id       uuid not null references cessation_programs(id) on delete cascade,
  step_number      smallint not null,
  start_date       timestamptz not null,
  end_date         timestamptz not null,
  duration_weeks   smallint not null,
  daily_puff_budget smallint not null,
  reduction_pct    smallint not null,
  locked_hours     integer[] not null default '{}',
  is_final_step    boolean default false,
  -- Suivi de progression
  daily_overruns   smallint default 0,   -- jours où budget dépassé
  total_days       smallint default 0,
  completed        boolean default false,
  extended         boolean default false  -- palier prolongé si trop de dépassements
);

-- ──────────────────────────────────────────────
-- 7. CALENDRIER NICOTINE
-- ──────────────────────────────────────────────
create table if not exists nicotine_schedule (
  id                  uuid primary key default gen_random_uuid(),
  program_id          uuid not null references cessation_programs(id) on delete cascade,
  step_number         smallint not null,
  start_date          timestamptz not null,
  end_date            timestamptz not null,
  target_mg_per_ml    smallint not null check (target_mg_per_ml in (18,12,6,3,0)),
  previous_mg_per_ml  smallint,
  reduction_pct       smallint
);

-- ──────────────────────────────────────────────
-- 8. STATS JOURNALIÈRES (agrégé pour le dashboard)
-- 1 ligne par jour par utilisateur — calculé automatiquement
-- ──────────────────────────────────────────────
create table if not exists daily_stats (
  id              bigserial primary key,
  user_id         uuid not null references auth.users(id) on delete cascade,
  date            date not null,
  total_puffs     smallint default 0,
  budget          smallint,              -- budget ce jour-là
  overrun         boolean default false, -- budget dépassé ?
  emergency_used  boolean default false,
  created_at      timestamptz default now(),
  unique(user_id, date)
);

create index if not exists idx_daily_stats_user_date
  on daily_stats(user_id, date desc);

-- ──────────────────────────────────────────────
-- 9. PRODUITS ACHETÉS (liquides + résistances via QR code)
-- ──────────────────────────────────────────────
create table if not exists product_scans (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references auth.users(id) on delete cascade,
  product_type    text not null check (product_type in ('liquid','coil')),
  product_name    text not null,         -- ex: "Menthe Glaciale 6mg"
  nicotine_mg     smallint,              -- mg/mL (liquides uniquement)
  scanned_at      timestamptz default now(),
  qr_code         text not null          -- identifiant unique du produit scanné
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- Chaque utilisateur ne voit que ses propres données
-- ============================================================

alter table user_profiles      enable row level security;
alter table devices             enable row level security;
alter table puff_records        enable row level security;
alter table behavioral_profiles enable row level security;
alter table cessation_programs  enable row level security;
alter table program_steps       enable row level security;
alter table nicotine_schedule   enable row level security;
alter table daily_stats         enable row level security;
alter table product_scans       enable row level security;

-- user_profiles
create policy "user_profiles: lecture perso"  on user_profiles for select using (auth.uid() = id);
create policy "user_profiles: insert perso"   on user_profiles for insert with check (auth.uid() = id);
create policy "user_profiles: update perso"   on user_profiles for update using (auth.uid() = id);

-- devices
create policy "devices: lecture perso"  on devices for select using (auth.uid() = user_id);
create policy "devices: insert perso"   on devices for insert with check (auth.uid() = user_id);
create policy "devices: update perso"   on devices for update using (auth.uid() = user_id);

-- puff_records
create policy "puff_records: lecture perso"  on puff_records for select using (auth.uid() = user_id);
create policy "puff_records: insert perso"   on puff_records for insert with check (auth.uid() = user_id);

-- behavioral_profiles
create policy "behavioral_profiles: lecture perso" on behavioral_profiles for select using (auth.uid() = user_id);
create policy "behavioral_profiles: insert perso"  on behavioral_profiles for insert with check (auth.uid() = user_id);
create policy "behavioral_profiles: update perso"  on behavioral_profiles for update using (auth.uid() = user_id);

-- cessation_programs
create policy "cessation_programs: lecture perso" on cessation_programs for select using (auth.uid() = user_id);
create policy "cessation_programs: insert perso"  on cessation_programs for insert with check (auth.uid() = user_id);

-- program_steps
create policy "program_steps: lecture perso" on program_steps for select
  using (program_id in (select id from cessation_programs where user_id = auth.uid()));
create policy "program_steps: insert perso"  on program_steps for insert
  with check (program_id in (select id from cessation_programs where user_id = auth.uid()));
create policy "program_steps: update perso"  on program_steps for update
  using (program_id in (select id from cessation_programs where user_id = auth.uid()));

-- nicotine_schedule
create policy "nicotine_schedule: lecture perso" on nicotine_schedule for select
  using (program_id in (select id from cessation_programs where user_id = auth.uid()));
create policy "nicotine_schedule: insert perso"  on nicotine_schedule for insert
  with check (program_id in (select id from cessation_programs where user_id = auth.uid()));

-- daily_stats
create policy "daily_stats: lecture perso" on daily_stats for select using (auth.uid() = user_id);
create policy "daily_stats: insert perso"  on daily_stats for insert with check (auth.uid() = user_id);
create policy "daily_stats: update perso"  on daily_stats for update using (auth.uid() = user_id);

-- product_scans
create policy "product_scans: lecture perso" on product_scans for select using (auth.uid() = user_id);
create policy "product_scans: insert perso"  on product_scans for insert with check (auth.uid() = user_id);

-- ============================================================
-- FONCTION : agréger les stats d'une journée
-- Appelée après chaque batch sync depuis l'app
-- ============================================================
create or replace function upsert_daily_stats(
  p_user_id  uuid,
  p_date     date,
  p_budget   smallint default null
)
returns void
language plpgsql
security definer
as $$
declare
  v_total_puffs smallint;
begin
  select count(*)::smallint
  into   v_total_puffs
  from   puff_records
  where  user_id    = p_user_id
    and  recorded_at::date = p_date;

  insert into daily_stats (user_id, date, total_puffs, budget, overrun)
  values (
    p_user_id,
    p_date,
    v_total_puffs,
    p_budget,
    p_budget is not null and v_total_puffs > p_budget
  )
  on conflict (user_id, date) do update set
    total_puffs = excluded.total_puffs,
    budget      = coalesce(excluded.budget, daily_stats.budget),
    overrun     = coalesce(excluded.budget, daily_stats.budget) is not null
                  and excluded.total_puffs > coalesce(excluded.budget, daily_stats.budget);
end;
$$;
