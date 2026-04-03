'use client'
import { useState } from 'react'

type Question = { q: string; a: string }
type Category = { category: string; icon: string; questions: Question[] }

export default function FAQAccordion({ data }: { data: Category[] }) {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({})

  const toggle = (key: string) => {
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="space-y-6">
      {data.map((cat, ci) => (
        <div key={ci}>
          {/* Titre catégorie */}
          <div className="flex items-center gap-3 mb-3 pb-3 border-b" style={{ borderColor: '#2A3A4A' }}>
            <span className="text-xl">{cat.icon}</span>
            <h2 className="text-lg font-bold" style={{ color: '#E8EDF2' }}>{cat.category}</h2>
          </div>

          {/* Questions */}
          <div className="space-y-2">
            {cat.questions.map((item, qi) => {
              const key = `${ci}-${qi}`
              const isOpen = openItems[key]
              return (
                <div key={qi} className="rounded-xl overflow-hidden" style={{ backgroundColor: '#1A2430', border: `1px solid ${isOpen ? 'rgba(0,212,170,0.3)' : '#2A3A4A'}` }}>
                  <button
                    className="w-full flex items-center justify-between gap-4 p-5 text-left transition-all"
                    onClick={() => toggle(key)}
                    aria-expanded={isOpen}
                  >
                    <span className="font-medium text-sm sm:text-base" style={{ color: '#E8EDF2' }}>{item.q}</span>
                    <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-transform" style={{ backgroundColor: isOpen ? 'rgba(0,212,170,0.2)' : '#2A3A4A', color: '#00D4AA', transform: isOpen ? 'rotate(45deg)' : 'none' }}>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                      </svg>
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5">
                      <div className="pt-3 border-t text-sm leading-relaxed" style={{ borderColor: '#2A3A4A', color: '#8A9BAE' }}>{item.a}</div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
