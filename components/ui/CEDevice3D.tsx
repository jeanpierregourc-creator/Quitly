'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, animate } from 'framer-motion'

export default function CEDevice3D({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const rotateY = useMotionValue(0)
  const rotateX = useMotionValue(5)

  // Auto-rotation douce quand pas de survol
  useEffect(() => {
    if (isHovering) return
    const ctrl = animate(rotateY, [0, 14, 0, -14, 0], {
      duration: 7,
      repeat: Infinity,
      ease: 'easeInOut',
    })
    return () => ctrl.stop()
  }, [isHovering, rotateY])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    animate(rotateY, x * 35, { duration: 0.15, ease: 'easeOut' })
    animate(rotateX, -y * 20 + 5, { duration: 0.15, ease: 'easeOut' })
  }

  const handleMouseEnter = () => setIsHovering(true)

  const handleMouseLeave = () => {
    setIsHovering(false)
    animate(rotateX, 5, { duration: 0.6, ease: 'easeOut' })
  }

  return (
    <div
      ref={ref}
      className={`relative cursor-pointer select-none ${className}`}
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{ rotateY, rotateX, transformStyle: 'preserve-3d' }}
        className="flex flex-col items-center"
      >
        {/* Halo ambiant */}
        <div
          className="absolute pointer-events-none"
          style={{
            inset: '-40px',
            background: 'radial-gradient(ellipse at 50% 40%, rgba(0,212,170,0.18), transparent 65%)',
            filter: 'blur(20px)',
            zIndex: 0,
          }}
        />

        {/* SVG Device */}
        <svg
          width="110"
          height="370"
          viewBox="0 0 100 340"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: 'relative', zIndex: 1, filter: 'drop-shadow(0 20px 40px rgba(0,212,170,0.2))' }}
        >
          <defs>
            {/* Gradients corps */}
            <linearGradient id="bodyGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#141E2A" />
              <stop offset="25%" stopColor="#1C2C3C" />
              <stop offset="60%" stopColor="#223040" />
              <stop offset="100%" stopColor="#0E1820" />
            </linearGradient>
            <linearGradient id="tealGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00D4AA" />
              <stop offset="100%" stopColor="#00A88A" />
            </linearGradient>
            <linearGradient id="metalGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2A3A4A" />
              <stop offset="50%" stopColor="#3A4A5A" />
              <stop offset="100%" stopColor="#1A2A3A" />
            </linearGradient>
            <linearGradient id="glassGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(180,220,255,0.12)" />
              <stop offset="100%" stopColor="rgba(0,212,170,0.06)" />
            </linearGradient>
            <linearGradient id="liquidGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00D4AA" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#005A46" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="screenGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#030C14" />
              <stop offset="100%" stopColor="#060E18" />
            </linearGradient>
            <linearGradient id="btnGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#1E2E3E" />
              <stop offset="100%" stopColor="#253545" />
            </linearGradient>
            <radialGradient id="ledGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00D4AA" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#00D4AA" stopOpacity="0" />
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="softGlow">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <clipPath id="tankClip">
              <rect x="29" y="19" width="42" height="70" rx="7" />
            </clipPath>
            <clipPath id="bodyClip">
              <rect x="26" y="90" width="48" height="222" rx="12" />
            </clipPath>
          </defs>

          {/* ═══ EMBOUT / MOUTHPIECE ═══ */}
          <rect x="39" y="1" width="22" height="20" rx="8" fill="url(#metalGrad)" />
          <rect x="42" y="3" width="16" height="16" rx="6" fill="#0D1824" stroke="#2A3A4A" strokeWidth="0.5" />
          <ellipse cx="50" cy="1" rx="6" ry="2.5" fill="#1A2A3A" />
          <ellipse cx="50" cy="3" rx="5" ry="2" fill="#00D4AA" opacity="0.15" />

          {/* ═══ ANNEAU MÉTAL HAUT ═══ */}
          <rect x="28" y="17" width="44" height="7" rx="3" fill="url(#metalGrad)" />
          <rect x="28" y="17" width="44" height="7" rx="3" stroke="#3A4A5A" strokeWidth="0.4" fill="none" />
          <rect x="30" y="18" width="30" height="2" rx="1" fill="white" opacity="0.06" />

          {/* ═══ TANK VERRE ═══ */}
          {/* Fond verre */}
          <rect x="29" y="24" width="42" height="65" rx="6" fill="url(#glassGrad)" />
          {/* Liquide (60% plein) */}
          <rect x="31" y="52" width="38" height="35" rx="4" fill="url(#liquidGrad)" clipPath="url(#tankClip)" />
          {/* Bulles liquide */}
          <circle cx="40" cy="62" r="2" fill="#00D4AA" opacity="0.2" />
          <circle cx="56" cy="58" r="1.5" fill="#00D4AA" opacity="0.15" />
          <circle cx="48" cy="70" r="1" fill="#00D4AA" opacity="0.1" />
          {/* Coil central */}
          <rect x="44" y="32" width="12" height="30" rx="4" fill="#0D1824" stroke="#2A3A4A" strokeWidth="0.5" />
          <rect x="46" y="34" width="8" height="26" rx="3" fill="#141E2A" />
          {[0,1,2,3,4,5].map(i => (
            <rect key={i} x="47" y={36 + i * 4} width="6" height="1.5" rx="0.75" fill="#00D4AA" opacity="0.3" />
          ))}
          {/* Reflet gauche verre */}
          <rect x="31" y="26" width="4" height="60" rx="2" fill="white" opacity="0.05" clipPath="url(#tankClip)" />
          {/* Contour verre */}
          <rect x="29" y="24" width="42" height="65" rx="6" fill="none" stroke="rgba(150,200,255,0.15)" strokeWidth="1" />

          {/* Halo LED tank */}
          <ellipse cx="50" cy="24" rx="16" ry="5" fill="url(#ledGlow)" opacity="0.6" />

          {/* ═══ ANNEAU MÉTAL BAS TANK ═══ */}
          <rect x="28" y="86" width="44" height="7" rx="3" fill="url(#metalGrad)" />
          <rect x="28" y="86" width="44" height="7" rx="3" stroke="#3A4A5A" strokeWidth="0.4" fill="none" />

          {/* ═══ CORPS PRINCIPAL ═══ */}
          <rect x="26" y="90" width="48" height="222" rx="12" fill="url(#bodyGrad)" />
          {/* Reflet gauche */}
          <rect x="26" y="90" width="4" height="222" rx="2" fill="white" opacity="0.04" clipPath="url(#bodyClip)" />
          {/* Reflet diagonal haut */}
          <path d="M28 92 L62 92 L28 135 Z" fill="white" opacity="0.025" clipPath="url(#bodyClip)" />
          {/* Ombre droite */}
          <rect x="70" y="90" width="4" height="222" rx="2" fill="black" opacity="0.25" clipPath="url(#bodyClip)" />
          {/* Bordure */}
          <rect x="26" y="90" width="48" height="222" rx="12" fill="none" stroke="#2A3A4A" strokeWidth="0.8" />

          {/* ═══ ÉCRAN OLED ═══ */}
          <rect x="32" y="103" width="36" height="58" rx="6" fill="url(#screenGrad)" stroke="#00D4AA" strokeWidth="0.5" />
          {/* Reflet écran */}
          <rect x="33" y="104" width="16" height="3" rx="1.5" fill="white" opacity="0.04" />
          {/* Contenu écran */}
          <text x="50" y="115" textAnchor="middle" fill="#00D4AA" fontSize="5" fontFamily="monospace" fontWeight="bold" opacity="0.9">QUITLY</text>
          <line x1="34" y1="118" x2="66" y2="118" stroke="#00D4AA" strokeWidth="0.3" opacity="0.35" />
          {/* Compteur */}
          <text x="50" y="132" textAnchor="middle" fill="#E8EDF2" fontSize="15" fontFamily="monospace" fontWeight="bold">100</text>
          <text x="50" y="140" textAnchor="middle" fill="#8A9BAE" fontSize="4" fontFamily="monospace" letterSpacing="1">BOUFFÉES</text>
          {/* Barre progression */}
          <rect x="34" y="144" width="32" height="2.5" rx="1.25" fill="#0D1824" />
          <rect x="34" y="144" width="20" height="2.5" rx="1.25" fill="url(#tealGrad)" opacity="0.85" />
          {/* Stats bas écran */}
          <text x="36" y="154" fill="#8A9BAE" fontSize="3.5" fontFamily="monospace">REST: 400</text>
          <text x="62" y="154" textAnchor="end" fill="#00D4AA" fontSize="3.5" fontFamily="monospace">30W</text>

          {/* ═══ SÉPARATEUR ═══ */}
          <rect x="28" y="169" width="44" height="0.8" fill="#1A2A3A" />

          {/* ═══ LOQUET BREVETÉ ═══ */}
          <rect x="30" y="175" width="40" height="18" rx="5" fill="#0A1520" stroke="#00D4AA" strokeWidth="0.5" />
          {/* Curseur loquet */}
          <rect x="32" y="177" width="17" height="14" rx="3.5" fill="#141E2A" />
          <rect x="33" y="178" width="15" height="12" rx="3" fill="#00D4AA" opacity="0.2" />
          <rect x="34" y="179" width="8" height="10" rx="2.5" fill="url(#tealGrad)" opacity="0.7" />
          {/* Icône loquet */}
          <rect x="36" y="182" width="4" height="5" rx="1" fill="white" opacity="0.8" />
          <path d="M35.5 182 C35.5 180 38.5 180 38.5 182" stroke="white" strokeWidth="1" fill="none" opacity="0.8" />
          {/* Label */}
          <text x="53" y="183" fill="#8A9BAE" fontSize="3.5" fontFamily="monospace">LOCK™</text>
          <text x="53" y="189" fill="#00D4AA" fontSize="3" fontFamily="monospace">ACTIF +15min</text>

          {/* ═══ SÉPARATEUR ═══ */}
          <rect x="28" y="200" width="44" height="0.8" fill="#1A2A3A" />

          {/* ═══ TEXTURE GRIP ═══ */}
          {[0, 1, 2, 3, 4].map(row =>
            [0, 1, 2, 3, 4, 5, 6, 7].map(col => (
              <rect
                key={`${row}-${col}`}
                x={29 + col * 5.2}
                y={207 + row * 8}
                width="3"
                height="3"
                rx="0.8"
                fill="#1A2A3A"
                opacity="0.9"
              />
            ))
          )}

          {/* ═══ BLUETOOTH ═══ */}
          <circle cx="50" cy="255" r="9" fill="#0A1520" stroke="#1A2A3A" strokeWidth="0.6" />
          <path d="M50 248 L50 262 M50 248 L55 252.5 L50 257 L55 252.5 M50 262 L45 257.5 L50 253 L45 257.5"
            stroke="#00D4AA" strokeWidth="1.1" strokeLinecap="round" opacity="0.65" filter="url(#glow)" />

          {/* ═══ INDICATEURS CÔTÉ GAUCHE ═══ */}
          <circle cx="30" cy="270" r="2.2" fill="#00D4AA" opacity="0.25" filter="url(#glow)" />
          <circle cx="30" cy="278" r="2.2" fill="#00D4AA" opacity="0.45" filter="url(#glow)" />
          <circle cx="30" cy="286" r="2.2" fill="#00D4AA" opacity="0.7" filter="url(#glow)" />

          {/* ═══ BOUTONS DROITE ═══ */}
          {/* Bouton principal (haut) */}
          <rect x="72" y="118" width="5" height="22" rx="2.5" fill="url(#btnGrad)" stroke="#2A3A4A" strokeWidth="0.5" />
          <rect x="73" y="119" width="2" height="8" rx="1" fill="white" opacity="0.05" />
          {/* Bouton + */}
          <rect x="72" y="146" width="5" height="12" rx="2.5" fill="url(#btnGrad)" stroke="#2A3A4A" strokeWidth="0.5" />
          {/* Bouton - */}
          <rect x="72" y="163" width="5" height="12" rx="2.5" fill="url(#btnGrad)" stroke="#2A3A4A" strokeWidth="0.5" />

          {/* ═══ PORT USB-C ═══ */}
          <rect x="42" y="298" width="16" height="8" rx="4" fill="#080E14" stroke="#1A2A3A" strokeWidth="0.6" />
          <rect x="44" y="299.5" width="12" height="5" rx="2.5" fill="#0D1824" />
          <rect x="45.5" y="300.5" width="9" height="3" rx="1.5" fill="#141E2A" stroke="#2A3A4A" strokeWidth="0.3" />
          {/* Pins USB */}
          {[0, 1, 2].map(i => (
            <rect key={i} x={47 + i * 2.5} y={301.5} width="1.5" height="1" rx="0.5" fill="#00D4AA" opacity="0.3" />
          ))}

          {/* ═══ BANDE BAS ═══ */}
          <rect x="26" y="308" width="48" height="4" rx="2" fill="none" stroke="#00D4AA" strokeOpacity="0.3" strokeWidth="0.5" />
          <rect x="26" y="308" width="48" height="4" rx="2" fill="#00D4AA" opacity="0.05" />
        </svg>

        {/* Ombre au sol */}
        <div
          style={{
            width: 80,
            height: 12,
            background: 'radial-gradient(ellipse, rgba(0,212,170,0.25), transparent)',
            filter: 'blur(8px)',
            marginTop: 4,
          }}
        />
      </motion.div>
    </div>
  )
}
