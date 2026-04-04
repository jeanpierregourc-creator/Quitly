'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getUser, signOut, QuitlyUser } from '@/lib/auth'
import AuthForm from '@/components/compte/AuthForm'
import { mockOrders } from '@/lib/mockOrders'

export default function ComptePage() {
  const [user, setUser] = useState<QuitlyUser | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setUser(getUser())
  }, [])

  const handleSignOut = () => {
    signOut()
    setUser(null)
  }

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: '#00D4AA', borderTopColor: 'transparent' }} />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3" style={{ color: '#E8EDF2' }}>Mon espace client</h1>
          <p style={{ color: '#8A9BAE' }}>Connectez-vous pour accéder à vos commandes et gérer votre compte.</p>
        </div>
        <AuthForm onSuccess={setUser} />
      </div>
    )
  }

  const lastOrder = mockOrders[0]

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header compte */}
        <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: '#E8EDF2' }}>
              Bonjour, <span style={{ color: '#00D4AA' }}>{user.name}</span> 👋
            </h1>
            <p className="text-sm mt-1" style={{ color: '#8A9BAE' }}>{user.email}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all hover:opacity-80"
            style={{ backgroundColor: '#1A2430', color: '#8A9BAE', border: '1px solid #2A3A4A' }}
          >
            Se déconnecter
          </button>
        </div>

        {/* Carte programme */}
        <div className="p-6 rounded-2xl mb-6" style={{ backgroundColor: '#1A2430', border: '1px solid rgba(0,212,170,0.3)' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(0,212,170,0.15)' }}>
              🎯
            </div>
            <div>
              <div className="font-semibold" style={{ color: '#E8EDF2' }}>Programme Quitly</div>
              <div className="text-xs" style={{ color: '#8A9BAE' }}>Phase 3 — Libérer · Semaine 8/26</div>
            </div>
            <div className="ml-auto text-right">
              <div className="text-xl font-bold" style={{ color: '#00D4AA' }}>-62%</div>
              <div className="text-xs" style={{ color: '#8A9BAE' }}>consommation</div>
            </div>
          </div>
          {/* Barre de progression */}
          <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#2A3A4A' }}>
            <div className="h-full rounded-full transition-all" style={{ width: '31%', backgroundColor: '#00D4AA' }} />
          </div>
          <div className="flex justify-between mt-2 text-xs" style={{ color: '#8A9BAE' }}>
            <span>Semaine 8</span>
            <span>Objectif : semaine 26</span>
          </div>
        </div>

        {/* Navigation raccourcis */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { href: '/compte/commandes', icon: '📦', label: 'Mes commandes', sub: `${mockOrders.length} commandes` },
            { href: '/compte/retour', icon: '🔄', label: 'Faire un retour', sub: 'Remboursement 30j' },
            { href: '/faq', icon: '💬', label: 'Support & FAQ', sub: 'Réponse sous 48h' },
          ].map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="p-5 rounded-2xl flex items-center gap-4 transition-all hover:opacity-80"
              style={{ backgroundColor: '#1A2430', border: '1px solid #2A3A4A' }}
            >
              <span className="text-2xl">{item.icon}</span>
              <div>
                <div className="font-semibold text-sm" style={{ color: '#E8EDF2' }}>{item.label}</div>
                <div className="text-xs" style={{ color: '#8A9BAE' }}>{item.sub}</div>
              </div>
              <svg className="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#8A9BAE' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>

        {/* Dernière commande */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold" style={{ color: '#E8EDF2' }}>Dernière commande</h2>
            <Link href="/compte/commandes" className="text-sm font-medium" style={{ color: '#00D4AA' }}>
              Voir tout →
            </Link>
          </div>
          <div className="p-6 rounded-2xl" style={{ backgroundColor: '#1A2430', border: '1px solid #2A3A4A' }}>
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div>
                <span className="font-mono text-sm font-bold" style={{ color: '#E8EDF2' }}>{lastOrder.id}</span>
                <span className="text-sm ml-3" style={{ color: '#8A9BAE' }}>· {lastOrder.date}</span>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: 'rgba(0,212,170,0.15)', color: lastOrder.statusColor }}>
                ✓ {lastOrder.status}
              </span>
            </div>
            {lastOrder.items.map((item, i) => (
              <div key={i} className="flex justify-between text-sm py-2 border-t" style={{ borderColor: '#2A3A4A' }}>
                <span style={{ color: '#8A9BAE' }}>{item.name} × {item.qty}</span>
                <span style={{ color: '#E8EDF2' }}>{item.price * item.qty} €</span>
              </div>
            ))}
            <div className="flex justify-between font-bold pt-3 border-t mt-2" style={{ borderColor: '#2A3A4A' }}>
              <span style={{ color: '#E8EDF2' }}>Total</span>
              <span style={{ color: '#00D4AA' }}>{lastOrder.total} €</span>
            </div>
            {lastOrder.tracking && (
              <div className="mt-4 p-3 rounded-lg text-xs" style={{ backgroundColor: '#0D1520' }}>
                <span style={{ color: '#8A9BAE' }}>Suivi Colissimo : </span>
                <span className="font-mono" style={{ color: '#00D4AA' }}>{lastOrder.tracking}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
