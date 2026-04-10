'use client'

import { useRef, useMemo, useEffect, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

function useScreenTexture() {
  return useMemo(() => {
    const W = 512, H = 720
    const canvas = document.createElement('canvas')
    canvas.width = W
    canvas.height = H
    const ctx = canvas.getContext('2d')!

    // Fond noir
    ctx.fillStyle = '#020A10'
    ctx.fillRect(0, 0, W, H)

    // Bordure teal
    ctx.strokeStyle = 'rgba(0,212,170,0.6)'
    ctx.lineWidth = 3
    ctx.roundRect(4, 4, W - 8, H - 8, 12)
    ctx.stroke()

    // ── BOUFFÉES (grand, centré) ──
    ctx.fillStyle = 'rgba(0,212,170,0.12)'
    ctx.fillRect(0, 0, W, H * 0.52)

    ctx.fillStyle = '#00D4AA'
    ctx.font = 'bold 36px monospace'
    ctx.textAlign = 'center'
    ctx.shadowColor = '#00D4AA'
    ctx.shadowBlur = 14
    ctx.fillText('BOUFFÉES', W / 2, 58)
    ctx.shadowBlur = 0

    ctx.fillStyle = '#FFFFFF'
    ctx.font = 'bold 160px monospace'
    ctx.shadowColor = 'rgba(255,255,255,0.4)'
    ctx.shadowBlur = 20
    ctx.fillText('100', W / 2, 210)
    ctx.shadowBlur = 0

    ctx.fillStyle = '#8A9BAE'
    ctx.font = 'bold 28px monospace'
    ctx.fillText('/ 500 aujourd\'hui', W / 2, 258)

    // Barre progression
    ctx.fillStyle = '#0D1824'
    ctx.beginPath(); ctx.roundRect(30, 278, W - 60, 20, 10); ctx.fill()
    const g = ctx.createLinearGradient(30, 0, W - 30, 0)
    g.addColorStop(0, '#00D4AA'); g.addColorStop(1, '#00A88A')
    ctx.fillStyle = g
    ctx.beginPath(); ctx.roundRect(30, 278, (W - 60) * 0.62, 20, 10); ctx.fill()

    // Séparateur
    ctx.strokeStyle = 'rgba(0,212,170,0.2)'
    ctx.lineWidth = 1
    ctx.beginPath(); ctx.moveTo(30, 320); ctx.lineTo(W - 30, 320); ctx.stroke()

    // ── WATTS ──
    ctx.fillStyle = '#FFFFFF'
    ctx.font = 'bold 72px monospace'
    ctx.textAlign = 'left'
    ctx.shadowColor = 'rgba(255,255,255,0.2)'
    ctx.shadowBlur = 8
    ctx.fillText('30', 45, 400)
    ctx.shadowBlur = 0
    ctx.fillStyle = '#00D4AA'
    ctx.font = 'bold 30px monospace'
    ctx.fillText('W', 130, 400)
    ctx.fillStyle = '#8A9BAE'
    ctx.font = '22px monospace'
    ctx.fillText('WATTS', 45, 430)

    // Séparateur vertical
    ctx.strokeStyle = 'rgba(0,212,170,0.2)'
    ctx.lineWidth = 1
    ctx.beginPath(); ctx.moveTo(W / 2, 330); ctx.lineTo(W / 2, 460); ctx.stroke()

    // ── BATTERIE ──
    ctx.fillStyle = '#FFFFFF'
    ctx.font = 'bold 72px monospace'
    ctx.textAlign = 'right'
    ctx.shadowColor = 'rgba(255,255,255,0.2)'
    ctx.shadowBlur = 8
    ctx.fillText('72', W - 90, 400)
    ctx.shadowBlur = 0
    ctx.fillStyle = '#00D4AA'
    ctx.font = 'bold 30px monospace'
    ctx.fillText('%', W - 45, 400)
    ctx.fillStyle = '#8A9BAE'
    ctx.font = '22px monospace'
    ctx.fillText('BATT.', W - 45, 430)

    // Séparateur bas
    ctx.strokeStyle = 'rgba(0,212,170,0.2)'
    ctx.lineWidth = 1
    ctx.beginPath(); ctx.moveTo(30, 470); ctx.lineTo(W - 30, 470); ctx.stroke()

    // ── NICOTINE + PHASE ──
    ctx.fillStyle = '#8A9BAE'
    ctx.font = '24px monospace'
    ctx.textAlign = 'left'
    ctx.fillText('NICOTINE', 45, 510)
    ctx.fillStyle = '#FFFFFF'
    ctx.font = 'bold 36px monospace'
    ctx.fillText('6 mg', 45, 548)

    ctx.fillStyle = '#8A9BAE'
    ctx.font = '24px monospace'
    ctx.textAlign = 'right'
    ctx.fillText('PHASE', W - 45, 510)
    ctx.fillStyle = '#00D4AA'
    ctx.font = 'bold 36px monospace'
    ctx.fillText('2 / 3', W - 45, 548)

    // ── LOCK ──
    ctx.fillStyle = '#00D4AA'
    ctx.font = 'bold 26px monospace'
    ctx.textAlign = 'center'
    ctx.shadowColor = '#00D4AA'
    ctx.shadowBlur = 10
    ctx.fillText('⚡ LOCK™  ACTIF', W / 2, 620)
    ctx.shadowBlur = 0

    ctx.fillStyle = '#8A9BAE'
    ctx.font = '22px monospace'
    ctx.fillText('J21 · Programme J+21', W / 2, 660)

    return new THREE.CanvasTexture(canvas)
  }, [])
}

function QuitlyDevice() {
  const groupRef = useRef<THREE.Group>(null)
  const screenTex = useScreenTexture()
  const { gl } = useThree()
  const mouse = useRef({ x: 0, y: 0 })
  const isHovering = useRef(false)
  const autoAngle = useRef(0)

  useEffect(() => {
    const container = gl.domElement.parentElement
    if (!container) return
    const onMove = (e: MouseEvent) => {
      const r = container.getBoundingClientRect()
      mouse.current.x = ((e.clientX - r.left) / r.width - 0.5) * 2
      mouse.current.y = -((e.clientY - r.top) / r.height - 0.5) * 2
    }
    container.addEventListener('mousemove', onMove)
    container.addEventListener('mouseenter', () => { isHovering.current = true })
    container.addEventListener('mouseleave', () => { isHovering.current = false })
    return () => {
      container.removeEventListener('mousemove', onMove)
    }
  }, [gl])

  useFrame((_, delta) => {
    if (!groupRef.current) return
    const g = groupRef.current
    if (isHovering.current) {
      g.rotation.y += (mouse.current.x * 0.6 - g.rotation.y) * 0.09
      g.rotation.x += (-mouse.current.y * 0.28 - g.rotation.x) * 0.09
    } else {
      autoAngle.current += delta * 0.42
      g.rotation.y += (Math.sin(autoAngle.current) * 0.4 - g.rotation.y) * 0.035
      g.rotation.x += (0.06 - g.rotation.x) * 0.035
    }
  })

  // ── MATÉRIAUX ──────────────────────────────────────────────
  // Corps : gris métallique neutre
  const bodyMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#606A75'),
    metalness: 0.78,
    roughness: 0.32,
  }), [])

  // Anneaux chrome brillant
  const chromeMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#4A5A6A'),
    metalness: 0.98,
    roughness: 0.06,
  }), [])

  // Boutons
  const btnMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#2A3A4A'),
    metalness: 0.95,
    roughness: 0.12,
  }), [])

  // Verre externe tank — plus visible
  const glassOuterMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#90c8b8'),
    transparent: true,
    opacity: 0.38,
    roughness: 0.02,
    metalness: 0.1,
    side: THREE.DoubleSide,
    depthWrite: false,
  }), [])

  // Reflet interne verre
  const glassInnerMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#aad8c8'),
    transparent: true,
    opacity: 0.15,
    roughness: 0,
    metalness: 0,
    side: THREE.BackSide,
    depthWrite: false,
  }), [])

  // Liquide teal
  const liquidMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#00C898'),
    transparent: true,
    opacity: 0.6,
    emissive: new THREE.Color('#00D4AA'),
    emissiveIntensity: 0.2,
    roughness: 0.08,
    metalness: 0,
  }), [])

  // Teal lumineux
  const tealMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#00D4AA'),
    emissive: new THREE.Color('#00D4AA'),
    emissiveIntensity: 1.0,
    roughness: 0.2,
    metalness: 0,
  }), [])

  // Embout noir mat
  const mouthMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#111820'),
    metalness: 0.5,
    roughness: 0.6,
  }), [])

  // Grip texture (légèrement plus clair)
  const gripMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#253545'),
    metalness: 0.4,
    roughness: 0.65,
  }), [])

  // Écran
  const screenMat = useMemo(() => new THREE.MeshStandardMaterial({
    map: screenTex,
    emissive: new THREE.Color('#00D4AA'),
    emissiveIntensity: 0.06,
    roughness: 0,
    metalness: 0,
  }), [screenTex])

  return (
    <group ref={groupRef} position={[0, -0.1, 0]}>

      {/* ══════════════════════════════════
          EMBOUT (mouthpiece) — forme ergonomique
      ══════════════════════════════════ */}
      {/* Base évasée */}
      <mesh position={[0, 2.42, 0]} material={mouthMat} castShadow>
        <cylinderGeometry args={[0.18, 0.24, 0.1, 24]} />
      </mesh>
      {/* Col resserré */}
      <mesh position={[0, 2.54, 0]} material={mouthMat} castShadow>
        <cylinderGeometry args={[0.12, 0.18, 0.14, 24]} />
      </mesh>
      {/* Tête arrondie */}
      <mesh position={[0, 2.66, 0]} material={mouthMat} castShadow>
        <cylinderGeometry args={[0.09, 0.12, 0.1, 20]} />
      </mesh>
      {/* Sommet hémisphère */}
      <mesh position={[0, 2.73, 0]} material={mouthMat} castShadow>
        <sphereGeometry args={[0.09, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
      </mesh>

      {/* ══════════════════════════════════
          ANNEAU CHROME HAUT
      ══════════════════════════════════ */}
      <mesh position={[0, 2.33, 0]} material={chromeMat} castShadow>
        <cylinderGeometry args={[0.25, 0.25, 0.08, 32]} />
      </mesh>

      {/* ══════════════════════════════════
          TANK — cylindre unicolore teal
      ══════════════════════════════════ */}
      <mesh position={[0, 1.78, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 1.0, 32]} />
        <meshStandardMaterial
          color={new THREE.Color('#00B890')}
          metalness={0.1}
          roughness={0.25}
          transparent
          opacity={0.92}
        />
      </mesh>
      {/* Disque chrome haut */}
      <mesh position={[0, 2.29, 0]} material={chromeMat}>
        <cylinderGeometry args={[0.23, 0.23, 0.04, 32]} />
      </mesh>
      {/* Disque chrome bas */}
      <mesh position={[0, 1.27, 0]} material={chromeMat}>
        <cylinderGeometry args={[0.23, 0.23, 0.04, 32]} />
      </mesh>

      {/* LED teal anneau haut tank */}
      <mesh position={[0, 2.28, 0]} material={tealMat}>
        <torusGeometry args={[0.22, 0.014, 6, 32]} />
      </mesh>

      {/* ══════════════════════════════════
          ANNEAU CHROME BAS TANK
      ══════════════════════════════════ */}
      <mesh position={[0, 1.22, 0]} material={chromeMat} castShadow>
        <cylinderGeometry args={[0.27, 0.27, 0.1, 32]} />
      </mesh>

      {/* ══════════════════════════════════
          CORPS PRINCIPAL
          Rectangulaire arrondi comme la photo
      ══════════════════════════════════ */}
      <RoundedBox
        args={[0.58, 2.3, 0.38]}
        radius={0.11}
        smoothness={5}
        position={[0, 0, 0]}
        material={bodyMat}
        castShadow
        receiveShadow
      />

      {/* Reflet latéral gauche (chrome edge) */}
      <mesh position={[-0.29, 0, 0]}>
        <boxGeometry args={[0.008, 2.3, 0.38]} />
        <meshStandardMaterial color="#5A6A7A" metalness={1} roughness={0.05} transparent opacity={0.6} />
      </mesh>


      {/* ══════════════════════════════════
          ÉCRAN OLED — taille réduite
      ══════════════════════════════════ */}
      {/* Cadre écran */}
      <mesh position={[0, -0.3, 0.195]}>
        <boxGeometry args={[0.42, 0.76, 0.004]} />
        <meshStandardMaterial color="#030C14" roughness={0.05} metalness={0.1} />
      </mesh>
      {/* Écran */}
      <mesh position={[0, -0.3, 0.198]}>
        <planeGeometry args={[0.38, 0.72]} />
        <primitive object={screenMat} />
      </mesh>

      {/* ══════════════════════════════════
          BOUTONS DROITE (ronds comme la photo)
      ══════════════════════════════════ */}
      {/* Bouton principal */}
      <mesh position={[0.31, 0.55, 0]} rotation={[0, 0, Math.PI / 2]} material={btnMat} castShadow>
        <cylinderGeometry args={[0.048, 0.048, 0.05, 16]} />
      </mesh>
      {/* Bouton + */}
      <mesh position={[0.31, 0.22, 0]} rotation={[0, 0, Math.PI / 2]} material={btnMat} castShadow>
        <cylinderGeometry args={[0.036, 0.036, 0.045, 14]} />
      </mesh>
      {/* Bouton - */}
      <mesh position={[0.31, -0.05, 0]} rotation={[0, 0, Math.PI / 2]} material={btnMat} castShadow>
        <cylinderGeometry args={[0.036, 0.036, 0.045, 14]} />
      </mesh>


      {/* ══════════════════════════════════
          BANDE TEAL BAS
      ══════════════════════════════════ */}
      <mesh position={[0, -1.13, 0]} material={tealMat}>
        <boxGeometry args={[0.58, 0.012, 0.38]} />
      </mesh>

      {/* USB-C */}
      <mesh position={[0, -1.22, 0]}>
        <boxGeometry args={[0.2, 0.06, 0.05]} />
        <meshStandardMaterial color="#060E14" roughness={0.9} metalness={0.2} />
      </mesh>
      <mesh position={[0, -1.22, 0]}>
        <boxGeometry args={[0.14, 0.035, 0.055]} />
        <meshStandardMaterial color="#0A1520" roughness={0.8} />
      </mesh>

      {/* ══════════════════════════════════
          ÉCLAIRAGE INTERNE
      ══════════════════════════════════ */}
      <pointLight position={[0, 1.9, 0.4]} color="#00D4AA" intensity={0.7} distance={2.5} />
      <pointLight position={[0, -0.3, 0.7]} color="#00D4AA" intensity={0.25} distance={1.8} />
    </group>
  )
}

export default function CEDevice3D({ className = '' }: { className?: string }) {
  return (
    <div className={`relative ${className}`} style={{ width: 260, height: 460, cursor: 'grab' }}>
      <Canvas
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
          powerPreference: 'high-performance',
        }}
        camera={{ position: [0, 0.5, 6.5], fov: 36 }}
        dpr={Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 1.5)}
      >
        {/* Éclairage 3 points studio */}
        <ambientLight intensity={0.8} />
        {/* Key light — haut droite */}
        <directionalLight position={[2.5, 5, 4]} intensity={2.0} color="#ffffff" />
        {/* Fill light — gauche */}
        <directionalLight position={[-3, 2, 3]} intensity={1.0} color="#d0e0f0" />
        {/* Front fill */}
        <directionalLight position={[0, 0, 6]} intensity={0.8} color="#ffffff" />
        {/* Rim teal */}
        <pointLight position={[-1.5, 3, -1]} color="#00D4AA" intensity={0.7} distance={8} />

        <Suspense fallback={null}>
          <QuitlyDevice />
        </Suspense>
      </Canvas>
    </div>
  )
}
