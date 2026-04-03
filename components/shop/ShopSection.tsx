'use client'
import { useState } from 'react'

const IS_PRE_ORDER = process.env.NEXT_PUBLIC_PRE_ORDER_MODE === 'true'

export default function ShopSection() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handlePreOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !name) { setError('Veuillez remplir tous les champs.'); return }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, source: 'commander' }),
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        setError('Une erreur est survenue. Veuillez réessayer.')
      }
    } catch {
      setError('Connexion impossible. Vérifiez votre connexion.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    backgroundColor: '#0D1520',
    color: '#E8EDF2',
    border: '1px solid #2A3A4A',
    borderRadius: '10px',
    fontSize: '15px',
    outline: 'none',
  }

  if (IS_PRE_ORDER) {
    if (submitted) {
      return (
        <div className="p-8 rounded-2xl text-center" style={{ backgroundColor: '#1A2430', border: '2px solid rgba(0,212,170,0.4)' }}>
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(0,212,170,0.15)' }}>
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#00D4AA' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2" style={{ color: '#E8EDF2' }}>Vous êtes sur la liste !</h3>
          <p className="text-sm" style={{ color: '#8A9BAE' }}>
            Vous serez parmi les premiers notifiés au lancement.<br />
            Un email de confirmation vous a été envoyé à <strong style={{ color: '#00D4AA' }}>{email}</strong>.
          </p>
        </div>
      )
    }

    return (
      <div className="p-6 rounded-2xl" style={{ backgroundColor: '#1A2430', border: '1px solid #2A3A4A' }}>
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#F59E0B' }} />
          <span className="text-sm font-medium" style={{ color: '#F59E0B' }}>Pré-lancement — Réservez votre place</span>
        </div>

        <h3 className="text-2xl font-bold mb-2" style={{ color: '#E8EDF2' }}>Rejoindre la liste d&apos;attente</h3>
        <p className="text-sm mb-6" style={{ color: '#8A9BAE' }}>
          Quitly n&apos;est pas encore en vente. Inscrivez-vous pour être notifié en priorité au lancement et bénéficier d&apos;une offre early bird.
        </p>

        <form onSubmit={handlePreOrder} className="space-y-4">
          <div>
            <label className="block text-xs font-medium mb-2" style={{ color: '#8A9BAE' }}>Prénom</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Votre prénom"
              style={inputStyle}
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-2" style={{ color: '#8A9BAE' }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="votre@email.fr"
              style={inputStyle}
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl font-bold text-base transition-all hover:opacity-90 active:scale-95 disabled:opacity-50"
            style={{ backgroundColor: '#00D4AA', color: '#080E14' }}
          >
            {loading ? 'Inscription...' : 'Rejoindre la liste — Gratuit'}
          </button>
        </form>

        <p className="text-xs text-center mt-4" style={{ color: '#8A9BAE' }}>
          Prix de lancement : 130 € · App incluse à vie · Pas de spam
        </p>
      </div>
    )
  }

  // Mode vente live — Stripe Elements (simplifié pour le prototype)
  return (
    <div className="p-6 rounded-2xl" style={{ backgroundColor: '#1A2430', border: '1px solid #2A3A4A' }}>
      <h3 className="text-2xl font-bold mb-6" style={{ color: '#E8EDF2' }}>Finaliser la commande</h3>
      <div className="p-4 rounded-xl mb-6" style={{ backgroundColor: '#0D1520', border: '1px solid #2A3A4A' }}>
        <div className="flex justify-between items-center">
          <span className="font-medium" style={{ color: '#E8EDF2' }}>Kit Quitly Black Edition</span>
          <span className="font-bold" style={{ color: '#00D4AA' }}>130 €</span>
        </div>
        <div className="flex justify-between items-center mt-1">
          <span className="text-sm" style={{ color: '#8A9BAE' }}>Livraison Colissimo</span>
          <span className="text-sm" style={{ color: '#00D4AA' }}>Offerte</span>
        </div>
      </div>
      <div className="space-y-3 mb-6">
        {['Numéro de carte', 'MM/AA', 'CVV'].map((p, i) => (
          <div key={i} className="h-12 rounded-lg flex items-center px-4" style={{ backgroundColor: '#0D1520', border: '1px solid #2A3A4A', color: '#8A9BAE', fontSize: 14 }}>
            {p}
          </div>
        ))}
      </div>
      <button
        className="w-full py-4 rounded-xl font-bold text-base transition-all hover:opacity-90"
        style={{ backgroundColor: '#00D4AA', color: '#080E14' }}
      >
        Payer 130 € — Stripe sécurisé 🔒
      </button>
      <p className="text-xs text-center mt-3" style={{ color: '#8A9BAE' }}>Paiement 100% sécurisé · 3D Secure · PCI-DSS</p>
    </div>
  )
}
