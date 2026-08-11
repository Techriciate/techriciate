'use client'

import { useState } from 'react'
import { site } from '@/content/site'

const MAX_SUBMISSIONS = 3
const COOLDOWN_MS = 60 * 60 * 1000 // 1 hour

function getRecentSubmissions(): number[] {
  try {
    const raw = localStorage.getItem('tc_form_ts')
    if (!raw) return []
    const timestamps: number[] = JSON.parse(raw)
    const cutoff = Date.now() - COOLDOWN_MS
    return timestamps.filter((t) => t > cutoff)
  } catch {
    return []
  }
}

function recordSubmission() {
  const recent = getRecentSubmissions()
  recent.push(Date.now())
  localStorage.setItem('tc_form_ts', JSON.stringify(recent))
}

function isRateLimited(): boolean {
  return getRecentSubmissions().length >= MAX_SUBMISSIONS
}

export function ContactForm() {
  const [state, setState] = useState<'idle'|'sending'|'sent'|'error'|'limited'>('idle')

  async function submit(formData: FormData) {
    if (isRateLimited()) {
      setState('limited')
      return
    }

    setState('sending')

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "";
    formData.append("access_key", accessKey);
    formData.append("subject", `New Inquiry: ${formData.get('type') || 'General'}`);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
        headers: {
          "Accept": "application/json"
        }
      });

      if (response.status === 200) {
        recordSubmission()
        setState('sent')
      } else {
        setState('error')
      }
    } catch (error) {
      setState('error')
    }
  }

  return <form className="contact-form" action={submit}>
    <div className="form-grid"><label>Name<input name="name" required minLength={2} autoComplete="name" /></label><label>Email<input name="email" required type="email" autoComplete="email" /></label><label>Mobile No<input name="mobile" required type="tel" pattern="[0-9]{10}" title="Please enter a valid 10-digit mobile number" autoComplete="tel" /></label></div>
    <label>Project type<select name="type" required defaultValue=""><option value="" disabled>Select a service</option>{site.services.map((service)=><option key={service.title}>{service.title}</option>)}</select></label>
    <label>Message<textarea name="message" required minLength={10} rows={6} /></label>
    <label className="honeypot" aria-hidden="true">Company website<input name="website" tabIndex={-1} autoComplete="off" /></label>
    <button className="button primary" disabled={state === 'sending' || state === 'limited'}>{state === 'sending' ? 'Sending\u2026' : state === 'limited' ? 'Too many requests' : 'Send enquiry'} <span aria-hidden="true">{"\u2197"}</span></button>
    <p className="privacy">We only use these details to reply to you.</p>
    <p className="form-status" aria-live="polite">{state === 'sent' ? 'Thanks! We\u2019ve got your message and will get back to you soon.' : state === 'error' ? 'Something went wrong. Please email us directly.' : state === 'limited' ? 'You\u2019ve sent a few messages already. Please try again in an hour, or email us directly.' : ''}</p>
  </form>
}
