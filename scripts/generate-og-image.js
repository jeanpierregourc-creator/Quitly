/**
 * Génère l'image Open Graph pour le partage sur réseaux sociaux
 * Format : 1200x630px PNG (standard OG image)
 * Utilise uniquement les modules Node.js natifs
 */

const fs = require('fs');
const path = require('path');

const outputPath = path.join(__dirname, '..', 'public', 'og-image.svg');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="bg1" cx="20%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#00D4AA" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#080E14" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="bg2" cx="85%" cy="20%" r="50%">
      <stop offset="0%" stop-color="#00D4AA" stop-opacity="0.07"/>
      <stop offset="100%" stop-color="#080E14" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="#080E14"/>
  <rect width="1200" height="630" fill="url(#bg1)"/>
  <rect width="1200" height="630" fill="url(#bg2)"/>

  <!-- Barre teal gauche -->
  <rect x="0" y="0" width="6" height="630" fill="#00D4AA"/>

  <!-- Logo / Nom -->
  <text x="80" y="110" font-family="system-ui, -apple-system, sans-serif" font-size="52" font-weight="800" fill="#00D4AA" letter-spacing="6">QUITLY</text>

  <!-- Tagline principale -->
  <text x="80" y="210" font-family="system-ui, -apple-system, sans-serif" font-size="58" font-weight="700" fill="#E8EDF2">La dernière cigarette</text>
  <text x="80" y="278" font-family="system-ui, -apple-system, sans-serif" font-size="58" font-weight="700" fill="#00D4AA">que vous utiliserez.</text>

  <!-- Description -->
  <text x="80" y="350" font-family="system-ui, -apple-system, sans-serif" font-size="26" fill="#8A9BAE">Loquet breveté · IA comportementale · Programme 6 mois</text>

  <!-- Séparateur -->
  <line x1="80" y1="395" x2="400" y2="395" stroke="#2A3A4A" stroke-width="1"/>

  <!-- Stats -->
  <text x="80" y="450" font-family="system-ui, -apple-system, sans-serif" font-size="40" font-weight="800" fill="#00D4AA">6M</text>
  <text x="80" y="480" font-family="system-ui, -apple-system, sans-serif" font-size="16" fill="#8A9BAE">fumeurs en France</text>

  <text x="270" y="450" font-family="system-ui, -apple-system, sans-serif" font-size="40" font-weight="800" fill="#00D4AA">80%</text>
  <text x="270" y="480" font-family="system-ui, -apple-system, sans-serif" font-size="16" fill="#8A9BAE">d'échecs classiques</text>

  <text x="490" y="450" font-family="system-ui, -apple-system, sans-serif" font-size="40" font-weight="800" fill="#00D4AA">130 €</text>
  <text x="490" y="480" font-family="system-ui, -apple-system, sans-serif" font-size="16" fill="#8A9BAE">kit complet</text>

  <!-- Dispositif CE stylisé (côté droit) -->
  <g transform="translate(850, 80)">
    <!-- Corps de la CE -->
    <rect x="115" y="0" width="70" height="430" rx="20" fill="#1A2430" stroke="#2A3A4A" stroke-width="2"/>
    <!-- Ecran OLED -->
    <rect x="121" y="30" width="58" height="90" rx="6" fill="#0D1520"/>
    <text x="150" y="68" text-anchor="middle" font-family="monospace" font-size="11" fill="#00D4AA">-62%</text>
    <text x="150" y="83" text-anchor="middle" font-family="monospace" font-size="8" fill="#8A9BAE">Semaine 8</text>
    <!-- Barre progress -->
    <rect x="127" y="100" width="46" height="6" rx="3" fill="#2A3A4A"/>
    <rect x="127" y="100" width="18" height="6" rx="3" fill="#00D4AA"/>
    <!-- Loquet -->
    <rect x="121" y="200" width="58" height="50" rx="4" fill="#0D1520" stroke="#00D4AA" stroke-width="1.5"/>
    <text x="150" y="222" text-anchor="middle" font-family="monospace" font-size="9" fill="#00D4AA">LOCK</text>
    <text x="150" y="238" text-anchor="middle" font-family="monospace" font-size="7" fill="#8A9BAE">ACTIF</text>
    <!-- LED halo -->
    <ellipse cx="150" cy="380" rx="20" ry="8" fill="#00D4AA" opacity="0.6"/>
    <ellipse cx="150" cy="380" rx="30" ry="12" fill="#00D4AA" opacity="0.2"/>
    <!-- USB-C -->
    <rect x="138" y="415" width="24" height="8" rx="4" fill="#2A3A4A"/>
  </g>

  <!-- URL -->
  <text x="80" y="590" font-family="system-ui, -apple-system, sans-serif" font-size="20" fill="#2A3A4A">quitly-eight.vercel.app</text>
</svg>`;

fs.writeFileSync(outputPath, svg);
console.log('OG image SVG générée:', outputPath);
