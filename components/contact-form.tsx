'use client'

import { useState } from 'react'
import { site } from '@/content/site'

export function ContactForm() {
  const [state, setState] = useState<'idle'|'sending'|'sent'|'error'>('idle')
  async function submit(formData: FormData) {
    setState('sending')
    
    const name = formData.get('name')
    const email = formData.get('email')
    const type = formData.get('type')
    const message = formData.get('message')

    const subject = encodeURIComponent(`New Inquiry: ${type}`)
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nProject Type: ${type}\n\nMessage:\n${message}`
    )
    
    // Option 1: Open default Email app
    window.location.href = `mailto:worknikhilgupta06@gmail.com?subject=${subject}&body=${body}`

    // Option 2: Open WhatsApp (Uncomment this and comment the line above to use WhatsApp instead)
    // window.open(`https://wa.me/917039638435?text=${body}`, '_blank')

    setTimeout(() => setState('sent'), 500)
  }
  return <form className="contact-form" action={submit}>
    <div className="form-grid"><label>Name<input name="name" required minLength={2} autoComplete="name" /></label><label>Email<input name="email" required type="email" autoComplete="email" /></label></div>
    <label>Project type<select name="type" required defaultValue=""><option value="" disabled>Select a service</option>{site.services.map((service)=><option key={service.title}>{service.title}</option>)}</select></label>
    <label>Message<textarea name="message" required minLength={10} rows={6} /></label>
    <label className="honeypot" aria-hidden="true">Company website<input name="website" tabIndex={-1} autoComplete="off" /></label>
    <button className="button primary" disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : 'Send enquiry'} <span aria-hidden="true">↗</span></button>
    <p className="privacy">We only use these details to reply to you.</p>
    <p className="form-status" aria-live="polite">{state === 'sent' ? 'Thanks — we’ve got your message.' : state === 'error' ? 'Something went wrong. Please email us directly.' : ''}</p>
  </form>
}
