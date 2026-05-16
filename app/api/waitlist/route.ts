import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { supabaseAdmin } from '@/lib/supabase'

// Schéma Zod — validation stricte des données entrantes
const waitlistSchema = z.object({
  email: z.string().email('Email invalide').max(254, 'Email trop long'),
  name: z.string().min(1, 'Nom requis').max(100, 'Nom trop long').trim(),
  source: z.string().max(50).optional(),
})

export async function POST(request: NextRequest) {
  try {
    // Limite la taille du body à 10 Ko pour éviter les payloads géants
    const text = await request.text()
    if (text.length > 10_000) {
      return NextResponse.json({ error: 'Payload trop volumineux' }, { status: 413 })
    }

    let body: unknown
    try {
      body = JSON.parse(text)
    } catch {
      return NextResponse.json({ error: 'JSON invalide' }, { status: 400 })
    }

    // Validation Zod
    const result = waitlistSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: 'Données invalides', details: result.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { email, name, source } = result.data

    // Vérifier si l'email est déjà inscrit (via service_role pour bypasser le RLS en lecture)
    const { data: existing } = await supabaseAdmin
      .from('waitlist')
      .select('email')
      .eq('email', email)
      .single()

    if (existing) {
      return NextResponse.json({ error: 'Cet email est déjà inscrit.' }, { status: 409 })
    }

    // Sauvegarder en Supabase
    const { error: insertError } = await supabaseAdmin
      .from('waitlist')
      .insert({ email, name, source: source ?? 'site' })

    if (insertError) {
      console.error('Supabase insert error:', insertError)
      return NextResponse.json({ error: "Erreur lors de l'inscription." }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Waitlist error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
