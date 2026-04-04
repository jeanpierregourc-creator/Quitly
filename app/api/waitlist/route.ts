import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

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

    // TODO: Sauvegarder en Supabase quand les clés sont configurées
    // const { error } = await supabaseAdmin.from('waitlist').insert({ email, name, source })

    console.log('Waitlist inscription:', { email, name, source })

    // TODO: Envoyer email de confirmation via Resend
    // await resend.emails.send({ ... })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Waitlist error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
