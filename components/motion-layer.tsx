'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

export type RailSection = { id: string; label: string }

function reducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function saveData() {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
  return Boolean(connection?.saveData)
}

/** Adds `.js` to <html> and reveals every [data-reveal] block once it enters the viewport. */
function useReveal() {
  useEffect(() => {
    const root = document.documentElement
    root.classList.add('js')
    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    if (reducedMotion()) {
      targets.forEach((el) => el.classList.add('is-in'))
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-in')
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.2, rootMargin: '0px 0px -8% 0px' },
    )
    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

/** Dot + hairline ring cursor. Desktop pointers only; native cursor otherwise. */
function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const [label, setLabel] = useState('')

  useEffect(() => {
    if (reducedMotion() || !window.matchMedia('(pointer: fine)').matches) return
    const root = document.documentElement
    root.classList.add('has-cursor')
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const eased = { x: target.x, y: target.y }
    let frame = 0

    function move(event: PointerEvent) {
      target.x = event.clientX
      target.y = event.clientY
      const hit = (event.target as Element | null)?.closest?.('[data-cursor]')
      const next = hit?.getAttribute('data-cursor') ?? ''
      setLabel((current) => (current === next ? current : next))
      const link = (event.target as Element | null)?.closest?.('a,button,summary,input,select,textarea')
      ring.current?.classList.toggle('is-link', Boolean(link))
    }

    function tick() {
      eased.x += (target.x - eased.x) * 0.12
      eased.y += (target.y - eased.y) * 0.12
      if (dot.current) dot.current.style.transform = `translate3d(${target.x}px,${target.y}px,0) translate(-50%,-50%)`
      if (ring.current) ring.current.style.transform = `translate3d(${eased.x}px,${eased.y}px,0) translate(-50%,-50%)`
      frame = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', move, { passive: true })
    frame = requestAnimationFrame(tick)
    return () => {
      root.classList.remove('has-cursor')
      window.removeEventListener('pointermove', move)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className="cursor" aria-hidden="true">
      <div className="cursor-dot" ref={dot} />
      <div className={label ? 'cursor-ring is-pill' : 'cursor-ring'} ref={ring}>
        <span>{label}</span>
      </div>
    </div>
  )
}

/** Right-hand section rail (>=1024px) with mono labels and an active dot. */
function Rail({ sections }: { sections: RailSection[] }) {
  const [active, setActive] = useState(sections[0]?.id ?? '')

  useEffect(() => {
    const nodes = sections.map(({ id }) => document.getElementById(id)).filter((el): el is HTMLElement => Boolean(el))
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { threshold: [0.15, 0.4, 0.7], rootMargin: '-20% 0px -40% 0px' },
    )
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [sections])

  return (
    <nav className="rail" aria-label="Section navigation">
      {sections.map(({ id, label }) => (
        <a key={id} href={`#${id}`} className={active === id ? 'is-active' : undefined}>
          <span className="rail-label">{label}</span>
          <span className="rail-dot" />
        </a>
      ))}
    </nav>
  )
}

/** Paper curtain with a stroke-drawn mark and a mono counter. Skipped on revisit. */
function Preloader() {
  const [phase, setPhase] = useState<'hidden' | 'run' | 'lift'>('run')
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    const seen = sessionStorage.getItem('tc-preloaded')
    if (seen || reducedMotion() || saveData()) {
      setPhase('hidden')
      document.documentElement.classList.remove('is-loading')
      return
    }
    
    sessionStorage.setItem('tc-preloaded', '1')
    document.documentElement.classList.add('is-loading')

    let frame = 0
    let progress = 0
    let isLoaded = false

    Promise.all([
      document.fonts ? document.fonts.ready : Promise.resolve()
    ]).then(() => {
      if (document.readyState === 'complete') {
        isLoaded = true
      } else {
        window.addEventListener('load', () => { isLoaded = true })
      }
    })

    const start = performance.now()
    const step = () => {
      const elapsed = performance.now() - start
      
      if (!isLoaded && progress < 0.85) {
        progress = elapsed / 1500 // Ease up to 85% over 1.5s
        progress = Math.min(progress, 0.85)
      } else if (isLoaded) {
        progress += 0.04 // Quickly finish once loaded
      }
      
      progress = Math.min(progress, 1)
      setPercent(Math.round(progress * 100))

      if (progress < 1) {
        frame = requestAnimationFrame(step)
      } else {
        setPhase('lift')
        document.documentElement.classList.remove('is-loading')
        window.setTimeout(() => setPhase('hidden'), 700)
      }
    }
    frame = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(frame)
      document.documentElement.classList.remove('is-loading')
    }
  }, [])

  if (phase === 'hidden') return null
  return (
    <div className={phase === 'lift' ? 'preloader is-lift' : 'preloader'} role="status" aria-live="polite">
      <Image src="/company-logo.png" width={220} height={117} alt="Techriciate" className="preloader-mark" priority />
      <p className="preloader-count">{`${String(percent).padStart(3, '0')}%`}</p>
      <span className="sr-only">Loading Techriciate</span>
    </div>
  )
}

export function MotionLayer({ sections }: { sections: RailSection[] }) {
  useReveal()
  return (
    <>
      <Preloader />
      <Cursor />
      <Rail sections={sections} />
    </>
  )
}
