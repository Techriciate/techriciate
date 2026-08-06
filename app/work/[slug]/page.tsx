import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { getProject, projects, type Project } from '@/content/projects'
import { ProjectHero } from '@/components/project-hero'
import { ProjectMeta } from '@/components/project-meta'
import { ProjectGallery } from '@/components/project-gallery'
import { ProjectRelated } from '@/components/project-related'
import { SiteFooter } from '@/components/site-footer'

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const study = getProject(slug)
  if (!study) return {}
  return { title: study.title, description: `${study.description} ${study.problem}` }
}

const sections = [
  ['Problem', 'problem'],
  ['Research', 'research'],
  ['Solution', 'solution'],
  ['Design Process', 'design'],
  ['Development', 'development'],
  ['Timeline', 'timeline'],
  ['Challenges', 'challenges'],
  ['Business Impact', 'impact'],
  ['Future Scope', 'future']
] as const

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const study = getProject(slug)
  if (!study) notFound()

  const related = projects.filter((item) => item.slug !== study.slug).slice(0, 2)

  return (
    <>
      <main className="case-page">
        <header className="case-nav">
          <Link href="/#work">
            <ArrowLeft /> Back to work
          </Link>
          <Link href="/">Techriciate</Link>
        </header>

        <section className="case-hero">
          <p className="kicker">{`(CASE ${study.index})`}</p>
          <h1>{study.title}</h1>
          <p className="case-tagline">{study.description}</p>
          
          <ProjectMeta project={study} />
          
          <ProjectHero title={study.title} imageSrc={study.heroImage} slug={study.slug} status={study.status} />
        </section>

        <div className="case-layout">
          <aside className="case-toc" aria-label="Case study sections">
            {sections.map(([label, key]) => (
              <a key={key} href={`#${key}`}>
                {label}
              </a>
            ))}
          </aside>
          
          <div className="case-content">
            {sections.map(([label, key], i) => (
              <section id={key} key={key} className={i === 0 ? 'case-problem' : ''}>
                <p className="kicker">{String(i + 1).padStart(2, '0')}</p>
                <h2>{label}</h2>
                <p>{study[key as keyof Project] as string}</p>
              </section>
            ))}

            <section id="technology">
              <p className="kicker">TECHNOLOGY</p>
              <h2>Tech stack</h2>
              <div className="chips">
                {study.stack.map((item) => (
                  <span className="chip" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </section>

            {study.performance ? (
              <section id="performance">
                <p className="kicker">STANDARD</p>
                <h2>Our build standard</h2>
                <p>{study.performance}</p>
              </section>
            ) : null}

            <section id="screens">
              <p className="kicker">SCREENSHOTS</p>
              <h2>Project preview</h2>
              <ProjectGallery images={study.images} title={study.title} slug={study.slug} status={study.status} />
            </section>

            <section id="walkthrough">
              <p className="kicker">VIDEO</p>
              <h2>Walkthrough on request</h2>
              <p>Demonstration walkthrough available upon request.</p>
            </section>

            <section id="access">
              <p className="kicker">ACCESS</p>
              <h2>Live demo</h2>
              {study.liveUrl ? (
                <a 
                  href={study.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-white text-black font-medium hover:bg-zinc-200 transition-colors gap-2 mt-4"
                >
                  Visit Live Website <ArrowUpRight className="w-4 h-4" />
                </a>
              ) : (
                <button 
                  disabled
                  className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-white/10 text-white/40 font-medium cursor-not-allowed mt-4"
                >
                  Coming Soon
                </button>
              )}
            </section>

            <section>
              <p className="kicker">NEXT</p>
              <h2>Related projects</h2>
              <ProjectRelated related={related} />
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
