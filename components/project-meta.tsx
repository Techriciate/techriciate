import type { Project } from '@/content/projects'

export function ProjectMeta({ project }: { project: Project }) {
  return (
    <div className="case-meta">
      <div>
        <span>Industry</span>
        <p>{project.industry}</p>
      </div>
      <div>
        <span>Status</span>
        <p>{project.status}</p>
      </div>
      <div>
        <span>Scope</span>
        <p>{project.scope}</p>
      </div>
    </div>
  )
}
