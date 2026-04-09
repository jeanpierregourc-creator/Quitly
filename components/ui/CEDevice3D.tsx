'use client'

import { useRef, useMemo, useEffect, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

function useScreenTexture() {
  return useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 300
    canvas.height = 420
    const ctx = canvas.getContext('2d')!

    // Fond OLED noir profond
    ctx.fillStyle = '#020A10'
    ctx.fillRect(0, 0, 300, 420)

    // Bordure teal subtile
    ctx.strokeStyle = 'rgba(0,212,170,0.5)'
    ctx.lineWidth = 2
    ctx.roundRect(3, 3, 294, 414, 8)
    ctx.stroke()

    // Ligne séparation haut
    ctx.strokeStyle = 'rgba(0,212,170,0.25)'
    ctx.lineWidth = 1
    ctx.beginPath(); ctx.moveTo(16, 68); ctx.lineTo(284, 68); ctx.stroke()

    // Logo
    ctx.fillStyle = '#00D4AA'
    ctx.font = 'bold 24px monospace'
    ctx.textAlign = 'center'
    ctx.shadowColor = '#00D4AA'
    ctx.shadowBlur = 8
    ctx.fillText('QUITLY', 150, 48)
    ctx.shadowBlur = 0

    // Grand chiffre
    ctx.fillStyle = '#FFFFFF'
    ctx.font = 'bold 96px monospace'
    ctx.shadowColor = 'rgba(255,255,255,0.3)'
    ctx.shadowBlur = 12
    ctx.fillText('100', 150, 178)
    ctx.shadowBlur = 0

    // Label
    ctx.fillStyle = '#8A9BAE'
    ctx.font = '500 17px system-ui'
    ctx.letterSpacing = '3px'
    ctx.fillText('BOUFFÉES', 150, 208)

    // Séparateur
    ctx.strokeStyle = 'rgba(0,212,170,0.15)'
    ctx.beginPath(); ctx.moveTo(16, 228); ctx.lineTo(284, 228); ctx.stroke()

    // Barre progression background
    ctx.fillStyle = '#0D1824'
    ctx.beginPath(); ctx.roundRect(16, 240, 268, 14, 7); ctx.fill()
    // Barre progression fill
    const grad = ctx.createLinearGradient(16, 0, 284, 0)
    grad.addColorStop(0, '#00D4AA')
    grad.addColorStop(1, '#00A88A')
    ctx.fillStyle = grad
    ctx.beginPath(); ctx.roundRect(16, 240, 168, 14, 7); ctx.fill()

    // Stats ligne
    ctx.fillStyle = '#8A9BAE'
    ctx.font = '14px monospace'
    ctx.textAlign = 'left'
    ctx.fillText('REST: 400', 16, 278)
    ctx.fillStyle = '#00D4AA'
    ctx.textAlign = 'right'
    ctx.fillText('30W', 284, 278)

    // Séparateur
    ctx.strokeStyle = 'rgba(0,212,170,0.12)'
    ctx.beginPath(); ctx.moveTo(16, 296); ctx.lineTo(284, 296); ctx.stroke()

    // Lock
    ctx.fillStyle = '#00D4AA'
    ctx.font = 'bold 15px monospace'
    ctx.textAlign = 'center'
    ctx.shadowColor = '#00D4AA'
    ctx.shadowBlur = 6
    ctx.fillText('⚡ LOCK™ ACTIF', 150, 330)
    ctx.shadowBlur = 0

    // Phase
    ctx.fillStyle = '#8A9BAE'
    ctx.font = '13px monospace'
    ctx.fillText('Phase 2/3  ·  J21', 150, 365)

    // Batterie
    ctx.fillStyle = '#2A3A4A'
    ctx.beginPath(); ctx.roundRect(100, 380, 100, 22, 4); ctx.fill()
    ctx.fillStyle = '#00D4AA'
    ctx.font = '12px monospace'
    ctx.fillText('72% ⚡', 150, 396)

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
  // Corps principal : dark chrome
  const bodyMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#1A2530'),
    metalness: 0.92,
    roughness: 0.18,
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

  // Verre externe tank
  const glassOuterMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#c8e8d8'),
    transparent: true,
    opacity: 0.22,
    roughness: 0.02,
    metalness: 0.05,
    side: THREE.DoubleSide,
    depthWrite: false,
  }), [])

  // Reflet interne verre (effet depth)
  const glassInnerMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#aad8c8'),
    transparent: true,
    opacity: 0.08,
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
          MOUTHPIECE
      ══════════════════════════════════ */}
      <mesh position={[0, 2.58, 0]} material={mouthMat} castShadow>
        <cylinderGeometry args={[0.08, 0.14, 0.12, 18]} />
      </mesh>
      <mesh position={[0, 2.48, 0]} material={mouthMat} castShadow>
        <cylinderGeometry args={[0.14, 0.2, 0.16, 20]} />
      </mesh>

      {/* ══════════════════════════════════
          ANNEAU CHROME HAUT
      ══════════════════════════════════ */}
      <mesh position={[0, 2.33, 0]} material={chromeMat} castShadow>
        <cylinderGeometry args={[0.33, 0.33, 0.08, 32]} />
      </mesh>

      {/* ══════════════════════════════════
          TANK VERRE — double paroi
      ══════════════════════════════════ */}
      {/* Paroi externe */}
      <mesh position={[0, 1.78, 0]} material={glassOuterMat}>
        <cylinderGeometry args={[0.3, 0.3, 1.0, 32]} />
      </mesh>
      {/* Paroi interne (effet profondeur) */}
      <mesh position={[0, 1.78, 0]} material={glassInnerMat}>
        <cylinderGeometry args={[0.28, 0.28, 0.96, 32]} />
      </mesh>

      {/* Disque haut tank */}
      <mesh position={[0, 2.29, 0]} material={chromeMat}>
        <cylinderGeometry args={[0.31, 0.31, 0.03, 32]} />
      </mesh>
      {/* Disque bas tank */}
      <mesh position={[0, 1.28, 0]} material={chromeMat}>
        <cylinderGeometry args={[0.31, 0.31, 0.03, 32]} />
      </mesh>

      {/* Liquide (60% plein) */}
      <mesh position={[0, 1.6, 0]} material={liquidMat}>
        <cylinderGeometry args={[0.23, 0.23, 0.6, 24]} />
      </mesh>

      {/* Coil central */}
      <mesh position={[0, 1.78, 0]}>
        <cylinderGeometry args={[0.055, 0.055, 0.75, 12]} />
        <meshStandardMaterial color="#0A1520" metalness={0.8} roughness={0.25} />
      </mesh>
      {/* Spires coil */}
      {[0,1,2,3,4,5,6].map(i => (
        <mesh key={i} position={[0, 1.44 + i * 0.1, 0]}>
          <torusGeometry args={[0.055, 0.008, 6, 16]} />
          <meshStandardMaterial color="#3A4A3A" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}

      {/* LED teal anneau haut tank */}
      <mesh position={[0, 2.28, 0]} material={tealMat}>
        <torusGeometry args={[0.29, 0.016, 6, 32]} />
      </mesh>

      {/* ══════════════════════════════════
          ANNEAU CHROME BAS TANK
      ══════════════════════════════════ */}
      <mesh position={[0, 1.22, 0]} material={chromeMat} castShadow>
        <cylinderGeometry args={[0.37, 0.37, 0.1, 32]} />
      </mesh>

      {/* ══════════════════════════════════
          CORPS PRINCIPAL
          Rectangulaire arrondi comme la photo
      ══════════════════════════════════ */}
      <RoundedBox
        args={[0.76, 2.3, 0.48]}
        radius={0.055}
        smoothness={4}
        position={[0, 0, 0]}
        material={bodyMat}
        castShadow
        receiveShadow
      />

      {/* Reflet latéral gauche (chrome edge) */}
      <mesh position={[-0.38, 0, 0]}>
        <boxGeometry args={[0.008, 2.3, 0.48]} />
        <meshStandardMaterial color="#5A6A7A" metalness={1} roughness={0.05} transparent opacity={0.6} />
      </mesh>

      {/* Zone grip haut corps (texture horizontale) */}
      {Array.from({ length: 10 }).map((_, i) => (
        <mesh key={`grip-${i}`} position={[0, 0.82 - i * 0.085, 0.245]}>
          <boxGeometry args={[0.64, 0.03, 0.005]} />
          <primitive object={gripMat} />
        </mesh>
      ))}

      {/* ══════════════════════════════════
          ÉCRAN OLED
      ══════════════════════════════════ */}
      {/* Cadre écran */}
      <mesh position={[0, -0.38, 0.245]}>
        <boxGeometry args={[0.56, 1.32, 0.004]} />
        <meshStandardMaterial color="#030C14" roughness={0.05} metalness={0.1} />
      </mesh>
      {/* Écran */}
      <mesh position={[0, -0.38, 0.248]}>
        <planeGeometry args={[0.52, 1.26]} />
        <primitive object={screenMat} />
      </mesh>

      {/* ══════════════════════════════════
          BOUTONS DROITE (ronds comme la photo)
      ══════════════════════════════════ */}
      {/* Bouton principal */}
      <mesh position={[0.4, 0.55, 0]} rotation={[0, 0, Math.PI / 2]} material={btnMat} castShadow>
        <cylinderGeometry args={[0.055, 0.055, 0.055, 16]} />
      </mesh>
      {/* Bouton + */}
      <mesh position={[0.4, 0.22, 0]} rotation={[0, 0, Math.PI / 2]} material={btnMat} castShadow>
        <cylinderGeometry args={[0.042, 0.042, 0.05, 14]} />
      </mesh>
      {/* Bouton - */}
      <mesh position={[0.4, -0.05, 0]} rotation={[0, 0, Math.PI / 2]} material={btnMat} castShadow>
        <cylinderGeometry args={[0.042, 0.042, 0.05, 14]} />
      </mesh>

      {/* ══════════════════════════════════
          LOQUET (front, zone distincte)
      ══════════════════════════════════ */}
      <mesh position={[0, 0.72, 0.248]}>
        <boxGeometry args={[0.52, 0.08, 0.002]} />
        <meshStandardMaterial color="#00D4AA" emissive="#00D4AA" emissiveIntensity={0.5} transparent opacity={0.7} />
      </mesh>

      {/* ══════════════════════════════════
          BANDE TEAL BAS
      ══════════════════════════════════ */}
      <mesh position={[0, -1.13, 0]} material={tealMat}>
        <boxGeometry args={[0.76, 0.012, 0.48]} />
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
        camera={{ position: [0, 0.3, 4.5], fov: 30 }}
        dpr={Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 1.5)}
      >
        {/* Éclairage 3 points studio */}
        <ambientLight intensity={0.2} />
        {/* Key light — haut droite */}
        <directionalLight position={[2.5, 5, 3.5]} intensity={1.6} color="#ffffff" />
        {/* Fill light — gauche */}
        <directionalLight position={[-3, 1, 2]} intensity={0.4} color="#aac8e0" />
        {/* Back light — derrière */}
        <directionalLight position={[0, -2, -3]} intensity={0.3} color="#004433" />
        {/* Rim light teal */}
        <pointLight position={[-1.5, 3, -1]} color="#00D4AA" intensity={0.5} distance={6} />

        <Suspense fallback={null}>
          <QuitlyDevice />
        </Suspense>
      </Canvas>
    </div>
  )
}
