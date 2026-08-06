import { ProjectImage } from './project-image'

export function ProjectHero({ title, imageSrc, slug, status }: { title: string; imageSrc: string; slug: string; status: string }) {
  return (
    <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl bg-zinc-900 border border-white/5 mt-8 mb-16">
      <ProjectImage
        src={imageSrc}
        alt={`${title} hero`}
        slug={slug}
        title={title}
        status={status}
        variant="hero"
        fill={false}
        sizes="(max-width: 768px) 100vw, 1200px"
        priority
      />
    </div>
  )
}
