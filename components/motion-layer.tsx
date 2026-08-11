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

export function MotionLayer({ sections }: { sections: RailSection[] }) {
  useReveal()
  return (
    <>
      <Rail sections={sections} />
    </>
  )
}
