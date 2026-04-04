export default function CEDeviceRender({ className = '', size = 300 }: { className?: string; size?: number }) {
  const w = size
  const h = size * 3.2

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 100 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id={`bodyGrad-${size}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#141E2A"/>
          <stop offset="30%" stopColor="#1E2E3E"/>
          <stop offset="70%" stopColor="#243444"/>
          <stop offset="100%" stopColor="#0E1820"/>
        </linearGradient>
        <linearGradient id={`tealGrad-${size}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00D4AA"/>
          <stop offset="100%" stopColor="#00A88A"/>
        </linearGradient>
        <linearGradient id={`screenGrad-${size}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#061018"/>
          <stop offset="100%" stopColor="#0A1824"/>
        </linearGradient>
        <filter id={`glow-${size}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id={`softGlow-${size}`} x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="4" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <radialGradient id={`ledGlow-${size}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00D4AA" stopOpacity="0.6"/>
          <stop offset="100%" stopColor="#00D4AA" stopOpacity="0"/>
        </radialGradient>
        <clipPath id={`bodyClip-${size}`}>
          <rect x="30" y="18" width="40" height="264" rx="16"/>
        </clipPath>
      </defs>

      {/* Halo LED en haut */}
      <ellipse cx="50" cy="32" rx="14" ry="6" fill={`url(#ledGlow-${size})`} opacity="0.8"/>

      {/* Embout vapeur */}
      <rect x="41" y="8" width="18" height="12" rx="5" fill="#1A2A3A"/>
      <rect x="44" y="10" width="12" height="8" rx="3" fill="#141E2A" stroke="#243444" strokeWidth="0.5"/>
      <ellipse cx="50" cy="9" rx="5" ry="2" fill="#243444"/>

      {/* Corps principal */}
      <rect x="30" y="18" width="40" height="264" rx="16" fill={`url(#bodyGrad-${size})`}/>

      {/* Reflet gauche */}
      <rect x="30" y="18" width="4" height="264" rx="2" fill="white" opacity="0.04" clipPath={`url(#bodyClip-${size})`}/>

      {/* Reflet diagonal top */}
      <path d="M 32 20 L 55 20 L 32 55 Z" fill="white" opacity="0.03" clipPath={`url(#bodyClip-${size})`}/>

      {/* Bordure subtile */}
      <rect x="30" y="18" width="40" height="264" rx="16" fill="none" stroke="#2A3A4A" strokeWidth="0.8"/>

      {/* LED top */}
      <circle cx="50" cy="32" r="5" fill={`url(#tealGrad-${size})`} filter={`url(#glow-${size})`}/>
      <circle cx="50" cy="32" r="2.5" fill="white" opacity="0.9"/>
      <circle cx="48.5" cy="30.5" r="1" fill="white" opacity="0.6"/>

      {/* Écran OLED */}
      <rect x="36" y="50" width="28" height="42" rx="5" fill={`url(#screenGrad-${size})`} stroke="#00D4AA" strokeWidth="0.4" opacity="0.9"/>

      {/* Contenu écran */}
      <text x="50" y="62" textAnchor="middle" fill="#00D4AA" fontSize="5.5" fontFamily="monospace" opacity="0.9" fontWeight="bold">QUITLY</text>
      <line x1="38" y1="65" x2="62" y2="65" stroke="#00D4AA" strokeWidth="0.3" opacity="0.3"/>

      {/* Barre de progression écran */}
      <rect x="38" y="68" width="24" height="2.5" rx="1.25" fill="#1A2A3A"/>
      <rect x="38" y="68" width="15" height="2.5" rx="1.25" fill="#00D4AA" opacity="0.8"/>

      <text x="50" y="77" textAnchor="middle" fill="#8A9BAE" fontSize="4" fontFamily="monospace">Phase 3/3</text>

      <text x="50" y="85" textAnchor="middle" fill="#00D4AA" fontSize="8" fontFamily="monospace" fontWeight="bold">-62%</text>

      <text x="50" y="91" textAnchor="middle" fill="#8A9BAE" fontSize="3.5" fontFamily="monospace">consommation</text>

      {/* Loquet breveté — section distincte */}
      <rect x="30" y="102" width="40" height="1" fill="#2A3A4A"/>
      <rect x="32" y="108" width="36" height="14" rx="5" fill="#0D1824" stroke="#00D4AA" strokeWidth="0.6"/>
      {/* Curseur loquet */}
      <rect x="34" y="110" width="14" height="10" rx="3" fill="#1A2A3A"/>
      <rect x="35" y="111" width="12" height="8" rx="2.5" fill="#00D4AA" opacity="0.3"/>
      <rect x="36" y="112" width="6" height="6" rx="2" fill="#00D4AA" opacity="0.7"/>
      {/* Texte loquet */}
      <text x="53" y="116" fill="#8A9BAE" fontSize="3.5" fontFamily="monospace">LOCK™</text>
      <text x="53" y="120" fill="#00D4AA" fontSize="3" fontFamily="monospace">+15min</text>

      {/* Séparateur */}
      <rect x="30" y="128" width="40" height="1" fill="#1A2A3A"/>

      {/* Zone Bluetooth / indicateurs */}
      <circle cx="50" cy="145" r="10" fill="#0D1824" stroke="#1A2A3A" strokeWidth="0.5"/>
      {/* Bluetooth icon stylisé */}
      <path d="M50 138 L50 152 M50 138 L55 143 L50 148 L55 143 M50 152 L45 147 L50 142 L45 147" stroke="#00D4AA" strokeWidth="1.2" strokeLinecap="round" opacity="0.6"/>

      {/* Indicateurs latéraux */}
      <circle cx="35" cy="165" r="2" fill="#00D4AA" opacity="0.3"/>
      <circle cx="35" cy="172" r="2" fill="#00D4AA" opacity="0.5"/>
      <circle cx="35" cy="179" r="2" fill="#00D4AA" opacity="0.7"/>

      {/* Zone bas — texture grille subtile */}
      <rect x="34" y="190" width="32" height="50" rx="4" fill="#0D1824" opacity="0.5"/>
      {/* Mini grille */}
      {[0,1,2,3].map(row =>
        [0,1,2,3,4,5,6,7].map(col => (
          <rect key={`${row}-${col}`} x={35 + col * 4} y={192 + row * 12} width="2" height="2" rx="0.5" fill="#1A2A3A" opacity="0.6"/>
        ))
      )}

      {/* Port USB-C */}
      <rect x="43" y="266" width="14" height="6" rx="3" fill="#0A1520" stroke="#1A2A3A" strokeWidth="0.5"/>
      <rect x="45" y="267.5" width="10" height="3" rx="1.5" fill="#141E2A"/>
      <rect x="46.5" y="268" width="7" height="2" rx="1" fill="#0D1824" stroke="#2A3A4A" strokeWidth="0.3"/>

      {/* Bandeau teal bas */}
      <rect x="30" y="274" width="40" height="8" rx="4" fill="#00D4AA" opacity="0.08" stroke="#00D4AA" strokeWidth="0.5"/>
      <rect x="30" y="274" width="40" height="8" rx="4" fill="none" stroke="#00D4AA" strokeOpacity="0.4" strokeWidth="0.4"/>
    </svg>
  )
}
