'use client'

import { useState } from 'react'

export function CopyEmail({ email, children }: { email: string; children: React.ReactNode }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(email)
          setCopied(true)
          window.setTimeout(() => setCopied(false), 2000)
        } catch {
          setCopied(false)
        }
      }}
    >
      {children}
      <span aria-live="polite">{copied ? ' Copied!' : ''}</span>
    </button>
  )
}
