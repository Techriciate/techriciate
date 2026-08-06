import { NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.email().max(160),
  type: z.string().trim().min(1).max(80),
  message: z.string().trim().min(10).max(5000),
  website: z.string().max(0),
})

const attempts = new Map<string, number[]>()
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  const now = Date.now()
  const recent = (attempts.get(ip) ?? []).filter((time) => now - time < 3_600_000)
  if (recent.length >= 3) return NextResponse.json({ ok: false }, { status: 429 })
  attempts.set(ip, [...recent, now])

  const form = await request.formData()
  const result = schema.safeParse(Object.fromEntries(form.entries()))
  if (!result.success) return NextResponse.json({ ok: false }, { status: 400 })

  const { name, email, type, message } = result.data

  if (!process.env.RESEND_API_KEY) {
    console.error('Missing RESEND_API_KEY environment variable.')
    return NextResponse.json({ ok: false, message: 'Contact delivery is not configured.' }, { status: 503 })
  }

  try {
    const { error } = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL || 'worknikhilgupta06@gmail.com',
      replyTo: email,
      subject: `New Project Inquiry: ${type}`,
      html: `
        <h2>New Contact Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Project Type:</strong> ${type}</p>
        <br />
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br />')}</p>
      `
    })

    if (error) {
      console.error('Email failed to send:', error)
      return NextResponse.json({ ok: false, message: 'Failed to send email.' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Error sending email:', err)
    return NextResponse.json({ ok: false, message: 'Internal Server Error' }, { status: 500 })
  }
}
