/**
 * POST /api/sync
 * Reçoit un batch de bouffées depuis l'app React Native
 * et met à jour les stats journalières
 */
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { supabaseAdmin } from '@/lib/supabase'

const puffSchema = z.object({
  recorded_at: z.string().datetime(),
  duration_ms: z.number().int().min(50).max(10000),
  avg_flow:    z.number().int().min(0).max(1023).nullable(),
})

const syncSchema = z.object({
  user_id:   z.string().uuid(),
  device_id: z.string().uuid(),
  puffs:     z.array(puffSchema).min(1).max(1000),
  budget:    z.number().int().positive().nullable().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const result = syncSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: 'Données invalides', details: result.error.flatten() },
        { status: 400 }
      )
    }

    const { user_id, device_id, puffs, budget } = result.data

    // Insérer toutes les bouffées d'un coup
    const records = puffs.map(p => ({
      user_id,
      device_id,
      recorded_at: p.recorded_at,
      duration_ms: p.duration_ms,
      avg_flow:    p.avg_flow,
    }))

    const { error: insertError } = await supabaseAdmin
      .from('puff_records')
      .insert(records)

    if (insertError) {
      console.error('Sync insert error:', insertError)
      return NextResponse.json({ error: 'Erreur insertion' }, { status: 500 })
    }

    // Mettre à jour last_sync_at sur l'appareil
    await supabaseAdmin
      .from('devices')
      .update({ last_sync_at: new Date().toISOString() })
      .eq('id', device_id)

    // Recalculer les stats journalières pour chaque date concernée
    const dates = [...new Set(puffs.map(p => p.recorded_at.split('T')[0]))]
    for (const date of dates) {
      await supabaseAdmin.rpc('upsert_daily_stats', {
        p_user_id: user_id,
        p_date:    date,
        p_budget:  budget ?? undefined,
      })
    }

    return NextResponse.json({ success: true, synced: puffs.length })

  } catch (err) {
    console.error('Sync error:', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
