'use client'

import dynamic from 'next/dynamic'

const CEDevice3D = dynamic(() => import('./CEDevice3D'), {
  ssr: false,
  loading: () => (
    <div style={{ width: 240, height: 440, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        width: 80,
        height: 80,
        borderRadius: '50%',
        border: '2px solid rgba(0,212,170,0.3)',
        borderTop: '2px solid #00D4AA',
        animation: 'spin 1s linear infinite',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  ),
})

export default function CEDevice3DWrapper({ className = '' }: { className?: string }) {
  return <CEDevice3D className={className} />
}
