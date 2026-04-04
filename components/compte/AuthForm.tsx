'use client'
import { useState } from 'react'
import { signIn, signUp, QuitlyUser } from '@/lib/auth'

interface Props {
  onSuccess: (user: QuitlyUser) => void
}

export default function AuthForm({ onSuccess }: Props) {
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    await new Promise(r => setTimeout(r, 600)) // UX : petit délai réaliste

    let user: QuitlyUser | null = null

    if (mode === 'login') {
      user = signIn(email, password)
      if (!user) setError('Email ou mot de passe incorrect. (6 caractères minimum)')
    } else {
      if (!name.trim()) { setError('Veuillez entrer votre prénom.'); setLoading(false); return }
      user = signUp(name, email, password)
      if (!user) setError('Veuillez remplir tous les champs. (mot de passe : 6 caractères min.)')
    }

    setLoading(false)
    if (user) onSuccess(user)
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="p-8 rounded-2xl" style={{ backgroundColor: '#1A2430', border: '1px solid #2A3A4A' }}>
        {/* Toggle login / signup */}
        <div className="flex rounded-xl p-1 mb-8" style={{ backgroundColor: '#0D1520' }}>
          {(['login', 'signup'] as const).map(m => (
            <button
              key={m}
              onClick={() => { setMode(m); setError('') }}
              className="flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all"
              style={{
                backgroundColor: mode === m ? '#00D4AA' : 'transparent',
                color: mode === m ? '#080E14' : '#8A9BAE',
              }}
            >
              {m === 'login' ? 'Se connecter' : 'Créer un compte'}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-medium mb-2" style={{ color: '#8A9BAE' }}>Prénom</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Votre prénom" style={inputStyle} />
            </div>
          )}
          <div>
            <label className="block text-xs font-medium mb-2" style={{ color: '#8A9BAE' }}>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="votre@email.fr" style={inputStyle} />
          </div>
          <div>
            <label className="block text-xs font-medium mb-2" style={{ color: '#8A9BAE' }}>Mot de passe</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" style={inputStyle} />
            {mode === 'signup' && <p className="text-xs mt-1" style={{ color: '#8A9BAE' }}>6 caractères minimum</p>}
          </div>

          {error && (
            <div className="p-3 rounded-lg text-sm" style={{ backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#FCA5A5' }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl font-bold text-base transition-all hover:opacity-90 disabled:opacity-50 mt-2"
            style={{ backgroundColor: '#00D4AA', color: '#080E14' }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                {mode === 'login' ? 'Connexion...' : 'Création...'}
              </span>
            ) : (
              mode === 'login' ? 'Se connecter' : 'Créer mon compte'
            )}
          </button>
        </form>

        {mode === 'login' && (
          <p className="text-center text-xs mt-4" style={{ color: '#8A9BAE' }}>
            Mot de passe oublié ?{' '}
            <a href="mailto:contact@quitly.fr" className="underline" style={{ color: '#00D4AA' }}>Contactez le support</a>
          </p>
        )}
      </div>
    </div>
  )
}
