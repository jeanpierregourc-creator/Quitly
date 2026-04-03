'use client'
import { useState } from 'react'

export default function DistributeurForm() {
  const [form, setForm] = useState({ boutique: '', name: '', email: '', phone: '', city: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.boutique || !form.name || !form.email) { setError('Veuillez remplir les champs obligatoires.'); return }
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (res.ok) setSubmitted(true)
      else setError('Erreur. Réessayez ou écrivez à contact@quitly.fr')
    } catch { setError('Connexion impossible.') }
    finally { setLoading(false) }
  }

  const inputStyle = { width: '100%', padding: '12px 16px', backgroundColor: '#0D1520', color: '#E8EDF2', border: '1px solid #2A3A4A', borderRadius: '10px', fontSize: '15px', outline: 'none' }

  if (submitted) {
    return (
      <div className="p-8 rounded-2xl text-center" style={{ backgroundColor: '#1A2430', border: '2px solid rgba(0,212,170,0.4)' }}>
        <div className="text-5xl mb-4">✅</div>
        <h3 className="text-xl font-bold mb-2" style={{ color: '#E8EDF2' }}>Demande reçue !</h3>
        <p style={{ color: '#8A9BAE' }}>Notre équipe vous contacte sous 48h ouvrées avec une proposition commerciale personnalisée.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="p-8 rounded-2xl space-y-4" style={{ backgroundColor: '#1A2430', border: '1px solid #2A3A4A' }}>
      {[
        { name: 'boutique', label: 'Nom de la boutique *', placeholder: 'Vape Paradise Lyon' },
        { name: 'name', label: 'Votre nom *', placeholder: 'Jean Dupont' },
        { name: 'email', label: 'Email professionnel *', placeholder: 'contact@votre-boutique.fr' },
        { name: 'phone', label: 'Téléphone', placeholder: '06 12 34 56 78' },
        { name: 'city', label: 'Ville', placeholder: 'Lyon' },
      ].map(field => (
        <div key={field.name}>
          <label className="block text-xs font-medium mb-2" style={{ color: '#8A9BAE' }}>{field.label}</label>
          <input
            type={field.name === 'email' ? 'email' : 'text'}
            name={field.name}
            value={form[field.name as keyof typeof form]}
            onChange={handleChange}
            placeholder={field.placeholder}
            style={inputStyle}
          />
        </div>
      ))}
      {error && <p className="text-red-400 text-sm">{error}</p>}
      <button type="submit" disabled={loading} className="w-full py-4 rounded-xl font-bold transition-all hover:opacity-90 disabled:opacity-50" style={{ backgroundColor: '#00D4AA', color: '#080E14' }}>
        {loading ? 'Envoi...' : 'Envoyer ma demande'}
      </button>
    </form>
  )
}
