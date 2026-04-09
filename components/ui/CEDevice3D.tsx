'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function CEDevice3D({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springX = useSpring(x, { stiffness: 80, damping: 18 })
  const springY = useSpring(y, { stiffness: 80, damping: 18 })

  const rotateY = useTransform(springX, [-0.5, 0.5], [-18, 18])
  const rotateX = useTransform(springY, [-0.5, 0.5], [10, -10])
  const glowX = useTransform(springX, [-0.5, 0.5], [-30, 30])
  const glowOpacity = useTransform(springX, (v) => 0.25 + Math.abs(v) * 0.5)

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <div
      ref={ref}
      className={`relative cursor-pointer select-none ${className}`}
      style={{ perspective: 900 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative flex flex-col items-center"
      >
        {/* Halo teal dynamique */}
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0,212,170,0.25), transparent 70%)',
            filter: 'blur(30px)',
            x: glowX,
            opacity: glowOpacity,
            zIndex: 0,
          }}
        />

        {/* Image device — crop côté gauche uniquement */}
        <div
          className="relative overflow-hidden z-10"
          style={{ width: 240, height: 420 }}
        >
          <Image
            src="/images/device-3d.jpg"
            alt="Quitly — Cigarette électronique connectée"
            width={960}
            height={540}
            style={{
              objectFit: 'cover',
              objectPosition: 'left center',
              width: '200%',
              height: '100%',
              maxWidth: 'none',
            }}
            priority
          />
        </div>

        {/* Ombre au sol */}
        <motion.div
          style={{
            width: 100,
            height: 14,
            background: 'radial-gradient(ellipse, rgba(0,212,170,0.2), transparent)',
            filter: 'blur(10px)',
            x: glowX,
          }}
        />
      </motion.div>
    </div>
  )
}
