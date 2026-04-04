'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getUser } from '@/lib/auth'
import { mockOrders } from '@/lib/mockOrders'

const MOTIFS = [
  'Produit défectueux',
  'Ne correspond pas à mes attentes',
  'Programme trop difficile',
  "Problème technique avec l'app",
  'Mauvaise livraison',
  'Autre',
]

export default function RetourPage() {
  const [mounted, setMounted] = useState(false)
  const [user, setUser] = useState<ReturnType<typeof getUser>>(null)
  const [orderId, setOrderId] = useState(mockOrders[0]?.id || '')
  const [motif, setMotif] = useState('')
  const [description, setDescription] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setMounted(true)
    setUser(getUser())
  }, [])

  const selectStyle = {
    width: '100%', padding: '12px 16px', backgroundColor: '#0D1520',
    color: '#E8EDF2', border: '1px solid #2A3A4A', borderRadius: '10px',
    fontSize: '15px', outline: 'none', cursor: 'pointer',
  }
  const textareaStyle = {
    ...selectStyle, minHeight: '120px', resize: 'vertical' as const,
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!orderId || !motif) { setError('Veuillez sélectionner une commande et un motif.'); return }
    setLoading(true); setError('')
    await new Promise(r => setTimeout(r, 800))
    try {
      await fetch('/api/refund', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, motif, description, email: user?.email }),
      })
      setSubmitted(true)
    } catch {
      setError('Erreur. Veuillez réessayer ou contacter contact@quitly.fr')
    } finally { setLoading(false) }
  }

  if (!mounted) return null

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 gap-4">
        <p style={{ color: '#8A9BAE' }}>Connectez-vous pour faire une demande de retour.</p>
        <Link href="/compte" className="px-6 py-3 rounded-xl font-semibold" style={{ backgroundColor: '#00D4AA', color: '#080E14' }}>
          Se connecter
        </Link>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 px-4">
        <div className="max-w-md w-full text-center p-10 rounded-2xl" style={{ backgroundColor: '#1A2430', border: '2px solid rgba(0,212,170,0.4)' }}>
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: 'rgba(0,212,170,0.15)' }}>
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#00D4AA' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-3" style={{ color: '#E8EDF2' }}>Demande enregistrée !</h2>
          <p className="mb-2" style={{ color: '#8A9BAE' }}>
            Votre demande de retour pour la commande <strong style={{ color: '#00D4AA' }}>{orderId}</strong> a bien été reçue.
          </p>
          <p className="text-sm mb-6" style={{ color: '#8A9BAE' }}>
            Notre équipe vous contacte sous 48h pour valider le retour. Le remboursement sera effectué sous 5 à 7 jours ouvrés sur votre moyen de paiement initial.
          </p>
          <Link href="/compte" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold" style={{ backgroundColor: '#00D4AA', color: '#080E14' }}>
            ← Retour à mon compte
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-4 mb-10">
          <Link href="/compte/commandes" className="text-sm" style={{ color: '#8A9BAE' }}>← Mes commandes</Link>
          <h1 className="text-3xl font-bold" style={{ color: '#E8EDF2' }}>Demande de retour</h1>
        </div>

        {/* Info garantie */}
        <div className="p-4 rounded-xl mb-8 flex items-start gap-3" style={{ backgroundColor: 'rgba(0,212,170,0.08)', border: '1px solid rgba(0,212,170,0.2)' }}>
          <span className="text-xl">🛡️</span>
          <div>
            <p className="text-sm font-semibold mb-1" style={{ color: '#00D4AA' }}>Garantie satisfait ou remboursé 30 jours</p>
            <p className="text-xs" style={{ color: '#8A9BAE' }}>
              Remboursement intégral garanti sous 5 à 7 jours ouvrés. Retour Colissimo prépayé fourni par email.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-8 rounded-2xl" style={{ backgroundColor: '#1A2430', border: '1px solid #2A3A4A' }}>
          {/* Commande */}
          <div>
            <label className="block text-xs font-medium mb-2" style={{ color: '#8A9BAE' }}>Commande à retourner *</label>
            <select value={orderId} onChange={e => setOrderId(e.target.value)} style={selectStyle}>
              {mockOrders.map(o => (
                <option key={o.id} value={o.id}>{o.id} — {o.date} — {o.total} €</option>
              ))}
            </select>
          </div>

          {/* Motif */}
          <div>
            <label className="block text-xs font-medium mb-2" style={{ color: '#8A9BAE' }}>Motif du retour *</label>
            <select value={motif} onChange={e => setMotif(e.target.value)} style={selectStyle}>
              <option value="">Sélectionner un motif</option>
              {MOTIFS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-medium mb-2" style={{ color: '#8A9BAE' }}>Description (optionnel)</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Décrivez le problème rencontré..."
              style={textareaStyle}
            />
          </div>

          {error && (
            <div className="p-3 rounded-lg text-sm" style={{ backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#FCA5A5' }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl font-bold text-base transition-all hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: '#00D4AA', color: '#080E14' }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                Envoi en cours...
              </span>
            ) : 'Soumettre ma demande de retour'}
          </button>
        </form>
      </div>
    </div>
  )
}
