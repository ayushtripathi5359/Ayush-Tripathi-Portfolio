import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

/* ── SVG Icons ─────────────────────────────────────────────── */
const ReactIcon = () => (
  <svg width="80" height="80" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5">
    <ellipse cx="50" cy="50" rx="46" ry="17" />
    <ellipse cx="50" cy="50" rx="46" ry="17" transform="rotate(60 50 50)" />
    <ellipse cx="50" cy="50" rx="46" ry="17" transform="rotate(120 50 50)" />
    <circle  cx="50" cy="50" r="5"   fill="currentColor" stroke="none" />
  </svg>
)
const NativeIcon = () => (
  <svg width="80" height="80" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5">
    <rect x="28" y="6" width="44" height="88" rx="9" />
    <line x1="42" y1="15" x2="58" y2="15" strokeLinecap="round" />
    <circle cx="50" cy="83" r="3" fill="currentColor" stroke="none" />
    <ellipse cx="50" cy="50" rx="18" ry="7" />
    <ellipse cx="50" cy="50" rx="18" ry="7" transform="rotate(60 50 50)" />
    <ellipse cx="50" cy="50" rx="18" ry="7" transform="rotate(120 50 50)" />
  </svg>
)
const NodeIcon = () => (
  <svg width="80" height="80" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polygon points="50,6 90,28 90,72 50,94 10,72 10,28" strokeLinejoin="round" />
    <path d="M36 66 V36 L64 66 V36" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const MongoIcon = () => (
  <svg width="80" height="80" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5">
    <ellipse cx="50" cy="22" rx="32" ry="12" />
    <path d="M18 22 V50 C18 57 32 62 50 62 C68 62 82 57 82 50 V22" />
    <path d="M18 50 V78 C18 85 32 90 50 90 C68 90 82 85 82 78 V50" />
  </svg>
)
const TSIcon = () => (
  <svg width="80" height="80" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5">
    <rect x="6" y="6" width="88" height="88" rx="10" />
    <line x1="28" y1="38" x2="28" y2="72" strokeLinecap="round" />
    <line x1="15" y1="38" x2="42" y2="38" strokeLinecap="round" />
    <path d="M52 62 Q52 72 64 72 Q76 72 76 62 Q76 52 64 52 Q52 52 52 42 Q52 32 64 32 Q72 32 74 38" strokeLinecap="round" />
  </svg>
)
const NextIcon = () => (
  <svg width="80" height="80" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5">
    <circle cx="50" cy="50" r="44" />
    <path d="M34 70 L34 30 L70 70" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="54" y1="46" x2="70" y2="46" strokeLinecap="round" />
  </svg>
)

/* ── Data ───────────────────────────────────────────────────── */
const SKILLS = [
  {
    bg: '#FFD166', name: 'React', usedIn: 'SIX · MyStayInn · CRM',
    oneliner: 'Web UIs & state management',
    bullets: ['Code splitting & memoization', 'Redux Toolkit & Redux-Saga', 'Responsive, production UIs'],
    Icon: ReactIcon,
  },
  {
    bg: '#FF6B6B', name: 'Next.js', usedIn: 'SIX Marketplace',
    oneliner: 'SSR & full-stack React',
    bullets: ['Server-side rendering', 'Marketplace listing workflows', 'Shipped with backend team'],
    Icon: NextIcon,
  },
  {
    bg: '#4ECDC4', name: 'React Native', usedIn: 'MyStayInn · Karigar',
    oneliner: 'Cross-platform mobile apps',
    bullets: ['Android, iOS & Expo', '15+ REST API integrations', '30% faster screen loads'],
    Icon: NativeIcon,
  },
  {
    bg: '#C77DFF', name: 'TypeScript', usedIn: 'Karigar · Web & mobile',
    oneliner: 'Type-safe code at scale',
    bullets: ['Typed API contracts', 'Shared service layers', 'Safer refactors'],
    Icon: TSIcon,
  },
  {
    bg: '#FFD166', name: 'Node.js', usedIn: 'MECNTEC CRM',
    oneliner: 'REST APIs & real-time',
    bullets: ['Express.js & FastAPI services', 'JWT auth & Socket.io', '25% faster API responses'],
    Icon: NodeIcon,
  },
  {
    bg: '#FF6B6B', name: 'MongoDB', usedIn: 'CRM · Payments',
    oneliner: 'Data, payments & AI flows',
    bullets: ['MongoDB & Prisma ORM', 'Cashfree & PayU gateways', 'AI voice agents & RAG'],
    Icon: MongoIcon,
  },
]

const ROTATIONS = [-2, 1, -1, 2, -2, 1]

function SkillCard({ bg, name, usedIn, oneliner, bullets, Icon, rotation }) {
  const textColor = '#080808'

  return (
    <div
      className="skill-card-wrap"
      style={{ width: '240px', height: '420px', transform: `rotate(${rotation}deg)` }}
    >
      <div className="skill-card-inner">
        {/* Front */}
        <div className="skill-card-face" style={{ background: bg, justifyContent: 'space-between' }}>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '56px', color: textColor, lineHeight: 0.9, letterSpacing: '0.01em' }}>
            {name}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, color: textColor, opacity: 0.22 }}>
            <Icon />
          </div>

          <div>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '12px', color: textColor, opacity: 0.65, letterSpacing: '0.04em', marginBottom: '0.75rem' }}>
              {oneliner}
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', color: textColor, opacity: 0.5, background: 'rgba(8,8,8,0.1)', padding: '3px 10px', borderRadius: '100px', letterSpacing: '0.06em' }}>
                {usedIn}
              </span>
            </div>
          </div>
        </div>

        {/* Back */}
        <div className="skill-card-face skill-card-back">
          <div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '40px', color: '#080808', letterSpacing: '0.02em', lineHeight: 0.9, marginBottom: '1.5rem' }}>
              {name}
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {bullets.map((b) => (
                <li key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <span style={{ color: bg, fontSize: '14px', lineHeight: '20px', flexShrink: 0 }}>→</span>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '12px', color: '#080808', lineHeight: 1.5, letterSpacing: '0.03em' }}>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ borderTop: '1px solid rgba(8,8,8,0.12)', paddingTop: '0.75rem' }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', color: 'rgba(8,8,8,0.45)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {usedIn}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Skills() {
  const sectionRef = useRef(null)
  const trackRef   = useRef(null)

  useGSAP(() => {
    const track = trackRef.current
    gsap.to(track, {
      x: () => -(track.scrollWidth - window.innerWidth + 80),
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: 1,
        end: () => '+=' + (track.scrollWidth - window.innerWidth + 80),
        invalidateOnRefresh: true,
      },
    })
  }, { scope: sectionRef })

  return (
    <section
      id="section-skills"
      ref={sectionRef}
      style={{ height: '100vh', background: '#0A0A0A', display: 'flex', alignItems: 'center', overflow: 'hidden', position: 'relative' }}
    >
      <div style={{ position: 'absolute', top: '3rem', left: 'clamp(2rem, 5vw, 5rem)', fontFamily: "'DM Mono', monospace", fontSize: '11px', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase' }}>
        Skills &amp; Stack
      </div>

      <div
        ref={trackRef}
        style={{ display: 'flex', gap: '2rem', paddingLeft: 'clamp(2rem, 5vw, 5rem)', paddingRight: '5rem', willChange: 'transform', alignItems: 'center' }}
      >
        {SKILLS.map((skill, i) => (
          <SkillCard key={skill.name} {...skill} rotation={ROTATIONS[i]} />
        ))}
      </div>
    </section>
  )
}
