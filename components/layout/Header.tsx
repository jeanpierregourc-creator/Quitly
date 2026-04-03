'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/programme', label: 'Programme' },
    { href: '/commander', label: 'Boutique' },
    { href: '/distributeurs', label: 'Distributeurs' },
    { href: '/faq', label: 'FAQ' },
  ]

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? 'rgba(8, 14, 20, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid #1A2430' : 'none',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl font-bold tracking-tight transition-colors" style={{ color: '#00D4AA' }}>
            Quitly
          </span>
        </Link>

        {/* Nav desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors hover:text-white"
              style={{ color: '#8A9BAE' }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA + menu mobile */}
        <div className="flex items-center gap-3">
          <Link
            href="/commander"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:opacity-90 active:scale-95"
            style={{ backgroundColor: '#00D4AA', color: '#080E14' }}
          >
            Commander — 130 €
          </Link>
          {/* Burger menu mobile */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span className="block w-5 h-0.5 transition-all" style={{ backgroundColor: '#E8EDF2', transform: menuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none' }} />
            <span className="block w-5 h-0.5" style={{ backgroundColor: '#E8EDF2', opacity: menuOpen ? 0 : 1 }} />
            <span className="block w-5 h-0.5 transition-all" style={{ backgroundColor: '#E8EDF2', transform: menuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none' }} />
          </button>
        </div>
      </div>

      {/* Menu mobile déroulant */}
      {menuOpen && (
        <div className="md:hidden border-t" style={{ backgroundColor: '#080E14', borderColor: '#1A2430' }}>
          <nav className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-4">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-base font-medium py-2"
                style={{ color: '#E8EDF2' }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/commander"
              className="mt-2 w-full text-center py-3 rounded-lg font-semibold"
              style={{ backgroundColor: '#00D4AA', color: '#080E14' }}
              onClick={() => setMenuOpen(false)}
            >
              Commander — 130 €
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
