'use client'

import { useEffect, useRef, useState } from 'react'

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/·—()'

/** Mono kicker that decodes into place the first time it scrolls into view. */
export function Scramble({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const [output, setOutput] = useState(text)

  useEffect(() => {
    const node = ref.current
    if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        observer.disconnect()
        const start = performance.now()
        const run = () => {
          const progress = Math.min(1, (performance.now() - start) / 620)
          const settled = Math.floor(progress * text.length)
          setOutput(
            text
              .split('')
              .map((char, i) => {
                if (i < settled || char === ' ') return char
                return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
              })
              .join(''),
          )
          if (progress < 1) {
            frame = requestAnimationFrame(run)
            return
          }
          setOutput(text)
        }
        frame = requestAnimationFrame(run)
      },
      { threshold: 0.4 },
    )
    observer.observe(node)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [text])

  return (
    <p className={className} ref={ref}>
      <span aria-hidden="true">{output}</span>
      <span className="sr-only">{text}</span>
    </p>
  )
}
