import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderId, motif, description, email } = body

    if (!orderId || !motif) {
      return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 })
    }

    // Log pour la démo
    console.log('Demande de retour:', { orderId, motif, description, email })

    // TODO: En production :
    // 1. Récupérer stripe_payment_intent_id depuis Supabase (orders table)
    // 2. await stripe.refunds.create({ payment_intent: paymentIntentId })
    // 3. Mettre à jour le statut dans Supabase (returns table)
    // 4. Envoyer email de confirmation via Resend

    return NextResponse.json({ success: true, message: 'Demande de retour enregistrée' })
  } catch (error) {
    console.error('Refund error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
