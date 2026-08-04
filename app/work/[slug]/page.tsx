import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { getWorkStudy, workStudies } from '@/content/work'
import { WorkCover } from '@/components/work-cover'
import { SiteFooter } from '@/components/site-footer'

export function generateStaticParams(){ return workStudies.map(({slug})=>({slug})) }
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params; const study=getWorkStudy(slug); if(!study)return {}
  return { title:study.name, description:`${study.tagline} ${study.problem}` }
}

const sections=[['Problem','problem'],['Research','research'],['Solution','solution'],['Design Process','design'],['Development','development'],['Timeline','timeline'],['Challenges','challenges'],['Business Impact','impact'],['Future Scope','future']] as const

export default async function CaseStudyPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params; const study=getWorkStudy(slug); if(!study)notFound()
  const related=workStudies.filter(item=>item.slug!==study.slug).slice(0,2)
  return <><main className="case-page">
    <header className="case-nav"><Link href="/#work"><ArrowLeft/> Back to work</Link><Link href="/">Techriciate</Link></header>
    <section className="case-hero"><p className="kicker">{`(CASE ${study.index})`}</p><h1>{study.name}</h1><p className="case-tagline">{study.tagline}</p><div className="case-meta"><div><span>Industry</span><p>{study.industry}</p></div><div><span>Status</span><p>{study.status}</p></div><div><span>Scope</span><p>{study.solution.startsWith('A proposed') ? 'Proposal' : study.status.includes('Demo') || study.status.includes('Demonstration') ? 'Demonstration' : 'Digital product'}</p></div></div><div className="case-cover"><WorkCover slug={study.slug} name={study.name} status={study.status}/></div></section>
    <div className="case-layout"><aside className="case-toc" aria-label="Case study sections">{sections.map(([label,key])=><a key={key} href={`#${key}`}>{label}</a>)}</aside><div className="case-content">
      {sections.map(([label,key],i)=><section id={key} key={key} className={i===0?'case-problem':''}><p className="kicker">{String(i+1).padStart(2,'0')}</p><h2>{label}</h2><p>{study[key]}</p></section>)}
      <section id="technology"><p className="kicker">TECHNOLOGY</p><h2>Tech stack</h2><div className="chips">{study.stack.map(item=><span className="chip" key={item}>{item}</span>)}</div></section>
      {study.performance?<section id="performance"><p className="kicker">STANDARD</p><h2>Our build standard</h2><p>{study.performance}</p></section>:null}
      <section id="screens"><p className="kicker">SCREENSHOTS</p><h2>Project preview</h2><div className="gap-frame">Preview coming soon</div></section>
      <section id="walkthrough"><p className="kicker">VIDEO</p><h2>Walkthrough on request</h2><p>Demonstration walkthrough available upon request.</p></section>
      <section id="access"><p className="kicker">ACCESS</p><h2>Live demo & repository</h2><p>{study.status.includes('negotiation') || study.status.includes('Negotiation') ? 'Available upon request during project discussion.' : 'Available upon request.'}</p><p>Repository private: details available upon request.</p></section>
      <section><p className="kicker">NEXT</p><h2>Related projects</h2><div className="related">{related.map(item=><Link href={`/work/${item.slug}`} key={item.slug}>{item.name}<ArrowUpRight/></Link>)}</div></section>
    </div></div>
  </main><SiteFooter/></>
}

