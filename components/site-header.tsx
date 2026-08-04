'use client'

import Image from 'next/image'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { site } from '@/content/site'

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [shrink, setShrink] = useState(false)
  const [active, setActive] = useState('')
  const header = useRef<HTMLElement>(null)

  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight
        const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0
        header.current?.style.setProperty('--progress', String(progress))
        setShrink(window.scrollY > 40)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    const ids = site.nav.map((item) => item.toLowerCase())
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-25% 0px -45% 0px', threshold: [0.1, 0.35, 0.6] },
    )
    ids.forEach((id) => {
      const node = document.getElementById(id)
      if (node) observer.observe(node)
    })

    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', open)
    
    if (open) {
      // Lock scroll position robustly for iOS Safari
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1)
      }
    }

    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className={shrink ? 'site-header is-shrink' : 'site-header'} ref={header}>
      <a className="brand" href="#top" aria-label="Techriciate home">
        <Image src="/company-logo.png" width={180} height={96} alt="Techriciate Digital Agency" priority style={{ objectFit: 'contain' }} />
      </a>
      <nav className="desktop-nav" aria-label="Main navigation">
        {site.nav.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className={active === item.toLowerCase() ? 'is-active' : undefined}
            aria-current={active === item.toLowerCase() ? 'true' : undefined}
          >
            {item}
          </a>
        ))}
      </nav>
      <a className="button primary desktop-cta" href="#contact">
        Start a conversation
      </a>
      <button className="menu-button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>
        {open ? <X /> : <Menu />}
      </button>
      {open ? (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          <ul>
            {site.nav.map((item, i) => (
              <li key={item} style={{ '--i': i } as React.CSSProperties}>
                <a href={`#${item.toLowerCase()}`} onClick={() => setOpen(false)}>
                  <span className="m-index">{String(i + 1).padStart(2, '0')}</span>
                  {item}
                </a>
              </li>
            ))}
          </ul>
          <div className="mobile-foot">
            <a className="button primary" href="#contact" onClick={() => setOpen(false)}>
              Start a conversation <ArrowUpRight />
            </a>
            <a className="m-contact" href={`mailto:${site.contact.email}`}>
              {site.contact.email}
            </a>
            <a className="m-contact" href={`tel:${site.contact.telHref}`}>
              {site.contact.tel}
            </a>
            <p className="availability">{site.availability ? 'Currently taking new projects' : 'Booked for now'}</p>
            <p className="micro">{site.region}</p>
          </div>
        </nav>
      ) : null}
      <span className="header-progress" aria-hidden="true" />
    </header>
  )
}
