import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(request: NextRequest) {
  // Vérification admin basique via header
  const authHeader = request.headers.get('x-admin-email')
  if (authHeader !== 'admin@quitly.fr') {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const supabase = createClient(
    'https://kcxmjdsyuxjdjbgogdmg.supabase.co',
    'sb_publishable_pMdy4eDOB0zTD2-yPXL60g_Vv-itFkI'
  )

  const { data, error } = await supabase
    .from('waitlist')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Supabase fetch error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }

  return NextResponse.json({ data })
}
