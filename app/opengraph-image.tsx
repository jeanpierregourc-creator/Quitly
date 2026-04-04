import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Quitly — La dernière cigarette que vous utiliserez.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          backgroundColor: '#080E14',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        {/* Barre teal gauche */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '6px', height: '630px', backgroundColor: '#00D4AA' }} />

        {/* Fond gradient */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'radial-gradient(ellipse at 20% 50%, rgba(0,212,170,0.12) 0%, transparent 60%)',
        }} />

        {/* Logo */}
        <div style={{ color: '#00D4AA', fontSize: '48px', fontWeight: 800, letterSpacing: '6px', marginBottom: '32px', display: 'flex' }}>
          QUITLY
        </div>

        {/* Tagline */}
        <div style={{ color: '#E8EDF2', fontSize: '56px', fontWeight: 700, lineHeight: 1.1, marginBottom: '12px', display: 'flex' }}>
          La dernière cigarette
        </div>
        <div style={{ color: '#00D4AA', fontSize: '56px', fontWeight: 700, lineHeight: 1.1, marginBottom: '32px', display: 'flex' }}>
          que vous utiliserez.
        </div>

        {/* Description */}
        <div style={{ color: '#8A9BAE', fontSize: '24px', marginBottom: '48px', display: 'flex' }}>
          Loquet breveté · IA comportementale · Programme 6 mois
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: '60px' }}>
          {[
            { value: '6M', label: 'fumeurs en France' },
            { value: '80%', label: "d'échecs classiques" },
            { value: '130 €', label: 'kit complet' },
          ].map((s) => (
            <div key={s.value} style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ color: '#00D4AA', fontSize: '40px', fontWeight: 800 }}>{s.value}</span>
              <span style={{ color: '#8A9BAE', fontSize: '16px', marginTop: '4px' }}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* URL bas de page */}
        <div style={{ position: 'absolute', bottom: '40px', left: '80px', color: '#2A3A4A', fontSize: '18px', display: 'flex' }}>
          quitly-eight.vercel.app
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
