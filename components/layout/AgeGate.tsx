'use client'
import { useState, useEffect } from 'react'

export default function AgeGate() {
  const [verified, setVerified] = useState(true) // true par défaut pour éviter flash
  const [blocked, setBlocked] = useState(false)
  const [day, setDay] = useState('')
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const isVerified = localStorage.getItem('quitly_age_verified')
    if (!isVerified) {
      setVerified(false)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!day || !month || !year) {
      setError('Veuillez renseigner votre date de naissance complète.')
      return
    }
    const birthDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const m = today.getMonth() - birthDate.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--

    if (age < 18) {
      setBlocked(true)
    } else {
      localStorage.setItem('quitly_age_verified', 'true')
      setVerified(true)
    }
  }

  if (verified) return null

  if (blocked) {
    return (
      <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center" style={{ backgroundColor: '#080E14' }}>
        <div className="text-center px-8 max-w-md">
          <div className="text-6xl mb-6">🚫</div>
          <h1 className="text-2xl font-bold text-red-400 mb-4">Accès refusé</h1>
          <p className="text-lg mb-2" style={{ color: '#8A9BAE' }}>
            Ce site est réservé aux personnes majeures (18 ans et plus).
          </p>
          <p className="text-sm" style={{ color: '#8A9BAE' }}>
            La cigarette électronique est interdite aux mineurs.
          </p>
        </div>
      </div>
    )
  }

  const days = Array.from({ length: 31 }, (_, i) => i + 1)
  const months = [
    { value: 1, label: 'Janvier' }, { value: 2, label: 'Février' }, { value: 3, label: 'Mars' },
    { value: 4, label: 'Avril' }, { value: 5, label: 'Mai' }, { value: 6, label: 'Juin' },
    { value: 7, label: 'Juillet' }, { value: 8, label: 'Août' }, { value: 9, label: 'Septembre' },
    { value: 10, label: 'Octobre' }, { value: 11, label: 'Novembre' }, { value: 12, label: 'Décembre' }
  ]
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i)

  const selectStyle = {
    backgroundColor: '#1A2430',
    color: '#E8EDF2',
    border: '1px solid #2A3A4A',
    borderRadius: '8px',
    padding: '12px 16px',
    fontSize: '16px',
    width: '100%',
    outline: 'none',
    cursor: 'pointer',
  }

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center" style={{ backgroundColor: '#080E14' }}>
      <div className="w-full max-w-md px-8 py-10 rounded-2xl mx-4" style={{ backgroundColor: '#1A2430', border: '1px solid #2A3A4A' }}>
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight" style={{ color: '#00D4AA' }}>Quitly</h1>
          <div className="mt-1 text-xs font-medium uppercase tracking-widest" style={{ color: '#8A9BAE' }}>Programme sevrage tabac</div>
        </div>

        {/* Titre */}
        <h2 className="text-xl font-semibold text-center mb-2" style={{ color: '#E8EDF2' }}>
          Vérification d&apos;âge
        </h2>
        <p className="text-center text-sm mb-8" style={{ color: '#8A9BAE' }}>
          Ce site est réservé aux adultes de 18 ans et plus.<br />
          Veuillez confirmer votre date de naissance.
        </p>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs mb-2 font-medium" style={{ color: '#8A9BAE' }}>Jour</label>
              <select value={day} onChange={e => setDay(e.target.value)} style={selectStyle}>
                <option value="">JJ</option>
                {days.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs mb-2 font-medium" style={{ color: '#8A9BAE' }}>Mois</label>
              <select value={month} onChange={e => setMonth(e.target.value)} style={selectStyle}>
                <option value="">MM</option>
                {months.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs mb-2 font-medium" style={{ color: '#8A9BAE' }}>Année</label>
              <select value={year} onChange={e => setYear(e.target.value)} style={selectStyle}>
                <option value="">AAAA</option>
                {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-semibold text-base transition-all hover:opacity-90 active:scale-95 mt-2"
            style={{ backgroundColor: '#00D4AA', color: '#080E14' }}
          >
            Confirmer mon âge
          </button>
        </form>

        <p className="text-center text-xs mt-6" style={{ color: '#8A9BAE' }}>
          La cigarette électronique contient de la nicotine, substance addictive.
          Réservé aux fumeurs adultes souhaitant réduire leur consommation.
        </p>
      </div>
    </div>
  )
}
