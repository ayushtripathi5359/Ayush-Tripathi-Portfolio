import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const JOBS = [
  {
    role: 'Full Stack Developer',
    company: 'MECNTEC',
    period: 'Aug 2026 – Present',
    points: [
      'Enhanced real estate CRM modules with React.js, Node.js, Express.js and MongoDB — property tracking, lead management and client workflows.',
      'Integrated AI voice agents for lead qualification, appointment booking and follow-ups, cutting manual outreach by ~40%.',
      'Resolved 20+ production issues across frontend, backend and database layers; improved API response times by 25%.',
    ],
  },
  {
    role: 'Associate Software Engineer',
    company: 'Medro Hi-Tech Symbol',
    period: 'Nov 2025 – Jul 2026',
    links: [
      { label: 'MyStayInn Customer', href: 'https://play.google.com/store/apps/details?id=in.co.mystayinn.customer' },
      { label: 'MyStayInn Business', href: 'https://play.google.com/store/apps/details?id=in.co.mystayinn.business' },
      { label: 'ClusterX', href: 'https://clusterx.ai/' },
    ],
    points: [
      'Joined as a trainee, converted to full-time in Apr 2026. Built and deployed the MyStayInn React Native apps with 15+ REST APIs.',
      'Implemented Cashfree payment workflows and webhooks, reducing payment processing latency by 20%.',
      'Cut screen load times by 30% across React.js and React Native via lazy loading, code splitting and memoization.',
      'Built mobile-first Android and iOS components and managed global state with Redux-Saga.',
    ],
  },
  {
    role: 'Associate Software Developer Intern',
    company: 'Prestigious Gaming',
    period: 'Apr 2025 – Jun 2025',
    links: [{ label: 'Live site', href: 'https://www.prestigiousgaming.in/' }],
    points: [
      'Developed the production website with React.js and Tailwind CSS — landing, features, mission and culture sections.',
      'Shipped responsive UI components, optimized across desktop and mobile.',
    ],
  },
]

export default function Experience() {
  const sectionRef = useRef(null)
  const headRef    = useRef(null)
  const jobRefs    = useRef([])

  useGSAP(() => {
    gsap.from(headRef.current, {
      x: -80, opacity: 0, duration: 1.1, ease: 'power3.out',
      scrollTrigger: { trigger: headRef.current, start: 'top 80%' },
    })
    jobRefs.current.forEach((job) => {
      if (!job) return
      gsap.from(job, {
        y: 60, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: job, start: 'top 80%' },
      })
    })
  }, { scope: sectionRef })

  return (
    <section
      id="section-experience"
      ref={sectionRef}
      style={{ minHeight: '100svh', background: '#FF6B6B', padding: 'clamp(5rem, 8vw, 8rem) clamp(1.5rem, 8vw, 8rem)', position: 'relative', overflow: 'hidden' }}
    >
      <h2
        ref={headRef}
        style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(4rem, 10vw, 9rem)', color: '#080808', letterSpacing: '0.02em', lineHeight: 0.9, marginBottom: 'clamp(3rem, 5vw, 5rem)' }}
      >
        Experience
      </h2>

      <div style={{ maxWidth: '1100px' }}>
        {JOBS.map((job, i) => (
          <div
            key={job.company}
            ref={el => (jobRefs.current[i] = el)}
            style={{ borderTop: '1px solid rgba(8,8,8,0.25)', padding: 'clamp(1.75rem, 3vw, 2.5rem) 0', display: 'flex', flexWrap: 'wrap', gap: 'clamp(1.5rem, 4vw, 4rem)' }}
          >
            <div style={{ flex: '1 1 260px' }}>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '12px', letterSpacing: '0.15em', color: 'rgba(8,8,8,0.6)', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
                {job.period}
              </p>
              <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2rem, 4vw, 3.25rem)', color: '#080808', letterSpacing: '0.02em', lineHeight: 0.95 }}>
                {job.role}
              </h3>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '13px', color: 'rgba(8,8,8,0.75)', letterSpacing: '0.06em', marginTop: '0.5rem' }}>
                {job.company}
              </p>
              {job.links && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '0.9rem' }}>
                  {job.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', letterSpacing: '0.12em', color: '#080808', textTransform: 'uppercase', borderBottom: '1px solid #080808', paddingBottom: '2px' }}
                    >
                      {l.label} ↗
                    </a>
                  ))}
                </div>
              )}
            </div>

            <ul style={{ flex: '2 1 380px', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {job.points.map((p) => (
                <li key={p} style={{ display: 'flex', gap: '0.75rem', fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(0.95rem, 1.3vw, 1.05rem)', color: 'rgba(8,8,8,0.8)', lineHeight: 1.55 }}>
                  <span style={{ flexShrink: 0 }}>→</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
