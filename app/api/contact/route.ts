import { NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.email().max(160),
  type: z.string().trim().min(1).max(80),
  message: z.string().trim().min(10).max(5000),
  website: z.string().max(0),
})

const attempts = new Map<string, number[]>()

export async function POST(request: Request) {
  const ip = request.headers.get('x-real-ip') ?? request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  const now = Date.now()
  const recent = (attempts.get(ip) ?? []).filter((time) => now - time < 3_600_000)
  if (recent.length >= 3) return NextResponse.json({ ok: false }, { status: 429 })
  attempts.set(ip, [...recent, now])

  const contentLength = Number(request.headers.get('content-length') || '0')
  if (contentLength > 10240) { // Max 10KB for text form
    return NextResponse.json({ ok: false, message: 'Payload too large' }, { status: 413 })
  }

  const form = await request.formData()
  const result = schema.safeParse(Object.fromEntries(form.entries()))
  if (!result.success) return NextResponse.json({ ok: false }, { status: 400 })

  return NextResponse.json({ ok: false, message: 'Contact delivery is not configured.' }, { status: 503 })
}
