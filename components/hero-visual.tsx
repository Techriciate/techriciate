'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import { MarkSvg } from './mark-svg'

const HeroScene = dynamic(() => import('./hero-scene'), { ssr: false })

function hasWebgl() {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(canvas.getContext('webgl2') ?? canvas.getContext('webgl'))
  } catch {
    return false
  }
}

export function HeroVisual() {
  const wrapper = useRef<HTMLDivElement>(null)
  const [enable3d, setEnable3d] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const wide = window.matchMedia('(min-width: 1024px)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const capable = (navigator.hardwareConcurrency ?? 4) >= 2
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnable3d(wide && !reduced && capable && hasWebgl())
    if (!wide) return
    const hero = wrapper.current?.closest<HTMLElement>('.hero')
    if (!hero) return
    const move = (event: PointerEvent) => {
      const rect = hero.getBoundingClientRect()
      hero.style.setProperty('--gx', `${((event.clientX - rect.left) / rect.width) * 100}%`)
      hero.style.setProperty('--gy', `${((event.clientY - rect.top) / rect.height) * 100}%`)
    }
    hero.addEventListener('pointermove', move, { passive: true })
    return () => hero.removeEventListener('pointermove', move)
  }, [])

  return (
    <div className={ready ? 'hero-mark is-ready' : 'hero-mark'} ref={wrapper}>
      <span className="tick tl" />
      <span className="tick tr" />
      <span className="tick bl" />
      <span className="tick br" />
      <div className="hero-fallback">
        <MarkSvg draw gradient label="Techriciate mark: two code brackets with a rising growth arrow" />
      </div>
      {enable3d ? <HeroScene onReady={() => setReady(true)} /> : null}
    </div>
  )
}
