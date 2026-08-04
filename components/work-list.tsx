'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { site } from '@/content/site'
import { WorkCover } from './work-cover'

export function WorkList() {
  const [hover, setHover] = useState<string | null>(null)
  const [floating, setFloating] = useState(false)
  const float = useRef<HTMLDivElement>(null)
  const list = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = list.current
    if (!node) return
    if (!window.matchMedia('(min-width: 1024px)').matches || !window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFloating(true)
    const target = { x: 0, y: 0 }
    const eased = { x: 0, y: 0 }
    let frame = 0
    const move = (event: PointerEvent) => {
      target.x = event.clientX
      target.y = event.clientY
    }
    const tick = () => {
      eased.x += (target.x - eased.x) * 0.14
      eased.y += (target.y - eased.y) * 0.14
      const tilt = Math.max(-4, Math.min(4, (target.x - eased.x) * 0.25))
      if (float.current) float.current.style.transform = `translate3d(${eased.x + 32}px,${eased.y - 130}px,0) rotate(${tilt}deg)`
      frame = requestAnimationFrame(tick)
    }
    node.addEventListener('pointermove', move, { passive: true })
    frame = requestAnimationFrame(tick)
    return () => {
      node.removeEventListener('pointermove', move)
      cancelAnimationFrame(frame)
    }
  }, [])

  const active = site.projects.find((project) => project.slug === hover)

  return (
    <div className="work-list" ref={list} onPointerLeave={() => setHover(null)}>
      {site.projects.map((project) => (
        <Link
          className="work-row"
          href={`/work/${project.slug}`}
          key={project.slug}
          data-reveal
          data-cursor="VIEW CASE"
          onPointerEnter={() => setHover(project.slug)}
          onFocus={() => setHover(project.slug)}
        >
          <span className="project-index">{project.index}</span>
          <div className="row-thumb">
            <WorkCover slug={project.slug} name={project.name} status={project.status} variant="thumb" />
          </div>
          <div className="row-copy">
            <h3>{project.name}</h3>
            <p>{project.thesis}</p>
          </div>
          <div className="project-meta">
            <span className="chip">{project.industry}</span>
            <span className="status">{project.status}</span>
          </div>
          <ArrowUpRight className="row-arrow" />
        </Link>
      ))}
      {floating ? (
        <div className={active ? 'work-float is-on' : 'work-float'} ref={float} aria-hidden="true">
          {active ? <WorkCover slug={active.slug} name={active.name} status={active.status} /> : null}
        </div>
      ) : null}
    </div>
  )
}
