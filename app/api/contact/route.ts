import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { boutique, name, email, phone, city } = body

    if (!email || !name || !boutique) {
      return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 })
    }

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
