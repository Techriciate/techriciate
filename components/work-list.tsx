'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { useState } from 'react'
import { projects, type Project } from '@/content/projects'
import { ProjectHoverPreview } from './project-hover-preview'
import { ProjectImage } from './project-image'

export function WorkList() {
  const [activeProject, setActiveProject] = useState<Project | null>(null)

  return (
    <div className="work-list" onPointerLeave={() => setActiveProject(null)}>
      {projects.map((project) => (
        <Link
          className="work-row"
          href={`/work/${project.slug}`}
          key={project.slug}
          data-reveal
          data-cursor="VIEW CASE"
          onPointerEnter={() => setActiveProject(project)}
          onFocus={() => setActiveProject(project)}
        >
          <span className="project-index">{project.index}</span>
          <div className="row-thumb relative overflow-hidden bg-zinc-900 border border-white/5 rounded-lg">
            <ProjectImage 
              src={project.thumbnail} 
              alt={project.title} 
              slug={project.slug}
              title={project.title}
              status={project.status}
              variant="thumb"
              fill={false}
              sizes="100px" 
            />
          </div>
          <div className="row-copy">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </div>
          <div className="project-meta">
            <span className="chip">{project.industry}</span>
            <span className="status">{project.status}</span>
          </div>
          <ArrowUpRight className="row-arrow" />
        </Link>
      ))}
      <ProjectHoverPreview project={activeProject} />
    </div>
  )
}
