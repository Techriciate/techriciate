import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Fraunces, JetBrains_Mono, Manrope } from 'next/font/google'
import './globals.css'

const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-display' })
const manrope = Manrope({ subsets: ['latin'], variable: '--font-body' })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  metadataBase: new URL('https://www.techriciate.com'),
  title: { default: 'Techriciate — Digital Agency | Engineering intelligence.', template: '%s · Techriciate' },
  description: 'Techriciate designs and codes custom websites, e-commerce, and AI automation for businesses done settling for templates. Engineering intelligence.',
  openGraph: { title: 'Techriciate — Digital Agency', description: 'Your business, engineered for the web.', type: 'website', locale: 'en_US' },
}

export const viewport: Viewport = { colorScheme: 'light', themeColor: '#F6F8F9', width: 'device-width', initialScale: 1 }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className="bg-background"><body className={`${fraunces.variable} ${manrope.variable} ${mono.variable} font-sans antialiased`}>{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
