'use client'

import { useRef, useMemo, useEffect, useState, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { RoundedBox, Environment, MeshTransmissionMaterial } from '@react-three/drei'
import * as THREE from 'three'

// Texture écran OLED générée via canvas HTML
function useScreenTexture() {
  return useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 256
    canvas.height = 384
    const ctx = canvas.getContext('2d')!

    // Fond noir profond
    ctx.fillStyle = '#030C14'
    ctx.fillRect(0, 0, 256, 384)

    // Ligne de séparation haut
    ctx.strokeStyle = 'rgba(0,212,170,0.3)'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(20, 60)
    ctx.lineTo(236, 60)
    ctx.stroke()

    // Logo QUITLY
    ctx.fillStyle = '#00D4AA'
    ctx.font = 'bold 22px monospace'
    ctx.textAlign = 'center'
    ctx.fillText('QUITLY', 128, 45)

    // Compteur principal
    ctx.fillStyle = '#FFFFFF'
    ctx.font = 'bold 80px monospace'
    ctx.textAlign = 'center'
    ctx.fillText('100', 128, 165)

    // Label bouffées
    ctx.fillStyle = '#8A9BAE'
    ctx.font = '16px monospace'
    ctx.letterSpacing = '2px'
    ctx.fillText('BOUFFÉES', 128, 195)

    // Ligne séparation
    ctx.strokeStyle = 'rgba(0,212,170,0.2)'
    ctx.beginPath()
    ctx.moveTo(20, 215)
    ctx.lineTo(236, 215)
    ctx.stroke()

    // Barre de progression
    ctx.fillStyle = '#0D1824'
    ctx.beginPath()
    ctx.roundRect(20, 225, 216, 12, 6)
    ctx.fill()
    ctx.fillStyle = '#00D4AA'
    ctx.beginPath()
    ctx.roundRect(20, 225, 135, 12, 6)
    ctx.fill()

    // Stats bas
    ctx.fillStyle = '#8A9BAE'
    ctx.font = '14px monospace'
    ctx.textAlign = 'left'
    ctx.fillText('REST: 400', 20, 260)
    ctx.fillStyle = '#00D4AA'
    ctx.textAlign = 'right'
    ctx.fillText('30W', 236, 260)

    // Séparateur
    ctx.strokeStyle = 'rgba(0,212,170,0.15)'
    ctx.beginPath()
    ctx.moveTo(20, 280)
    ctx.lineTo(236, 280)
    ctx.stroke()

    // LOCK
    ctx.fillStyle = '#00D4AA'
    ctx.font = 'bold 14px monospace'
    ctx.textAlign = 'center'
    ctx.fillText('🔒 LOCK™ ACTIF', 128, 310)

    // Phase
    ctx.fillStyle = '#8A9BAE'
    ctx.font = '13px monospace'
    ctx.fillText('Phase 2 / 3 — J21', 128, 340)

    // Bordure lueur teal
    ctx.strokeStyle = 'rgba(0,212,170,0.4)'
    ctx.lineWidth = 2
    ctx.strokeRect(1, 1, 254, 382)

    const texture = new THREE.CanvasTexture(canvas)
    return texture
  }, [])
}

