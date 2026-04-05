'use client'
import { useEffect, useState } from 'react'

type WaitlistEntry = {
  id: string
  name: string
  email: string
  source: string
  created_at: string
}

export default function AdminWaitlistPage() {
  const [entries, setEntries] = useState<WaitlistEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/admin/waitlist', {
      headers: { 'x-admin-email': 'admin@quitly.fr' },
    })
      .then(r => r.json())
      .then(json => {
        if (json.data) setEntries(json.data)
        else setError('Impossible de charger les données.')
      })
      .catch(() => setError('Erreur réseau.'))
      .finally(() => setLoading(false))
  }, [])

  const handleExportCSV = () => {
    const header = 'Prénom,Email,Source,Date'
    const rows = entries.map(w => `${w.name},${w.email},${w.source},${new Date(w.created_at).toLocaleDateString('fr-FR')}`)
    const csv = [header, ...rows].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = 'waitlist-quitly.csv'; a.click()
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#E8EDF2' }}>Waitlist pré-lancement</h1>
          <p className="text-sm mt-1" style={{ color: '#8A9BAE' }}>
            {loading ? 'Chargement...' : `${entries.length} inscrits au total`}
          </p>
        </div>
        <button
          onClick={handleExportCSV}
          disabled={loading || entries.length === 0}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all hover:opacity-80 disabled:opacity-40"
          style={{ backgroundColor: '#1A2430', color: '#00D4AA', border: '1px solid rgba(0,212,170,0.3)' }}
        >
          Exporter CSV
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-xl mb-6 text-sm" style={{ backgroundColor: 'rgba(239,68,68,0.1)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.3)' }}>
          {error}
        </div>
      )}

      {/* Résumé */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        <div className="p-5 rounded-xl text-center" style={{ backgroundColor: '#1A2430', border: '1px solid #2A3A4A' }}>
          <div className="text-2xl font-black mb-1" style={{ color: '#00D4AA' }}>{entries.length}</div>
          <div className="text-xs" style={{ color: '#8A9BAE' }}>Inscrits total</div>
        </div>
        <div className="p-5 rounded-xl text-center" style={{ backgroundColor: '#1A2430', border: '1px solid #2A3A4A' }}>
          <div className="text-2xl font-black mb-1" style={{ color: '#A78BFA' }}>{entries.filter(w => w.source === 'commander').length}</div>
          <div className="text-xs" style={{ color: '#8A9BAE' }}>Depuis /commander</div>
        </div>
        <div className="p-5 rounded-xl text-center" style={{ backgroundColor: '#1A2430', border: '1px solid #2A3A4A' }}>
          <div className="text-2xl font-black mb-1" style={{ color: '#F59E0B' }}>{entries.filter(w => w.source === 'site').length}</div>
          <div className="text-xs" style={{ color: '#8A9BAE' }}>Depuis le site</div>
        </div>
      </div>

      {/* Tableau */}
      <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #2A3A4A' }}>
        <div className="grid grid-cols-4 px-5 py-3 text-xs font-semibold uppercase tracking-widest" style={{ backgroundColor: '#0D1520', color: '#8A9BAE' }}>
          <div>Prénom</div><div>Email</div><div>Source</div><div>Date</div>
        </div>
        <div className="divide-y" style={{ borderColor: '#2A3A4A' }}>
          {loading && (
            <div className="px-5 py-8 text-center text-sm" style={{ color: '#8A9BAE' }}>Chargement...</div>
          )}
          {!loading && entries.length === 0 && !error && (
            <div className="px-5 py-8 text-center text-sm" style={{ color: '#8A9BAE' }}>Aucune inscription pour le moment.</div>
          )}
          {entries.map(w => (
            <div key={w.id} className="grid grid-cols-4 px-5 py-3.5 items-center hover:bg-white/[0.02]">
              <span className="text-sm font-medium" style={{ color: '#E8EDF2' }}>{w.name}</span>
              <span className="text-sm" style={{ color: '#8A9BAE' }}>{w.email}</span>
              <span className="text-xs px-2 py-1 rounded w-fit" style={{ backgroundColor: '#0D1520', color: '#8A9BAE' }}>{w.source}</span>
              <span className="text-xs" style={{ color: '#8A9BAE' }}>{new Date(w.created_at).toLocaleDateString('fr-FR')}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
