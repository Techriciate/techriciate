'use client'

import { useEffect } from 'react'
import { motion, useMotionValue, useSpring, useVelocity, useTransform } from 'framer-motion'
import type { Project } from '@/content/projects'
import { ProjectImage } from './project-image'

export function ProjectHoverPreview({ project }: { project: Project | null }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Spring physics for smooth cursor following (lag and catch-up)
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.5 })
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.5 })

  // Velocity-based tilt (2D rotation like a steering wheel)
  const velocityX = useVelocity(springX)
  
  // Moving right (positive velocity) -> tilt right (positive rotate)
  // Moving left (negative velocity) -> tilt left (negative rotate)
  const rotate = useTransform(velocityX, [-3000, 3000], [-12, 12], { clamp: true })

  useEffect(() => {
    // Only enable on desktop with fine pointers
    if (!window.matchMedia('(min-width: 1024px)').matches || !window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const handlePointerMove = (e: PointerEvent) => {
      const previewWidth = 400
      const previewHeight = 250 // Approximate height for bounding checks
      const padding = 32

      // Base offset from cursor
      let targetX = e.clientX + padding
      let targetY = e.clientY - (previewHeight / 2) // Center vertically by default
      
      // Viewport-aware boundary checks
      if (targetX + previewWidth > window.innerWidth - padding) {
        // Show on the left if hovering near the right edge
        targetX = e.clientX - previewWidth - padding
      }
      
      if (targetY + previewHeight > window.innerHeight - padding) {
        // Move up if near bottom edge
        targetY = window.innerHeight - previewHeight - padding
      }
      
      if (targetY < padding) {
        // Move down if near top edge
        targetY = padding
      }

      x.set(targetX)
      y.set(targetY)
    }

    window.addEventListener('pointermove', handlePointerMove)
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [x, y])

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[100] origin-center hidden lg:block"
      style={{
        x: springX,
        y: springY,
        rotate,
      }}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ 
        opacity: project ? 1 : 0, 
        scale: project ? 1 : 0.85 
      }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
    >
      <div className="relative w-[400px] rounded-2xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.4)] border border-white/10 will-change-transform bg-zinc-950">
        {project && (
          <ProjectImage
            src={project.heroImage}
            alt={project.title}
            slug={project.slug}
            title={project.title}
            status={project.status}
            variant="hero"
            fill
            sizes="400px"
            priority
            objectFit="cover"
            useBrowserFrame
          />
        )}
      </div>
    </motion.div>
  )
}
