import { adminLeads } from '@/lib/mockAdminData'

export default function AdminLeadsPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold" style={{ color: '#E8EDF2' }}>Leads distributeurs</h1>
        <p className="text-sm mt-1" style={{ color: '#8A9BAE' }}>{adminLeads.length} demandes reçues</p>
      </div>

      <div className="space-y-4">
        {adminLeads.map(lead => (
          <div key={lead.id} className="p-6 rounded-2xl flex flex-wrap items-center gap-6" style={{ backgroundColor: '#1A2430', border: '1px solid #2A3A4A' }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-black flex-shrink-0" style={{ backgroundColor: 'rgba(0,212,170,0.12)', color: '#00D4AA' }}>
              {lead.boutique[0]}
            </div>
            <div className="flex-1 min-w-48">
              <div className="font-bold" style={{ color: '#E8EDF2' }}>{lead.boutique}</div>
              <div className="text-sm mt-0.5" style={{ color: '#8A9BAE' }}>{lead.contact} · {lead.city}</div>
            </div>
            <div className="flex flex-wrap gap-3 text-sm">
              <a href={`mailto:${lead.email}`} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all hover:opacity-80" style={{ backgroundColor: '#0D1520', color: '#00D4AA', border: '1px solid rgba(0,212,170,0.2)' }}>
                ✉️ {lead.email}
              </a>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg" style={{ backgroundColor: '#0D1520', color: '#8A9BAE' }}>
                📞 {lead.phone}
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs" style={{ backgroundColor: '#0D1520', color: '#8A9BAE' }}>
                📅 {lead.date}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
