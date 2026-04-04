'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from '@/lib/auth'
import { useRouter } from 'next/navigation'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: '📊', exact: true },
  { href: '/admin/commandes', label: 'Commandes', icon: '📦', exact: false },
  { href: '/admin/produits', label: 'Produits', icon: '🛍️', exact: false },
  { href: '/admin/leads', label: 'Leads distrib.', icon: '🤝', exact: false },
  { href: '/admin/waitlist', label: 'Waitlist', icon: '📧', exact: false },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    signOut()
    router.push('/')
  }

  return (
    <aside className="w-56 flex-shrink-0 min-h-screen flex flex-col" style={{ backgroundColor: '#0D1520', borderRight: '1px solid #1A2430' }}>
      {/* Logo */}
      <div className="px-5 py-5 border-b" style={{ borderColor: '#1A2430' }}>
        <div className="text-lg font-bold" style={{ color: '#00D4AA' }}>Quitly</div>
        <div className="text-xs font-medium mt-0.5" style={{ color: '#8A9BAE' }}>Back-office admin</div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map(item => {
          const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all"
              style={{
                backgroundColor: isActive ? 'rgba(0,212,170,0.12)' : 'transparent',
                color: isActive ? '#00D4AA' : '#8A9BAE',
                borderLeft: isActive ? '2px solid #00D4AA' : '2px solid transparent',
              }}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Footer sidebar */}
      <div className="p-3 border-t" style={{ borderColor: '#1A2430' }}>
        <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all hover:opacity-80" style={{ color: '#8A9BAE' }}>
          <span>🌐</span> Voir le site
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all hover:opacity-80 mt-1"
          style={{ color: '#8A9BAE' }}
        >
          <span>🚪</span> Déconnexion
        </button>
      </div>
    </aside>
  )
}
