export default function CEDeviceRender({ className = '', size = 300 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size * 3}
      viewBox="0 0 100 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Corps principal */}
      <rect x="35" y="20" width="30" height="240" rx="15" fill="#1A2430" stroke="#2A3A4A" strokeWidth="1"/>
      {/* Gradient overlay */}
      <defs>
        <linearGradient id="ceGrad" x1="35" y1="0" x2="65" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2A3A4A"/>
          <stop offset="50%" stopColor="#3A4A5A"/>
          <stop offset="100%" stopColor="#1A2430"/>
        </linearGradient>
        <linearGradient id="tealGlow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00D4AA" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="#00D4AA" stopOpacity="0"/>
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <rect x="35" y="20" width="30" height="240" rx="15" fill="url(#ceGrad)"/>

      {/* LED teal en haut */}
      <circle cx="50" cy="35" r="6" fill="#00D4AA" filter="url(#glow)" opacity="0.9"/>
      <circle cx="50" cy="35" r="3" fill="white" opacity="0.8"/>

      {/* Écran OLED */}
      <rect x="40" y="55" width="20" height="35" rx="4" fill="#080E14" stroke="#00D4AA" strokeWidth="0.5" opacity="0.8"/>
      {/* Barres sur l'écran */}
      <rect x="43" y="62" width="14" height="2" rx="1" fill="#00D4AA" opacity="0.7"/>
      <rect x="43" y="67" width="10" height="2" rx="1" fill="#00D4AA" opacity="0.4"/>
      <rect x="43" y="72" width="12" height="2" rx="1" fill="#00D4AA" opacity="0.5"/>
      <text x="50" y="84" textAnchor="middle" fill="#00D4AA" fontSize="5" fontFamily="monospace" opacity="0.8">-70%</text>

      {/* Loquet physique breveté */}
      <rect x="37" y="105" width="26" height="8" rx="4" fill="#2A3A4A" stroke="#00D4AA" strokeWidth="0.8"/>
      <rect x="39" y="107" width="10" height="4" rx="2" fill="#00D4AA" opacity="0.6"/>
      <text x="50" y="119" textAnchor="middle" fill="#8A9BAE" fontSize="4" fontFamily="monospace">LOQUET ™</text>

      {/* Bluetooth indicator */}
      <text x="50" y="145" textAnchor="middle" fill="#00D4AA" fontSize="10" opacity="0.5">⚡</text>

      {/* Port USB-C en bas */}
      <rect x="44" y="248" width="12" height="5" rx="2" fill="#0A1520" stroke="#2A3A4A" strokeWidth="0.5"/>

      {/* Bout brassard teal */}
      <rect x="35" y="255" width="30" height="8" rx="4" fill="#00D4AA" opacity="0.15" stroke="#00D4AA" strokeWidth="0.5"/>

      {/* Embout vapeur */}
      <rect x="40" y="15" width="20" height="8" rx="4" fill="#2A3A4A"/>
      <ellipse cx="50" cy="13" rx="6" ry="3" fill="#3A4A5A"/>

      {/* Reflets */}
      <line x1="37" y1="25" x2="37" y2="255" stroke="white" strokeWidth="0.5" opacity="0.08"/>
    </svg>
  )
}
