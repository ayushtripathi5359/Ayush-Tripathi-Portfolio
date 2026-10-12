import { PROFILE, METRICS, SKILL_GROUPS, JOBS, PROJECTS, emit } from '../data/profile.js'

/* Recruiter mode — a static, animation-free one-page summary */
export default function RecruiterView() {
  const ext = { target: '_blank', rel: 'noopener noreferrer' }

  return (
    <div className="rv" data-lenis-prevent>
      <div className="rv-inner">
        <div className="rv-bar">
          <span className="rv-label">Recruiter mode</span>
          <button className="rv-btn" onClick={() => emit('app:recruiter', false)}>← Full experience</button>
        </div>

        <header className="rv-head">
          <h1>{PROFILE.name}</h1>
          <p className="rv-sub">{PROFILE.title} · {PROFILE.location}</p>
          <p className="rv-summary">{PROFILE.summary}</p>
          <div className="rv-actions">
            <a className="rv-btn rv-btn-primary" href={PROFILE.resume} {...ext}>Download resume ↓</a>
            <a className="rv-btn" href={PROFILE.mailHref} {...ext}>{PROFILE.email}</a>
            <a className="rv-btn" href={PROFILE.github} {...ext}>GitHub ↗</a>
            <a className="rv-btn" href={PROFILE.linkedin} {...ext}>LinkedIn ↗</a>
          </div>
        </header>

        <section>
          <h2>Impact</h2>
          <div className="rv-metrics">
            {METRICS.map((m) => (
              <div key={m.label} className="rv-metric">
                <strong>{m.value}</strong>
                <span>{m.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2>Skills</h2>
          <dl className="rv-skills">
            {SKILL_GROUPS.map((g) => (
              <div key={g.label}>
                <dt>{g.label}</dt>
                <dd>{g.items}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section>
          <h2>Experience</h2>
          {JOBS.map((job) => (
            <article key={job.company} className="rv-job">
              <div className="rv-job-head">
                <h3>{job.role} · {job.company}</h3>
                <span>{job.period}</span>
              </div>
              <ul>
                {job.points.map((p) => <li key={p}>{p}</li>)}
              </ul>
              {job.links && (
                <p className="rv-links">
                  {job.links.map((l) => <a key={l.href} href={l.href} {...ext}>{l.label} ↗</a>)}
                </p>
              )}
            </article>
          ))}
        </section>

        <section>
          <h2>Projects</h2>
          <ul className="rv-projects">
            {PROJECTS.map((p) => (
              <li key={p.num}>
                <div>
                  {p.href
                    ? <a href={p.href} {...ext}>{p.name} ↗</a>
                    : <span className="rv-proj-name">{p.name}</span>}
                  <span className="rv-tags">{p.tags}</span>
                </div>
                <p>{p.desc}</p>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Education</h2>
          <div className="rv-job-head">
            <h3>{PROFILE.education.degree}</h3>
            <span>{PROFILE.education.period}</span>
          </div>
          <p className="rv-school">{PROFILE.education.school}</p>
        </section>

        <footer className="rv-foot">
          <button className="rv-btn" onClick={() => emit('app:recruiter', false)}>← Back to the full site</button>
        </footer>
      </div>
    </div>
  )
}
