'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from '@/lib/auth'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const inputStyle = {
    width: '100%', padding: '12px 16px', backgroundColor: '#0D1520',
    color: '#E8EDF2', border: '1px solid #2A3A4A', borderRadius: '10px',
    fontSize: '15px', outline: 'none',
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError('')
    await new Promise(r => setTimeout(r, 500))
    const user = signIn(email, password)
    if (user) {
      router.push('/admin')
    } else {
      setError('Identifiants incorrects.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#080E14' }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-3xl font-bold mb-1" style={{ color: '#00D4AA' }}>Quitly</div>
          <div className="text-sm" style={{ color: '#8A9BAE' }}>Accès back-office administrateur</div>
        </div>
        <form onSubmit={handleSubmit} className="p-8 rounded-2xl space-y-4" style={{ backgroundColor: '#1A2430', border: '1px solid #2A3A4A' }}>
          <div>
            <label className="block text-xs font-medium mb-2" style={{ color: '#8A9BAE' }}>Email admin</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@quitly.fr" style={inputStyle} />
          </div>
          <div>
            <label className="block text-xs font-medium mb-2" style={{ color: '#8A9BAE' }}>Mot de passe</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" style={inputStyle} />
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button type="submit" disabled={loading} className="w-full py-3 rounded-xl font-bold transition-all hover:opacity-90 disabled:opacity-50" style={{ backgroundColor: '#00D4AA', color: '#080E14' }}>
            {loading ? 'Connexion...' : 'Accéder au back-office'}
          </button>
          <p className="text-center text-xs" style={{ color: '#8A9BAE' }}>
            Accès réservé aux administrateurs Quitly
          </p>
        </form>
      </div>
    </div>
  )
}
