'use client'
import { useState } from 'react'
import { adminProducts as initialProducts, AdminProduct } from '@/lib/mockAdminData'

export default function AdminProduitsPage() {
  const [products, setProducts] = useState<AdminProduct[]>(initialProducts)

  const toggleActive = (id: string) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, active: !p.active } : p))
  }

  const updateStock = (id: string, delta: number) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, stock: Math.max(0, p.stock + delta) } : p))
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#E8EDF2' }}>Produits</h1>
          <p className="text-sm mt-1" style={{ color: '#8A9BAE' }}>Gestion du catalogue et des stocks</p>
        </div>
        <div className="text-xs px-3 py-1.5 rounded-full" style={{ backgroundColor: 'rgba(0,212,170,0.1)', color: '#00D4AA', border: '1px solid rgba(0,212,170,0.2)' }}>
          Mode démo — modifications non persistées
        </div>
      </div>

      <div className="space-y-4">
        {products.map(product => (
          <div key={product.id} className="p-6 rounded-2xl" style={{ backgroundColor: '#1A2430', border: `1px solid ${product.active ? '#2A3A4A' : 'rgba(239,68,68,0.2)'}`, opacity: product.active ? 1 : 0.6 }}>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl" style={{ backgroundColor: '#0D1520' }}>
                  {product.type === 'kit' ? '📱' : '💧'}
                </div>
                <div>
                  <div className="font-semibold" style={{ color: '#E8EDF2' }}>{product.name}</div>
                  <div className="text-sm mt-0.5" style={{ color: '#8A9BAE' }}>
                    {product.type === 'kit' ? 'Kit complet' : 'Liquide'} · {product.price} € TTC
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 flex-wrap">
                {/* Stock */}
                <div className="text-center">
                  <div className="text-xs mb-1" style={{ color: '#8A9BAE' }}>Stock</div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateStock(product.id, -5)} className="w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold transition-all hover:opacity-80" style={{ backgroundColor: '#2A3A4A', color: '#E8EDF2' }}>-</button>
                    <span className="text-lg font-bold min-w-10 text-center" style={{ color: product.stock < 20 ? '#F59E0B' : '#E8EDF2' }}>{product.stock}</span>
                    <button onClick={() => updateStock(product.id, 5)} className="w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold transition-all hover:opacity-80" style={{ backgroundColor: '#2A3A4A', color: '#E8EDF2' }}>+</button>
                  </div>
                  {product.stock < 20 && <div className="text-xs mt-1" style={{ color: '#F59E0B' }}>⚠️ Stock faible</div>}
                </div>

                {/* Toggle actif */}
                <div className="text-center">
                  <div className="text-xs mb-2" style={{ color: '#8A9BAE' }}>Statut</div>
                  <button
                    onClick={() => toggleActive(product.id)}
                    className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
                    style={{ backgroundColor: product.active ? '#00D4AA' : '#2A3A4A' }}
                  >
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform" style={{ transform: `translateX(${product.active ? '1.375rem' : '0.125rem'})` }} />
                  </button>
                  <div className="text-xs mt-1" style={{ color: product.active ? '#00D4AA' : '#8A9BAE' }}>{product.active ? 'Actif' : 'Inactif'}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
