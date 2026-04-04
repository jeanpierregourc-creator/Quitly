'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getUser } from '@/lib/auth'
import { mockOrders } from '@/lib/mockOrders'

export default function CommandesPage() {
  const [mounted, setMounted] = useState(false)
  const [user, setUser] = useState<ReturnType<typeof getUser>>(null)

  useEffect(() => {
    setMounted(true)
    setUser(getUser())
  }, [])

  if (!mounted) return null

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 gap-4">
        <p style={{ color: '#8A9BAE' }}>Vous devez être connecté pour voir vos commandes.</p>
        <Link href="/compte" className="px-6 py-3 rounded-xl font-semibold" style={{ backgroundColor: '#00D4AA', color: '#080E14' }}>
          Se connecter
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-4 mb-10">
          <Link href="/compte" className="text-sm" style={{ color: '#8A9BAE' }}>← Mon compte</Link>
          <h1 className="text-3xl font-bold" style={{ color: '#E8EDF2' }}>Mes commandes</h1>
        </div>

        <div className="space-y-4">
          {mockOrders.map((order, i) => (
            <div key={i} className="p-6 rounded-2xl" style={{ backgroundColor: '#1A2430', border: '1px solid #2A3A4A' }}>
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <div>
                  <span className="font-mono font-bold" style={{ color: '#E8EDF2' }}>{order.id}</span>
                  <span className="text-sm ml-3" style={{ color: '#8A9BAE' }}>· {order.date}</span>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: 'rgba(0,212,170,0.15)', color: order.statusColor }}>
                  ✓ {order.status}
                </span>
              </div>

              {order.items.map((item, j) => (
                <div key={j} className="flex justify-between text-sm py-2 border-t" style={{ borderColor: '#2A3A4A' }}>
                  <span style={{ color: '#8A9BAE' }}>{item.name} × {item.qty}</span>
                  <span style={{ color: '#E8EDF2' }}>{item.price * item.qty} €</span>
                </div>
              ))}

              <div className="flex items-center justify-between pt-3 border-t mt-2 flex-wrap gap-3" style={{ borderColor: '#2A3A4A' }}>
                <span className="font-bold" style={{ color: '#00D4AA' }}>Total : {order.total} €</span>
                <div className="flex gap-3">
                  {order.tracking && (
                    <span className="text-xs px-3 py-1.5 rounded-lg font-mono" style={{ backgroundColor: '#0D1520', color: '#8A9BAE' }}>
                      📦 {order.tracking}
                    </span>
                  )}
                  <Link
                    href="/compte/retour"
                    className="text-xs px-3 py-1.5 rounded-lg font-medium transition-all hover:opacity-80"
                    style={{ backgroundColor: '#2A3A4A', color: '#E8EDF2' }}
                  >
                    Retourner
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/commander" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all hover:opacity-90" style={{ backgroundColor: '#00D4AA', color: '#080E14' }}>
            Commander à nouveau
          </Link>
        </div>
      </div>
    </div>
  )
}
