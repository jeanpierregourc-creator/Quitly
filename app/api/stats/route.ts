/**
 * GET /api/stats?user_id=xxx&days=30
 * Retourne les stats pour le dashboard de l'app
 */
import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const user_id = req.nextUrl.searchParams.get('user_id')
  const days    = parseInt(req.nextUrl.searchParams.get('days') ?? '30')

  if (!user_id) {
    return NextResponse.json({ error: 'user_id requis' }, { status: 400 })
  }

  const since = new Date()
  since.setDate(since.getDate() - days)

  // Stats journalières
  const { data: dailyStats } = await supabaseAdmin
    .from('daily_stats')
    .select('*')
    .eq('user_id', user_id)
    .gte('date', since.toISOString().split('T')[0])
    .order('date', { ascending: true })

  // Programme actif
  const { data: program } = await supabaseAdmin
    .from('cessation_programs')
    .select('*, program_steps(*)')
    .eq('user_id', user_id)
    .eq('is_active', true)
    .single()

  // Profil comportemental (baseline Phase 1)
  const { data: profile } = await supabaseAdmin
    .from('behavioral_profiles')
    .select('daily_avg_puffs, smoking_profile, dependency_score')
    .eq('user_id', user_id)
    .single()

  // Calculs agrégés
  const stats = dailyStats ?? []
  const totalPuffs    = stats.reduce((s, d) => s + d.total_puffs, 0)
  const daysWithData  = stats.filter(d => d.total_puffs > 0).length
  const avgPuffsPerDay = daysWithData > 0 ? Math.round(totalPuffs / daysWithData) : 0
  const daysOnBudget  = stats.filter(d => !d.overrun && d.budget != null).length
  const successRate   = stats.filter(d => d.budget != null).length > 0
    ? Math.round(daysOnBudget / stats.filter(d => d.budget != null).length * 100)
    : null

  // Réduction vs baseline
  const baselineAvg = profile ? Number(profile.daily_avg_puffs) : null
  const reductionPct = baselineAvg && avgPuffsPerDay
    ? Math.round((1 - avgPuffsPerDay / baselineAvg) * 100)
    : null

  return NextResponse.json({
    daily:        dailyStats ?? [],
    summary: {
      avg_puffs_per_day: avgPuffsPerDay,
      total_puffs:       totalPuffs,
      success_rate_pct:  successRate,
      reduction_pct:     reductionPct,
      baseline_avg:      baselineAvg,
    },
    program:  program ?? null,
    profile:  profile ?? null,
  })
}
