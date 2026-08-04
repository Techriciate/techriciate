'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

type Piece = {
  points: [number, number][]
  offset: [number, number, number]
  rotation: number
  phase: number
}

/**
 * Same geometry as the flat mark in mark-svg.tsx, mapped from that 220x200 grid
 * into world units so the 3D hero and the 2D fallback read as one identity.
 */
const PIECES: Piece[] = [
  {
    points: [
      [-1.09, 1.25],
      [-2.32, 0.02],
      [-1.09, -1.2],
      [-0.73, -0.84],
      [-1.59, 0.02],
      [-0.73, 0.89],
    ],
    offset: [0, 0, -0.16],
    rotation: 0,
    phase: 0,
  },
  {
    points: [
      [1.09, 1.25],
      [2.32, 0.02],
      [1.09, -1.2],
      [0.73, -0.84],
      [1.59, 0.02],
      [0.73, 0.89],
    ],
    offset: [0, 0, -0.16],
    rotation: 0,
    phase: 1.1,
  },
  {
    points: [
      [-0.25, -1.61],
      [-0.25, 0.52],
      [-0.45, 0.52],
      [0, 1.61],
      [0.45, 0.52],
      [0.25, 0.52],
      [0.25, -1.61],
    ],
    offset: [0, 0, 0.3],
    rotation: 0,
    phase: 2,
  },
]

function useGeometries() {
  return useMemo(
    () =>
      PIECES.map(({ points }) => {
        const shape = new THREE.Shape()
        points.forEach(([x, y], i) => (i === 0 ? shape.moveTo(x, y) : shape.lineTo(x, y)))
        shape.closePath()
        const geometry = new THREE.ExtrudeGeometry(shape, {
          depth: 0.34,
          bevelEnabled: true,
          bevelThickness: 0.03,
          bevelSize: 0.03,
          bevelSegments: 2,
        })
        geometry.translate(0, 0, -0.17)
        return geometry
      }),
    [],
  )
}

function Mark({ animate }: { animate: boolean }) {
  const group = useRef<THREE.Group>(null)
  const arrow = useRef<THREE.Mesh>(null)
  const geometries = useGeometries()
  const { pointer } = useThree()

  useEffect(() => () => geometries.forEach((geometry) => geometry.dispose()), [geometries])

  const elapsed = useRef(0)

  useFrame((_, delta) => {
    if (!group.current) return
    if (animate) elapsed.current += delta
    const t = animate ? elapsed.current : 0
    group.current.rotation.y = Math.sin(t * 0.3) * 0.12 + pointer.x * 0.25
    group.current.rotation.x = -pointer.y * 0.12
    group.current.position.y = Math.sin(t * 0.8) * 0.04
    if (arrow.current) arrow.current.position.y = PIECES[2].offset[1] + Math.sin(t * 0.8 + 2) * 0.06
  })

  return (
    <group ref={group} scale={0.8}>
      {PIECES.map((piece, i) => (
        <mesh
          key={i}
          ref={i === 2 ? arrow : undefined}
          geometry={geometries[i]}
          position={piece.offset}
          rotation={[0, 0, piece.rotation]}
          castShadow={false}
        >
          <meshPhysicalMaterial
            color={i === 2 ? '#4FC3E2' : '#1E5F84'}
            metalness={0.72}
            roughness={0.26}
            clearcoat={0.7}
            clearcoatRoughness={0.18}
          />
        </mesh>
      ))}
    </group>
  )
}

export default function HeroScene({ onReady }: { onReady?: () => void }) {
  const wrapper = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(true)
  const [visible, setVisible] = useState(true)
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    const node = wrapper.current
    if (!node) return
    const observer = new IntersectionObserver((entries) => setInView(entries.some((entry) => entry.isIntersecting)), { threshold: 0.05 })
    observer.observe(node)
    const onVisibility = () => setVisible(document.visibilityState === 'visible')
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  const animate = inView && visible && !reduced

  return (
    <div className="hero-canvas" ref={wrapper}>
      <Canvas
        dpr={[1, 1.75]}
        frameloop={animate ? 'always' : 'demand'}
        camera={{ position: [0, 0, 6.4], fov: 38 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        onCreated={() => onReady?.()}
      >
        <ambientLight color="#0B2239" intensity={0.4} />
        <directionalLight color="#FFFFFF" intensity={1.2} position={[2.5, 3, 6]} />
        <directionalLight color="#7FD4E8" intensity={2} position={[4.5, 5, 1.5]} />
        <Mark animate={animate} />
      </Canvas>
    </div>
  )
}
