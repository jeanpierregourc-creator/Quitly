'use client'

import { useRef, useMemo, useEffect, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

function useScreenTexture() {
  return useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 256
    canvas.height = 384
    const ctx = canvas.getContext('2d')!

    ctx.fillStyle = '#030C14'
    ctx.fillRect(0, 0, 256, 384)

    ctx.strokeStyle = 'rgba(0,212,170,0.3)'
    ctx.lineWidth = 1
    ctx.beginPath(); ctx.moveTo(20, 58); ctx.lineTo(236, 58); ctx.stroke()

    ctx.fillStyle = '#00D4AA'
    ctx.font = 'bold 20px monospace'
    ctx.textAlign = 'center'
    ctx.fillText('QUITLY', 128, 42)

    ctx.fillStyle = '#FFFFFF'
    ctx.font = 'bold 76px monospace'
    ctx.fillText('100', 128, 158)

    ctx.fillStyle = '#8A9BAE'
    ctx.font = '15px monospace'
    ctx.fillText('BOUFFÉES', 128, 188)

    ctx.strokeStyle = 'rgba(0,212,170,0.15)'
    ctx.beginPath(); ctx.moveTo(20, 208); ctx.lineTo(236, 208); ctx.stroke()

    ctx.fillStyle = '#0D1824'
    ctx.beginPath()
    ctx.roundRect(20, 218, 216, 11, 5)
    ctx.fill()
    ctx.fillStyle = '#00D4AA'
    ctx.beginPath()
    ctx.roundRect(20, 218, 135, 11, 5)
    ctx.fill()

    ctx.fillStyle = '#8A9BAE'
    ctx.font = '13px monospace'
    ctx.textAlign = 'left'
    ctx.fillText('REST: 400', 20, 252)
    ctx.fillStyle = '#00D4AA'
    ctx.textAlign = 'right'
    ctx.fillText('30W', 236, 252)

    ctx.strokeStyle = 'rgba(0,212,170,0.12)'
    ctx.beginPath(); ctx.moveTo(20, 270); ctx.lineTo(236, 270); ctx.stroke()

    ctx.fillStyle = '#00D4AA'
    ctx.font = 'bold 13px monospace'
    ctx.textAlign = 'center'
    ctx.fillText('LOCK™ ACTIF', 128, 300)

    ctx.fillStyle = '#8A9BAE'
    ctx.font = '12px monospace'
    ctx.fillText('Phase 2/3 — J21', 128, 335)

    ctx.strokeStyle = 'rgba(0,212,170,0.35)'
    ctx.lineWidth = 2
    ctx.strokeRect(1, 1, 254, 382)

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
    return () => container.removeEventListener('mousemove', onMove)
  }, [gl])

  useFrame((_, delta) => {
    if (!groupRef.current) return
    const g = groupRef.current
    if (isHovering.current) {
      g.rotation.y += (mouse.current.x * 0.55 - g.rotation.y) * 0.08
      g.rotation.x += (-mouse.current.y * 0.25 - g.rotation.x) * 0.08
    } else {
      autoAngle.current += delta * 0.45
      g.rotation.y += (Math.sin(autoAngle.current) * 0.42 - g.rotation.y) * 0.04
      g.rotation.x += (0.05 - g.rotation.x) * 0.04
    }
  })

  const bodyMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#1C2C3C', metalness: 0.85, roughness: 0.2,
  }), [])

  const ringMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#2A3A4C', metalness: 0.95, roughness: 0.12,
  }), [])

  const btnMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#253545', metalness: 0.9, roughness: 0.18,
  }), [])

  const tealMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#00D4AA', emissive: '#00D4AA', emissiveIntensity: 0.9,
    roughness: 0.3, metalness: 0,
  }), [])

  // Verre simplifié — transparent sans MeshTransmissionMaterial
  const glassMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#aaddcc', transparent: true, opacity: 0.18,
    roughness: 0.05, metalness: 0.1, side: THREE.DoubleSide,
  }), [])

  const liquidMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#00D4AA', transparent: true, opacity: 0.5,
    emissive: '#00D4AA', emissiveIntensity: 0.12,
    roughness: 0.1, metalness: 0,
  }), [])

  const screenMat = useMemo(() => new THREE.MeshStandardMaterial({
    map: screenTex, emissive: '#00D4AA', emissiveIntensity: 0.07,
    roughness: 0, metalness: 0,
  }), [screenTex])

  return (
    <group ref={groupRef}>
      {/* Mouthpiece */}
      <mesh position={[0, 2.42, 0]} material={new THREE.MeshStandardMaterial({ color: '#141E2A', metalness: 0.6, roughness: 0.5 })} castShadow>
        <cylinderGeometry args={[0.13, 0.2, 0.22, 20]} />
      </mesh>
      <mesh position={[0, 2.56, 0]} material={new THREE.MeshStandardMaterial({ color: '#141E2A', metalness: 0.6, roughness: 0.5 })}>
        <cylinderGeometry args={[0.08, 0.13, 0.1, 16]} />
      </mesh>

      {/* Anneau métal haut */}
      <mesh position={[0, 2.2, 0]} material={ringMat}>
        <cylinderGeometry args={[0.32, 0.32, 0.1, 28]} />
      </mesh>

      {/* Tank verre */}
      <mesh position={[0, 1.72, 0]} material={glassMat} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.9, 28]} />
      </mesh>

      {/* Disques haut/bas tank */}
      <mesh position={[0, 2.17, 0]} material={ringMat}>
        <cylinderGeometry args={[0.3, 0.3, 0.02, 28]} />
      </mesh>
      <mesh position={[0, 1.27, 0]} material={ringMat}>
        <cylinderGeometry args={[0.3, 0.3, 0.02, 28]} />
      </mesh>

      {/* Liquide dans le tank */}
      <mesh position={[0, 1.55, 0]} material={liquidMat}>
        <cylinderGeometry args={[0.24, 0.24, 0.52, 24]} />
      </mesh>

      {/* Coil */}
      <mesh position={[0, 1.72, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.68, 10]} />
        <meshStandardMaterial color="#141E2A" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* LED teal anneau */}
      <mesh position={[0, 2.16, 0]} material={tealMat}>
        <torusGeometry args={[0.28, 0.018, 6, 28]} />
      </mesh>

      {/* Anneau métal bas tank */}
      <mesh position={[0, 1.22, 0]} material={ringMat} castShadow>
        <cylinderGeometry args={[0.34, 0.34, 0.12, 28]} />
      </mesh>

      {/* Corps principal arrondi */}
      <RoundedBox args={[0.72, 2.2, 0.46]} radius={0.055} smoothness={3}
        position={[0, 0, 0]} material={bodyMat} castShadow receiveShadow />

      {/* Écran OLED */}
      <mesh position={[0, 0.28, 0.234]}>
        <planeGeometry args={[0.5, 0.72]} />
        <primitive object={screenMat} />
      </mesh>

      {/* Boutons droite */}
      <mesh position={[0.385, 0.55, 0]} material={btnMat} castShadow>
        <boxGeometry args={[0.044, 0.3, 0.11]} />
      </mesh>
      <mesh position={[0.385, 0.12, 0]} material={btnMat} castShadow>
        <boxGeometry args={[0.044, 0.15, 0.11]} />
      </mesh>
      <mesh position={[0.385, -0.1, 0]} material={btnMat} castShadow>
        <boxGeometry args={[0.044, 0.15, 0.11]} />
      </mesh>

      {/* Bande teal bas */}
      <mesh position={[0, -1.08, 0]} material={tealMat}>
        <boxGeometry args={[0.72, 0.014, 0.46]} />
      </mesh>

      {/* USB-C */}
      <mesh position={[0, -1.17, 0]}>
        <boxGeometry args={[0.18, 0.055, 0.04]} />
        <meshStandardMaterial color="#080E14" roughness={0.8} />
      </mesh>

      {/* Lumières internes */}
      <pointLight position={[0, 1.8, 0.5]} color="#00D4AA" intensity={0.5} distance={2.5} />
      <pointLight position={[0, 0.3, 0.6]} color="#00D4AA" intensity={0.2} distance={1.5} />
    </group>
  )
}

export default function CEDevice3D({ className = '' }: { className?: string }) {
  return (
    <div className={`relative ${className}`} style={{ width: 240, height: 440, cursor: 'grab' }}>
      <Canvas
        shadows={false}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
          powerPreference: 'high-performance',
        }}
        camera={{ position: [0, 0.2, 4.2], fov: 32 }}
        dpr={Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 1.5)}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[3, 5, 4]} intensity={1.4} color="#ffffff" />
        <directionalLight position={[-2, 2, -2]} intensity={0.35} color="#aaccff" />
        <pointLight position={[0, 3, 3]} color="#00D4AA" intensity={0.45} distance={6} />

        <Suspense fallback={null}>
          <QuitlyDevice />
        </Suspense>
      </Canvas>
    </div>
  )
}
