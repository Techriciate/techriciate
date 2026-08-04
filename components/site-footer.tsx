import Image from 'next/image'
import Link from 'next/link'
import { ArrowUp, ArrowUpRight } from 'lucide-react'
import { site } from '@/content/site'
import { MarkSvg } from '@/components/mark-svg'
import { MaskedWords } from '@/components/section-heading'

export function SiteFooter() {
  return (
    <>
      <section className="cta-band" data-tone="navy" aria-labelledby="cta-title">
        <MarkSvg className="cta-mark" />
        <div className="cta-inner" data-reveal>
          <h2 className="masked" id="cta-title">
            <MaskedWords text="Ready to start your project?" underline="Ready" />
          </h2>
          <a className="button ghost" href="#contact">
            Start a conversation <ArrowUpRight />
          </a>
          <a className="cta-mail" href={`mailto:${site.contact.email}`}>
            {site.contact.email}
          </a>
        </div>
      </section>

      <footer data-tone="navy">
        <div className="footer-grid">
          <div className="footer-brand">
            <Image src="/company-logo.png" width={190} height={100} alt="Techriciate Digital Agency" />
            <p>{site.positioning}</p>
            {site.availability ? (
              <p className="availability">
                <span /> Currently taking new projects
              </p>
            ) : null}
          </div>
          <nav aria-labelledby="ft-sitemap">
            <h3 id="ft-sitemap">Sitemap</h3>
            <Link href="/">Home</Link>
            <a href="#work">Selected work</a>
            <a href="#studio">Studio</a>
            <a href="#faq">FAQ</a>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </nav>
          <nav aria-labelledby="ft-caps">
            <h3 id="ft-caps">Capabilities</h3>
            {site.services.map((service) => (
              <a key={service.title} href="#services">
                {service.title}
              </a>
            ))}
          </nav>
          <div className="footer-contact">
            <h3>Contact</h3>
            <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
            <a href={`tel:${site.contact.telHref}`}>{site.contact.tel}</a>
            <a href={`https://wa.me/${site.contact.telHref.replace('+', '')}`} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
            <p className="micro">{site.region}</p>
            <p className="micro">Social channels launching soon</p>
          </div>
        </div>
        <div className="footer-bar">
          <p className="micro">© 2026 Techriciate Digital Agency</p>
          <p className="micro">CUSTOM CODED DIGITAL EXPERIENCES</p>
          <a className="to-top" href="#top">
            Back to top <ArrowUp />
          </a>
        </div>
        <p className="watermark" aria-hidden="true">
          TECHRICIATE
        </p>
      </footer>
    </>
  )
}

