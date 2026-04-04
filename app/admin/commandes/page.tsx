'use client'
import { useState } from 'react'
import { adminOrders } from '@/lib/mockAdminData'

const STATUS_COLORS: Record<string, string> = {
  'livré': '#00D4AA',
  'en transit': '#F59E0B',
  'en préparation': '#8A9BAE',
  'remboursé': '#EF4444',
}

export default function AdminCommandesPage() {
  const [filter, setFilter] = useState<string>('tous')
  const [search, setSearch] = useState('')

  const filtered = adminOrders.filter(o => {
    const matchStatus = filter === 'tous' || o.status === filter
    const matchSearch = o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.email.toLowerCase().includes(search.toLowerCase())
    return matchStatus && matchSearch
  })

  const handleExportCSV = () => {
    const header = 'ID,Date,Client,Email,Articles,Total,Statut'
    const rows = filtered.map(o => `${o.id},${o.date},${o.customer},${o.email},"${o.items}",${o.total} €,${o.status}`)
    const csv = [header, ...rows].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = 'commandes-quitly.csv'; a.click()
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#E8EDF2' }}>Commandes</h1>
          <p className="text-sm mt-1" style={{ color: '#8A9BAE' }}>{adminOrders.length} commandes au total</p>
        </div>
        <button onClick={handleExportCSV} className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all hover:opacity-80" style={{ backgroundColor: '#1A2430', color: '#00D4AA', border: '1px solid rgba(0,212,170,0.3)' }}>
          📥 Exporter CSV
        </button>
      </div>

      {/* Filtres */}
      <div className="flex flex-wrap gap-3 mb-6">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Rechercher par ID, client, email..."
          className="px-4 py-2 rounded-lg text-sm flex-1 min-w-48"
          style={{ backgroundColor: '#1A2430', color: '#E8EDF2', border: '1px solid #2A3A4A', outline: 'none' }}
        />
        <div className="flex gap-2">
          {['tous', 'livré', 'en transit', 'en préparation', 'remboursé'].map(s => (
            <button key={s} onClick={() => setFilter(s)} className="px-3 py-2 rounded-lg text-xs font-medium capitalize transition-all" style={{ backgroundColor: filter === s ? 'rgba(0,212,170,0.15)' : '#1A2430', color: filter === s ? '#00D4AA' : '#8A9BAE', border: `1px solid ${filter === s ? 'rgba(0,212,170,0.3)' : '#2A3A4A'}` }}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Tableau */}
      <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #2A3A4A' }}>
        <div className="grid grid-cols-6 px-5 py-3 text-xs font-semibold uppercase tracking-widest" style={{ backgroundColor: '#0D1520', color: '#8A9BAE', gridTemplateColumns: '1.5fr 1fr 1.5fr 2fr 0.8fr 1fr' }}>
          <div>ID</div><div>Date</div><div>Client</div><div>Articles</div><div>Total</div><div>Statut</div>
        </div>
        <div className="divide-y" style={{ borderColor: '#2A3A4A' }}>
          {filtered.length === 0 ? (
            <div className="px-5 py-10 text-center text-sm" style={{ color: '#8A9BAE' }}>Aucune commande trouvée</div>
          ) : filtered.map(order => (
            <div key={order.id} className="grid px-5 py-4 items-center hover:bg-white/[0.02] transition-colors" style={{ gridTemplateColumns: '1.5fr 1fr 1.5fr 2fr 0.8fr 1fr' }}>
              <span className="text-xs font-mono font-bold" style={{ color: '#E8EDF2' }}>{order.id}</span>
              <span className="text-xs" style={{ color: '#8A9BAE' }}>{order.date}</span>
              <div>
                <div className="text-xs font-medium" style={{ color: '#E8EDF2' }}>{order.customer}</div>
                <div className="text-xs" style={{ color: '#8A9BAE' }}>{order.email}</div>
              </div>
              <span className="text-xs" style={{ color: '#8A9BAE' }}>{order.items}</span>
              <span className="text-sm font-bold" style={{ color: '#00D4AA' }}>{order.total} €</span>
              <span className="text-xs px-2.5 py-1 rounded-full font-medium w-fit" style={{ backgroundColor: `${STATUS_COLORS[order.status]}18`, color: STATUS_COLORS[order.status] }}>
                {order.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
