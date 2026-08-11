import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Fraunces, JetBrains_Mono, Manrope } from 'next/font/google'
import './globals.css'

const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-display' })
const manrope = Manrope({ subsets: ['latin'], variable: '--font-body' })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  metadataBase: new URL('https://www.techriciate.com'),
  title: { default: 'Techriciate | Custom Websites, E-Commerce & AI Tools', template: '%s · Techriciate' },
  description: 'Techriciate builds custom websites, online stores, and practical AI tools for businesses that want more than a template.',
  openGraph: { title: 'Techriciate | Digital Agency', description: 'Custom websites and web apps built from scratch for your business.', type: 'website', locale: 'en_US' },
}

export const viewport: Viewport = { colorScheme: 'light', themeColor: '#F6F8F9', width: 'device-width', initialScale: 1 }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-background" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (!sessionStorage.getItem('tc-preloaded') && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                  document.documentElement.classList.add('is-loading');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className={`${fraunces.variable} ${manrope.variable} ${mono.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
