'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getUser } from '@/lib/auth'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState(false)
  const [checking, setChecking] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const user = getUser()
    // Accès admin réservé exclusivement à admin@quitly.fr
    if (user && user.email === 'admin@quitly.fr') {
      setAuthorized(true)
    } else {
      router.push('/admin/login')
    }
    setChecking(false)
  }, [router])

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#080E14' }}>
        <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: '#00D4AA', borderTopColor: 'transparent' }} />
      </div>
    )
  }

  if (!authorized) return null

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#080E14' }}>
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
