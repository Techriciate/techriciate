'use client'

import { useState, useEffect } from 'react'

import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

import { ProjectImage } from './project-image'

export function ProjectGallery({ images, title, slug, status }: { images: string[]; title: string; slug: string; status: string }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return
      if (e.key === 'Escape') setSelectedIndex(null)
      if (e.key === 'ArrowRight') {
        setSelectedIndex((prev) => (prev !== null ? (prev + 1) % images.length : null))
      }
      if (e.key === 'ArrowLeft') {
        setSelectedIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null))
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedIndex, images.length])

  // Prevent scrolling when lightbox is open
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [selectedIndex])

  return (
    <>
      <div className="columns-1 md:columns-2 gap-4 space-y-4 mt-8">
        {images.length > 0 ? (
          images.map((src, index) => (
            <motion.div
              key={src}
              className="relative rounded-xl overflow-hidden cursor-pointer bg-zinc-900 border border-white/5 break-inside-avoid"
              whileHover={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              onClick={() => setSelectedIndex(index)}
            >
              <ProjectImage
                src={src}
                alt={`${title} screenshot ${index + 1}`}
                slug={slug}
                title={title}
                status={status}
                variant="card"
                sizes="(max-width: 768px) 100vw, 50vw"
                objectFit="contain"
              />
            </motion.div>
          ))
        ) : (
          <div className="relative rounded-xl overflow-hidden bg-zinc-900 border border-white/5 break-inside-avoid w-full aspect-[4/3]">
            <ProjectImage
              src={null}
              alt={title}
              slug={slug}
              title={title}
              status={status}
              variant="card"
              fill
            />
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center backdrop-blur-sm"
            onClick={() => setSelectedIndex(null)}
          >
            <button
              className="absolute top-6 right-6 p-2 text-white/50 hover:text-white transition-colors"
              onClick={() => setSelectedIndex(null)}
              aria-label="Close gallery"
            >
              <X className="w-8 h-8" />
            </button>

            <button
              className="absolute left-6 p-4 text-white/50 hover:text-white transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                setSelectedIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null))
              }}
              aria-label="Previous image"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>

            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="relative w-full max-w-[90vw] h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <ProjectImage
                src={images[selectedIndex]}
                alt={`${title} screenshot ${selectedIndex + 1}`}
                slug={slug}
                title={title}
                status={status}
                variant="hero"
                fill
                sizes="90vw"
                priority
                objectFit="contain"
              />
            </motion.div>

            <button
              className="absolute right-6 p-4 text-white/50 hover:text-white transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                setSelectedIndex((prev) => (prev !== null ? (prev + 1) % images.length : null))
              }}
              aria-label="Next image"
            >
              <ChevronRight className="w-10 h-10" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
