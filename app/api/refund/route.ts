import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Schéma Zod — validation du formulaire de retour
const refundSchema = z.object({
  orderId: z
    .string()
    .min(1, 'Numéro de commande requis')
    .max(50, 'Numéro de commande invalide')
    .regex(/^[A-Z0-9\-]+$/, 'Format de commande invalide'),
  motif: z.enum(['defaut', 'non_conforme', 'erreur_commande', 'autre'] as const),
  description: z.string().max(1000, 'Description trop longue (max 1000 caractères)').optional(),
  email: z.string().email('Email invalide').max(254).optional(),
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
    const result = refundSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: 'Données invalides', details: result.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { orderId, motif, description, email } = result.data

    // Log pour la démo
    console.log('Demande de retour:', { orderId, motif, description, email })

    // TODO: En production :
    // 1. Vérifier que l'email correspond au propriétaire de la commande (Supabase)
    // 2. Récupérer stripe_payment_intent_id depuis Supabase (orders table)
    // 3. await stripe.refunds.create({ payment_intent: paymentIntentId })
    // 4. Mettre à jour le statut dans Supabase (returns table)
    // 5. Envoyer email de confirmation via Resend

    return NextResponse.json({ success: true, message: 'Demande de retour enregistrée' })
  } catch (error) {
    console.error('Refund error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