function QuitlyDevice() {
  const groupRef = useRef<THREE.Group>(null)
  const screenTex = useScreenTexture()
  const { gl, camera } = useThree()
  const mouse = useRef({ x: 0, y: 0 })
  const isHovering = useRef(false)
  const autoAngle = useRef(0)

  useEffect(() => {
    const canvas = gl.domElement.parentElement
    if (!canvas) return

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      mouse.current.y = -((e.clientY - rect.top) / rect.height - 0.5) * 2
    }
    const onEnter = () => { isHovering.current = true }
    const onLeave = () => { isHovering.current = false }

    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mouseenter', onEnter)
    canvas.addEventListener('mouseleave', onLeave)
    return () => {
      canvas.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('mouseenter', onEnter)
      canvas.removeEventListener('mouseleave', onLeave)
    }
  }, [gl])

  useFrame((_, delta) => {
    if (!groupRef.current) return
    const g = groupRef.current

    if (isHovering.current) {
      g.rotation.y += (mouse.current.x * 0.6 - g.rotation.y) * 0.08
      g.rotation.x += (-mouse.current.y * 0.3 - g.rotation.x) * 0.08
    } else {
      autoAngle.current += delta * 0.5
      const target = Math.sin(autoAngle.current) * 0.45
      g.rotation.y += (target - g.rotation.y) * 0.04
      g.rotation.x += (0.05 - g.rotation.x) * 0.04
    }
  })

  // Matériaux
  const bodyMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#1C2C3C'),
    metalness: 0.88,
    roughness: 0.22,
    envMapIntensity: 1.2,
  }), [])

  const metalRingMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#2A3A4C'),
    metalness: 0.95,
    roughness: 0.15,
    envMapIntensity: 1.5,
  }), [])

  const buttonMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#253545'),
    metalness: 0.92,
    roughness: 0.18,
  }), [])

  const mouthMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#141E2A'),
    metalness: 0.6,
    roughness: 0.5,
  }), [])

  const tealGlowMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#00D4AA'),
    emissive: new THREE.Color('#00D4AA'),
    emissiveIntensity: 0.8,
    metalness: 0,
    roughness: 0.3,
  }), [])

  const liquidMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#00D4AA'),
    transparent: true,
    opacity: 0.55,
    emissive: new THREE.Color('#00D4AA'),
    emissiveIntensity: 0.15,
    roughness: 0.1,
    metalness: 0,
  }), [])

  return (
    <group ref={groupRef} position={[0, 0, 0]}>

      {/* ── MOUTHPIECE ── */}
      <mesh position={[0, 2.42, 0]} material={mouthMat} castShadow>
        <cylinderGeometry args={[0.13, 0.2, 0.22, 24]} />
      </mesh>
      <mesh position={[0, 2.55, 0]} material={mouthMat} castShadow>
        <cylinderGeometry args={[0.09, 0.13, 0.08, 20]} />
      </mesh>

      {/* ── ANNEAU MÉTAL HAUT ── */}
      <mesh position={[0, 2.2, 0]} material={metalRingMat} castShadow>
        <cylinderGeometry args={[0.33, 0.33, 0.1, 32]} />
      </mesh>

      {/* ── TANK VERRE (MeshTransmissionMaterial) ── */}
      <mesh position={[0, 1.72, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.9, 32, 1, true]} />
        <MeshTransmissionMaterial
          backside
          backsideThickness={0.1}
          samples={6}
          thickness={0.05}
          chromaticAberration={0.02}
          anisotropy={0.05}
          distortion={0.05}
          distortionScale={0.1}
          temporalDistortion={0.1}
          color="#aaddcc"
          attenuationDistance={0.5}
          attenuationColor="#00D4AA"
          transmission={0.95}
          roughness={0.05}
          metalness={0}
        />
      </mesh>
      {/* Disques haut/bas du tank */}
      <mesh position={[0, 2.17, 0]} material={metalRingMat}>
        <cylinderGeometry args={[0.3, 0.3, 0.02, 32]} />
      </mesh>
      <mesh position={[0, 1.27, 0]} material={metalRingMat}>
        <cylinderGeometry args={[0.3, 0.3, 0.02, 32]} />
      </mesh>

      {/* ── LIQUIDE DANS LE TANK (60% plein) ── */}
      <mesh position={[0, 1.55, 0]} material={liquidMat}>
        <cylinderGeometry args={[0.26, 0.26, 0.55, 32]} />
      </mesh>

      {/* ── COIL CENTRAL ── */}
      <mesh position={[0, 1.72, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.7, 12]} />
        <meshStandardMaterial color="#141E2A" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* ── LED TEAL HAUT ── */}
      <mesh position={[0, 2.16, 0]} material={tealGlowMat}>
        <torusGeometry args={[0.28, 0.02, 8, 32]} />
      </mesh>

      {/* ── ANNEAU MÉTAL BAS TANK ── */}
      <mesh position={[0, 1.22, 0]} material={metalRingMat} castShadow>
        <cylinderGeometry args={[0.35, 0.35, 0.12, 32]} />
      </mesh>

      {/* ── CORPS PRINCIPAL ── */}
      <RoundedBox
        args={[0.72, 2.2, 0.46]}
        radius={0.06}
        smoothness={4}
        position={[0, 0, 0]}
        material={bodyMat}
        castShadow
        receiveShadow
      />

      {/* ── ÉCRAN OLED ── */}
      <mesh position={[0, 0.3, 0.234]}>
        <planeGeometry args={[0.5, 0.72]} />
        <meshStandardMaterial
          map={screenTex}
          emissive={new THREE.Color('#00D4AA')}
          emissiveIntensity={0.08}
          roughness={0}
          metalness={0}
        />
      </mesh>

      {/* ── BOUTONS DROITE ── */}
      <mesh position={[0.385, 0.55, 0]} material={buttonMat} castShadow>
        <boxGeometry args={[0.045, 0.32, 0.12]} />
      </mesh>
      <mesh position={[0.385, 0.12, 0]} material={buttonMat} castShadow>
        <boxGeometry args={[0.045, 0.16, 0.12]} />
      </mesh>
      <mesh position={[0.385, -0.12, 0]} material={buttonMat} castShadow>
        <boxGeometry args={[0.045, 0.16, 0.12]} />
      </mesh>

      {/* ── LOQUET BREVETÉ (front) ── */}
      <mesh position={[-0.06, -0.6, 0.236]}>
        <planeGeometry args={[0.28, 0.12]} />
        <meshStandardMaterial color="#0A1520" roughness={0.5} />
      </mesh>
      <mesh position={[-0.12, -0.6, 0.238]} material={tealGlowMat}>
        <boxGeometry args={[0.06, 0.07, 0.01]} />
      </mesh>

      {/* ── GRIP TEXTURE (arrière) ── */}
      {Array.from({ length: 4 }).map((_, row) =>
        Array.from({ length: 6 }).map((_, col) => (
          <mesh key={`g-${row}-${col}`} position={[-0.22 + col * 0.09, -0.85 + row * 0.15, -0.235]}>
            <boxGeometry args={[0.05, 0.05, 0.015]} />
            <meshStandardMaterial color="#253545" metalness={0.4} roughness={0.7} />
          </mesh>
        ))
      )}

      {/* ── USB-C ── */}
      <mesh position={[0, -1.17, 0]}>
        <boxGeometry args={[0.2, 0.06, 0.05]} />
        <meshStandardMaterial color="#080E14" roughness={0.8} metalness={0.3} />
      </mesh>

      {/* ── TEAL BANDE BAS ── */}
      <mesh position={[0, -1.08, 0]} material={tealGlowMat}>
        <boxGeometry args={[0.72, 0.015, 0.46]} />
      </mesh>

      {/* ── ÉCLAIRAGE INTERNE ── */}
      <pointLight position={[0, 1.8, 0.5]} color="#00D4AA" intensity={0.6} distance={2.5} />
      <pointLight position={[0, 0.3, 0.6]} color="#00D4AA" intensity={0.25} distance={1.5} />
    </group>
  )
}

export default function CEDevice3D({ className = '' }: { className?: string }) {
  return (
    <div
      className={`relative ${className}`}
      style={{ width: 240, height: 440, cursor: 'grab' }}
    >
      <Canvas
        shadows
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1 }}
        camera={{ position: [0, 0.2, 4.2], fov: 32 }}
      >
        {/* Éclairage studio */}
        <ambientLight intensity={0.25} />
        <directionalLight
          position={[3, 5, 4]}
          intensity={1.4}
          color="#ffffff"
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[-3, 2, -2]} intensity={0.4} color="#aaccff" />
        <pointLight position={[0, 3, 3]} color="#00D4AA" intensity={0.5} distance={6} />

        <Suspense fallback={null}>
          <Environment preset="studio" />
          <QuitlyDevice />
        </Suspense>
      </Canvas>
    </div>
  )
}
