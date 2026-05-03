/**
 * POST /api/program
 * Génère le programme de sevrage personnalisé à partir du profil Phase 1
 * et le sauvegarde en base
 *
 * GET /api/program?user_id=xxx
 * Retourne le programme actif + palier courant
 */
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { supabaseAdmin } from '@/lib/supabase'
import {
  generateCessationProgram,
  buildBehavioralProfile,
  computeDependencyScore,
} from '@/lib/cessation-algorithm'
import type { NicotineLevel } from '@/lib/database.types'

const generateSchema = z.object({
  user_id:           z.string().uuid(),
  years_smoked:      z.number().int().min(0).max(80),
  start_nicotine_mg: z.union([
    z.literal(18), z.literal(12), z.literal(6), z.literal(3), z.literal(0)
  ]).default(18),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const result = generateSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: 'Données invalides', details: result.error.flatten() },
        { status: 400 }
      )
    }

    const { user_id, years_smoked, start_nicotine_mg } = result.data

    // 1. Récupérer le profil comportemental existant
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('behavioral_profiles')
      .select('*')
      .eq('user_id', user_id)
      .single()

    if (profileError || !profile) {
      return NextResponse.json(
        { error: 'Profil comportemental introuvable — Phase 1 non complétée' },
        { status: 404 }
      )
    }

    // 2. Reconstituer l'objet BehavioralProfile pour l'algorithme
    const algoProfile = {
      userId:                  profile.user_id,
      observationStart:        new Date(profile.observation_start).getTime(),
      observationEnd:          new Date(profile.observation_end).getTime(),
      dailyAvgPuffs:           Number(profile.daily_avg_puffs),
      peakHours:               profile.peak_hours as number[],
      weakHours:               profile.weak_hours as number[],
      firstPuffAfterWakeMin:   profile.first_puff_after_wake_min ?? 60,
      morningIntensity:        Number(profile.morning_intensity ?? 0),
      smokingProfile:          profile.smoking_profile as 'light' | 'moderate' | 'heavy',
      cigarettesEquivPerDay:   Number(profile.cigarettes_equiv_per_day ?? 0),
    }

    // 3. Générer le programme
    const program = generateCessationProgram(
      algoProfile,
      Date.now(),
      years_smoked,
      start_nicotine_mg as NicotineLevel,
    )

    // 4. Désactiver l'ancien programme actif
    await supabaseAdmin
      .from('cessation_programs')
      .update({ is_active: false })
      .eq('user_id', user_id)
      .eq('is_active', true)

    // 5. Insérer le nouveau programme
    const { data: newProgram, error: progError } = await supabaseAdmin
      .from('cessation_programs')
      .insert({
        user_id,
        profile_id:           profile.id,
        total_duration_weeks: program.totalDurationWeeks,
        target_quit_date:     new Date(program.targetQuitDate).toISOString(),
        is_active:            true,
      })
      .select('id')
      .single()

    if (progError || !newProgram) {
      return NextResponse.json({ error: 'Erreur création programme' }, { status: 500 })
    }

    // 6. Insérer les paliers
    const steps = program.steps.map(s => ({
      program_id:        newProgram.id,
      step_number:       s.stepNumber,
      start_date:        new Date(s.startDate).toISOString(),
      end_date:          new Date(s.endDate).toISOString(),
      duration_weeks:    s.durationWeeks,
      daily_puff_budget: s.dailyPuffBudget,
      reduction_pct:     s.reductionPct,
      locked_hours:      s.lockedHours,
      is_final_step:     s.isFinalStep,
    }))

    await supabaseAdmin.from('program_steps').insert(steps)

    // 7. Insérer le calendrier nicotine
    const nicoSteps = program.nicotineSchedule.map(n => ({
      program_id:          newProgram.id,
      step_number:         n.stepNumber,
      start_date:          new Date(n.startDate).toISOString(),
      end_date:            new Date(n.endDate).toISOString(),
      target_mg_per_ml:    n.targetMgPerMl,
      previous_mg_per_ml:  n.previousMgPerMl,
      reduction_pct:       n.reductionPct,
    }))

    if (nicoSteps.length > 0) {
      await supabaseAdmin.from('nicotine_schedule').insert(nicoSteps)
    }

    // 8. Mettre à jour la phase utilisateur
    await supabaseAdmin
      .from('user_profiles')
      .update({ current_phase: 3 })
      .eq('id', user_id)

    return NextResponse.json({
      success:       true,
      program_id:    newProgram.id,
      total_weeks:   program.totalDurationWeeks,
      target_quit:   new Date(program.targetQuitDate).toISOString(),
      steps_count:   program.steps.length,
      first_budget:  program.steps[0]?.dailyPuffBudget,
    })

  } catch (err) {
    console.error('Program generation error:', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  const user_id = req.nextUrl.searchParams.get('user_id')

  if (!user_id) {
    return NextResponse.json({ error: 'user_id requis' }, { status: 400 })
  }

  // Programme actif + palier courant
  const { data: program } = await supabaseAdmin
    .from('cessation_programs')
    .select(`
      *,
      program_steps(*),
      nicotine_schedule(*)
    `)
    .eq('user_id', user_id)
    .eq('is_active', true)
    .single()

  if (!program) {
    return NextResponse.json({ program: null })
  }

  // Trouver le palier actif
  const now = new Date().toISOString()
  const currentStep = (program.program_steps as any[])
    ?.find((s: any) => s.start_date <= now && s.end_date > now) ?? null

  return NextResponse.json({ program, currentStep })
}
