/**
 * Types TypeScript générés depuis le schéma Supabase
 * Utilisés dans toute l'app et l'app React Native
 */

export type SmokingProfile = 'light' | 'moderate' | 'heavy'
export type ProductType    = 'liquid' | 'coil'
export type NicotineLevel  = 18 | 12 | 6 | 3 | 0

// ─────────────────────────────────────────────────────────────
// TABLES
// ─────────────────────────────────────────────────────────────

export interface UserProfile {
  id:                   string
  first_name:           string | null
  years_smoked:         number | null
  cigarettes_per_day:   number | null
  motivation:           string | null
  wake_time_hour:       number
  work_start_hour:      number
  work_end_hour:        number
  onboarding_completed: boolean
  current_phase:        1 | 2 | 3
  created_at:           string
  updated_at:           string
}

export interface Device {
  id:               string
  user_id:          string
  device_name:      string
  firmware_version: string | null
  ble_mac:          string | null
  paired_at:        string
  last_sync_at:     string | null
  created_at:       string
}

export interface PuffRecord {
  id:          number
  device_id:   string
  user_id:     string
  recorded_at: string   // ISO timestamptz
  duration_ms: number
  avg_flow:    number | null
  synced_at:   string
}

export interface BehavioralProfile {
  id:                        string
  user_id:                   string
  observation_start:         string
  observation_end:           string
  daily_avg_puffs:           number
  peak_hours:                number[]
  weak_hours:                number[]
  first_puff_after_wake_min: number | null
  morning_intensity:         number | null
  smoking_profile:           SmokingProfile | null
  cigarettes_equiv_per_day:  number | null
  dependency_score:          number | null
  years_smoked:              number | null
  start_nicotine_level:      NicotineLevel | null
  created_at:                string
  updated_at:                string
}

export interface CessationProgram {
  id:                   string
  user_id:              string
  profile_id:           string | null
  generated_at:         string
  total_duration_weeks: number | null
  target_quit_date:     string | null
  is_active:            boolean
  created_at:           string
}

export interface ProgramStep {
  id:                string
  program_id:        string
  step_number:       number
  start_date:        string
  end_date:          string
  duration_weeks:    number
  daily_puff_budget: number
  reduction_pct:     number
  locked_hours:      number[]
  is_final_step:     boolean
  daily_overruns:    number
  total_days:        number
  completed:         boolean
  extended:          boolean
}

export interface NicotineScheduleStep {
  id:                 string
  program_id:         string
  step_number:        number
  start_date:         string
  end_date:           string
  target_mg_per_ml:   NicotineLevel
  previous_mg_per_ml: NicotineLevel | null
  reduction_pct:      number | null
}

export interface DailyStat {
  id:             number
  user_id:        string
  date:           string   // YYYY-MM-DD
  total_puffs:    number
  budget:         number | null
  overrun:        boolean
  emergency_used: boolean
  created_at:     string
}

export interface ProductScan {
  id:           string
  user_id:      string
  product_type: ProductType
  product_name: string
  nicotine_mg:  number | null
  scanned_at:   string
  qr_code:      string
}

// ─────────────────────────────────────────────────────────────
// TYPES POUR L'API (insert / update)
// ─────────────────────────────────────────────────────────────

export type PuffRecordInsert = Omit<PuffRecord, 'id' | 'synced_at'>

export type PuffBatchPayload = {
  device_id: string
  puffs: Array<{
    recorded_at: string
    duration_ms: number
    avg_flow:    number | null
  }>
}

export type ProgramPayload = {
  profile:         BehavioralProfile
  steps:           Omit<ProgramStep, 'id' | 'program_id'>[]
  nicotineSteps:   Omit<NicotineScheduleStep, 'id' | 'program_id'>[]
  totalDurationWeeks: number
  targetQuitDate:  string
}

// ─────────────────────────────────────────────────────────────
// TYPE SUPABASE DATABASE (pour le client typé)
// ─────────────────────────────────────────────────────────────

export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row:    UserProfile
        Insert: Partial<UserProfile> & { id: string }
        Update: Partial<UserProfile>
      }
      devices: {
        Row:    Device
        Insert: Omit<Device, 'id' | 'paired_at' | 'created_at'>
        Update: Partial<Omit<Device, 'id' | 'user_id'>>
      }
      puff_records: {
        Row:    PuffRecord
        Insert: PuffRecordInsert
        Update: never
      }
      behavioral_profiles: {
        Row:    BehavioralProfile
        Insert: Omit<BehavioralProfile, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<BehavioralProfile, 'id' | 'user_id'>>
      }
      cessation_programs: {
        Row:    CessationProgram
        Insert: Omit<CessationProgram, 'id' | 'generated_at' | 'created_at'>
        Update: Partial<Omit<CessationProgram, 'id' | 'user_id'>>
      }
      program_steps: {
        Row:    ProgramStep
        Insert: Omit<ProgramStep, 'id'>
        Update: Partial<Omit<ProgramStep, 'id' | 'program_id'>>
      }
      nicotine_schedule: {
        Row:    NicotineScheduleStep
        Insert: Omit<NicotineScheduleStep, 'id'>
        Update: never
      }
      daily_stats: {
        Row:    DailyStat
        Insert: Omit<DailyStat, 'id' | 'created_at'>
        Update: Partial<Omit<DailyStat, 'id' | 'user_id' | 'date'>>
      }
      product_scans: {
        Row:    ProductScan
        Insert: Omit<ProductScan, 'id' | 'scanned_at'>
        Update: never
      }
    }
    Functions: {
      upsert_daily_stats: {
        Args: { p_user_id: string; p_date: string; p_budget?: number }
        Returns: void
      }
    }
  }
}
