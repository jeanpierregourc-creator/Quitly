import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Schéma Zod — validation stricte du formulaire distributeur
const contactSchema = z.object({
  boutique: z.string().min(1, 'Nom de la boutique requis').max(200, 'Nom trop long').trim(),
  name: z.string().min(1, 'Nom requis').max(100, 'Nom trop long').trim(),
  email: z.string().email('Email invalide').max(254, 'Email trop long'),
  phone: z.string().max(20, 'Téléphone trop long').optional(),
  city: z.string().max(100, 'Ville trop longue').optional(),
})

export async function POST(request: NextRequest) {
  try {
    // Limite la taille du body à 10 Ko
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
    const result = contactSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: 'Données invalides', details: result.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { boutique, name, email, phone, city } = result.data

    // TODO: Sauvegarder en Supabase
    // const { error } = await supabaseAdmin.from('distributor_leads').insert({ ... })

    console.log('Distributeur lead:', { boutique, name, email, phone, city })

    // TODO: Envoyer email notification
    // await resend.emails.send({ ... })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
