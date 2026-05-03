import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

const supabaseUrl     = process.env.NEXT_PUBLIC_SUPABASE_URL      ?? ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
const supabaseService = process.env.SUPABASE_SERVICE_ROLE_KEY      ?? ''

// Client public (app, côté client) — respecte le RLS
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Client admin (routes API serveur uniquement) — bypass RLS
export const supabaseAdmin = createClient<Database>(supabaseUrl, supabaseService, {
  auth: { autoRefreshToken: false, persistSession: false },
})
