'use client'

import Image from 'next/image'

export function HeroVisual() {
  return (
    <div className="hero-mark is-ready">
      <span className="tick tl" />
      <span className="tick tr" />
      <span className="tick bl" />
      <span className="tick br" />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Image 
          src="/company-logo.png" 
          width={500} 
          height={266} 
          alt="Techriciate Digital Agency" 
          priority 
          style={{ objectFit: 'contain', width: '100%', height: 'auto', maxWidth: '500px' }} 
        />
      </div>
    </div>
  )
}
