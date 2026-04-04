'use client'
import { adminOrders, adminLeads, adminWaitlist, adminProducts } from '@/lib/mockAdminData'

const STATUS_COLORS: Record<string, string> = {
  'livré': '#00D4AA',
  'en transit': '#F59E0B',
  'en préparation': '#8A9BAE',
  'remboursé': '#EF4444',
}

function StatCard({ icon, label, value, sub, color = '#00D4AA' }: { icon: string; label: string; value: string | number; sub?: string; color?: string }) {
  return (
    <div className="p-6 rounded-2xl" style={{ backgroundColor: '#1A2430', border: '1px solid #2A3A4A' }}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-2xl">{icon}</span>
        <span className="text-2xl font-black" style={{ color }}>{value}</span>
      </div>
      <div className="text-sm font-semibold" style={{ color: '#E8EDF2' }}>{label}</div>
      {sub && <div className="text-xs mt-1" style={{ color: '#8A9BAE' }}>{sub}</div>}
    </div>
  )
}

export default function AdminPage() {
  const totalCA = adminOrders.filter(o => o.status !== 'remboursé').reduce((sum, o) => sum + o.total, 0)
  const lastOrders = adminOrders.slice(0, 5)

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold" style={{ color: '#E8EDF2' }}>Dashboard</h1>
        <p className="text-sm mt-1" style={{ color: '#8A9BAE' }}>Vue d&apos;ensemble — Quitly Back-office</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon="💰" label="CA total" value={`${totalCA} €`} sub="Hors remboursements" />
        <StatCard icon="📦" label="Commandes" value={adminOrders.length} sub={`${adminOrders.filter(o => o.status === 'livré').length} livrées`} />
        <StatCard icon="🤝" label="Leads distrib." value={adminLeads.length} sub="En attente de contact" color="#F59E0B" />
        <StatCard icon="📧" label="Waitlist" value={adminWaitlist.length} sub="Inscrits pré-lancement" color="#A78BFA" />
      </div>

      {/* Alerte stock faible */}
      {adminProducts.some(p => p.stock < 20) && (
        <div className="p-4 rounded-xl mb-8 flex items-center gap-3" style={{ backgroundColor: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)' }}>
          <span className="text-xl">⚠️</span>
          <div>
            <span className="text-sm font-semibold" style={{ color: '#F59E0B' }}>Stock faible : </span>
            <span className="text-sm" style={{ color: '#8A9BAE' }}>
              {adminProducts.filter(p => p.stock < 20).map(p => `${p.name} (${p.stock} restants)`).join(', ')}
            </span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Dernières commandes */}
        <div className="lg:col-span-2 rounded-2xl overflow-hidden" style={{ backgroundColor: '#1A2430', border: '1px solid #2A3A4A' }}>
          <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: '#2A3A4A' }}>
            <h2 className="font-bold" style={{ color: '#E8EDF2' }}>Dernières commandes</h2>
            <a href="/admin/commandes" className="text-xs font-medium" style={{ color: '#00D4AA' }}>Voir tout →</a>
          </div>
          <div className="divide-y" style={{ borderColor: '#2A3A4A' }}>
            {lastOrders.map(order => (
              <div key={order.id} className="px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <div className="text-sm font-mono font-bold" style={{ color: '#E8EDF2' }}>{order.id}</div>
                  <div className="text-xs mt-0.5" style={{ color: '#8A9BAE' }}>{order.customer} · {order.date}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold" style={{ color: '#00D4AA' }}>{order.total} €</span>
                  <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ backgroundColor: `${STATUS_COLORS[order.status]}18`, color: STATUS_COLORS[order.status] }}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Résumé rapide */}
        <div className="space-y-4">
          {/* Stock produits */}
          <div className="p-5 rounded-2xl" style={{ backgroundColor: '#1A2430', border: '1px solid #2A3A4A' }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-sm" style={{ color: '#E8EDF2' }}>Stock produits</h2>
              <a href="/admin/produits" className="text-xs" style={{ color: '#00D4AA' }}>Gérer →</a>
            </div>
            <div className="space-y-3">
              {adminProducts.map(p => (
                <div key={p.id}>
                  <div className="flex justify-between text-xs mb-1">
                    <span style={{ color: '#8A9BAE' }}>{p.name.split(' ').slice(0, 2).join(' ')}</span>
                    <span style={{ color: p.stock < 20 ? '#F59E0B' : '#E8EDF2' }}>{p.stock} unités</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: '#2A3A4A' }}>
                    <div className="h-full rounded-full" style={{ width: `${Math.min(100, (p.stock / 150) * 100)}%`, backgroundColor: p.stock < 20 ? '#F59E0B' : '#00D4AA' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Derniers leads */}
          <div className="p-5 rounded-2xl" style={{ backgroundColor: '#1A2430', border: '1px solid #2A3A4A' }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-sm" style={{ color: '#E8EDF2' }}>Leads récents</h2>
              <a href="/admin/leads" className="text-xs" style={{ color: '#00D4AA' }}>Voir tout →</a>
            </div>
            <div className="space-y-3">
              {adminLeads.slice(0, 3).map(lead => (
                <div key={lead.id} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ backgroundColor: 'rgba(0,212,170,0.15)', color: '#00D4AA' }}>
                    {lead.boutique[0]}
                  </div>
                  <div>
                    <div className="text-xs font-medium" style={{ color: '#E8EDF2' }}>{lead.boutique}</div>
                    <div className="text-xs" style={{ color: '#8A9BAE' }}>{lead.city} · {lead.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
