import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name, source } = body

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Email invalide' }, { status: 400 })
    }

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
