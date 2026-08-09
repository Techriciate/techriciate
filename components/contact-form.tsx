'use client'

import { useState } from 'react'
import { site } from '@/content/site'
import { submitContactForm } from '@/app/actions/contact'

export function ContactForm() {
  const [state, setState] = useState<'idle'|'sending'|'sent'|'error'>('idle')
  async function submit(formData: FormData) {
    setState('sending')
    
    const result = await submitContactForm(formData)
    
    if (result.success) {
      setState('sent')
    } else {
      setState('error')
    }
  }
  return <form className="contact-form" action={submit}>
    <div className="form-grid"><label>Name<input name="name" required minLength={2} autoComplete="name" /></label><label>Email<input name="email" required type="email" autoComplete="email" /></label><label>Mobile No<input name="mobile" required type="tel" pattern="[0-9]{10}" title="Please enter a valid 10-digit mobile number" autoComplete="tel" /></label></div>
    <label>Project type<select name="type" required defaultValue=""><option value="" disabled>Select a service</option>{site.services.map((service)=><option key={service.title}>{service.title}</option>)}</select></label>
    <label>Attachment (Optional)<input name="attachment" type="file" accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" /></label>
    <label>Message<textarea name="message" required minLength={10} rows={6} /></label>
    <label className="honeypot" aria-hidden="true">Company website<input name="website" tabIndex={-1} autoComplete="off" /></label>
    <button className="button primary" disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : 'Send enquiry'} <span aria-hidden="true">↗</span></button>
    <p className="privacy">We only use these details to reply to you.</p>
    <p className="form-status" aria-live="polite">{state === 'sent' ? 'Thanks — we’ve got your message.' : state === 'error' ? 'Something went wrong. Please email us directly.' : ''}</p>
  </form>
}
