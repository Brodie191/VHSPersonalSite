import { projects } from '@/data/projects'

export default function ProjectsGrid() {
  return (
    <section id="projects">
      <div className="sec-label">// FILE 01</div>
      <div className="sec-title">PROJECTS.DIR</div>
      <div className="projects-grid">
        {projects.map((project) => (
          <article key={project.num} className="tile">
            <div className="tile-num">{project.num}</div>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="tile-stack">
              {project.stack.map((tech) => (
                <span key={tech} className="chip">{tech}</span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <a className="go" href={project.href}>▶ GITHUB</a>
              {project.liveHref && (
                <a className="go" href={project.liveHref}>▶ LIVE</a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
