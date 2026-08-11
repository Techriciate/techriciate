import { ArrowUpRight, Copy, Mail, Phone } from 'lucide-react'
import { site } from '@/content/site'
import { projects } from '@/content/projects'
import { SectionHeading, MaskedWords } from '@/components/section-heading'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ContactForm } from '@/components/contact-form'
import { HeroVisual } from '@/components/hero-visual'
import { WorkList } from '@/components/work-list'
import { MotionLayer, type RailSection } from '@/components/motion-layer'
import { ServiceGlyph } from '@/components/service-glyph'
import { CopyEmail } from '@/components/copy-email'

const RAIL: RailSection[] = [
  { id: 'top', label: 'HERO' },
  { id: 'work', label: 'WORK' },
  { id: 'services', label: 'CAPABILITIES' },
  { id: 'why', label: 'WHY US' },
  { id: 'process', label: 'PROCESS' },
  { id: 'studio', label: 'STUDIO' },
  { id: 'stack', label: 'STACK' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'CONTACT' },
]

const ENGAGEMENT = ['A scoping call', 'A fixed, written proposal', 'Weekly build updates', 'Launch', 'Care']

export function HomePage() {
  const facts = `${projects.length} PROJECTS IN PIPELINE · 100% CUSTOM CODE`

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <MotionLayer sections={RAIL} />
      <SiteHeader />
      <main id="main">
        <section className="hero" id="top" data-tone="paper">
          <div className="hero-copy" data-reveal>
            <p className="kicker">{site.hero.kicker}</p>
            <h1 className="masked">
              <MaskedWords text={site.hero.title} />
            </h1>
            <p className="hero-sub">{site.hero.sub}</p>
            <div className="hero-actions">
              <a className="button primary" href="#work">
                Explore our work <ArrowUpRight />
              </a>
              <a className="button secondary" href="#contact">
                Start a conversation
              </a>
            </div>
            <p className="micro">{site.hero.micro}</p>
            <p className="micro facts">{facts}</p>
          </div>
          <HeroVisual />
        </section>



        <section className="section" id="work" data-tone="paper">
          <SectionHeading
            kicker="(01) SELECTED WORK"
            title="Our work in detail."
            underline="detail"
            intro="A mix of live client projects and working demos we built to show what we can do."
          />
          <WorkList />
          <p className="honesty" data-reveal>
            Every project on this page shows its real status. No fake case studies.
          </p>
        </section>

        <section className="section tint split" id="services" data-tone="tint">
          <SectionHeading
            kicker="(02) CAPABILITIES"
            title="What we build."
            underline="build"
            intro="Everything from a simple landing page to a full web app with smart automation built in."
          />
          <div className="service-list" data-reveal>
            {site.services.map((service, i) => (
              <details key={service.title} open={i === 0}>
                <summary>
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  {service.title}
                  <ServiceGlyph className="service-glyph" title={service.title} />
                  <b>+</b>
                </summary>
                <ul>
                  {service.items.map((item) => (
                    <li key={item}>
                      <ServiceGlyph className="item-glyph" title={service.title} />
                      {item}
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </section>

        <section className="section split" id="why" data-tone="paper">
          <div>
            <SectionHeading kicker="(03) WHY TECHRICIATE" title="Why teams work with us." underline="work" />
          </div>
          <div className="why-list">
            {site.why.map(([title, copy], i) => (
              <article key={title} data-reveal>
                <span className="outline-num">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="manifesto" data-tone="navy" data-reveal>
          We build things that work today and still work when your business is twice the size.
        </aside>

        <section className="section" id="process" data-tone="paper">
          <SectionHeading kicker="(04) HOW WE WORK" title="A clear, structured approach." underline="structured" />
          <div className="process-stack">
            {site.process.map(([n, title, copy], i) => (
              <article key={n} data-reveal style={{ '--i': i } as React.CSSProperties}>
                <span className="outline-num">{n}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section tint studio" id="studio" data-tone="tint">
          <SectionHeading kicker="(05) THE STUDIO" title="Built by developers focused on web quality." underline="developers" />
          <div className="studio-grid">
            <div className="studio-story" data-reveal>
              <h3>Who we are</h3>
              <p>
                Techriciate was founded to provide an alternative to off-the-shelf website templates. We build custom web applications focused on performance, maintainability, and clean design.
              </p>
              <h3>Our background</h3>
              <p>
                With backgrounds in software engineering and digital agencies, we bring hands-on development experience to every project. We pair solid web fundamentals with practical AI tools that deliver real value.
              </p>
            </div>
            <div className="studio-cards" data-reveal>
              <article className="navy-card">
                <p className="kicker">VISION</p>
                <p>Making professional, custom-coded web software accessible and reliable for growing businesses.</p>
              </article>
              <article className="paper-card">
                <p className="kicker">MISSION</p>
                <p>We build websites, web applications, and workflow automations that streamline operations and support growth.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section" id="stack" data-tone="paper">
          <SectionHeading kicker="(06) UNDER THE HOOD" title="Tools selected for performance and scalability." underline="performance" />
          <div className="stack-grid">
            {Object.entries(site.stack).map(([group, items]) => (
              <article key={group} data-reveal>
                <h3>{group}</h3>
                <div className="chips">
                  {items.map((item) => (
                    <span className="chip" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section tint" id="faq" data-tone="tint">
          <SectionHeading kicker="FAQ" title="Frequently asked questions." underline="questions" />
          <div className="faq-list" data-reveal>
            {site.faqs.map(([q, a]) => (
              <details key={q}>
                <summary>
                  {q}
                  <span>+</span>
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="section contact" id="contact" data-tone="paper">
          <div className="contact-copy">
            <SectionHeading
              kicker="(07) CONTACT"
              title="Let’s discuss your project."
              underline="project"
              intro="Tell us what you need and we will get back to you with a clear next step."
            />
            <div className="channels" data-reveal>
              <a href={`mailto:${site.contact.email}`}>
                <Mail /> {site.contact.email}
              </a>
              <a href={`tel:${site.contact.telHref}`}>
                <Phone /> {site.contact.tel}
              </a>
              <a href={`https://wa.me/${site.contact.telHref.replace('+', '')}`} target="_blank" rel="noopener noreferrer">
                WhatsApp <ArrowUpRight />
              </a>
              <CopyEmail email={site.contact.email}>
                <Copy /> Copy email
              </CopyEmail>
            </div>
            {site.availability ? (
              <p className="availability">
                <span /> Currently taking new projects
              </p>
            ) : null}
            <p className="micro">We read every message and reply quickly.</p>
            <div className="engage" data-reveal>
              <h3>How it works</h3>
              <ol>
                {ENGAGEMENT.map((step, i) => (
                  <li key={step}>
                    <span>{String(i + 1).padStart(2, '0')}</span>
                    {step}
                  </li>
                ))}
              </ol>
              <p className="note">You get a clear quote before any work starts. No surprises.</p>
            </div>
          </div>
          <ContactForm />
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
