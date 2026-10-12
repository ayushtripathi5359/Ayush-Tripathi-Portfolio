import { useRef, useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

/* ── Animated mockup components ──────────────────────────── */
function OrbitalMockup() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#080808', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
      <div style={{ position: 'relative', width: '110px', height: '110px' }}>
        <div style={{ position: 'absolute', inset: 0, border: '1px solid rgba(255,107,107,0.45)', borderRadius: '50%', animation: 'mockupOrbit 4s linear infinite' }} />
        <div style={{ position: 'absolute', inset: '18px', border: '1px solid rgba(255,209,102,0.3)', borderRadius: '50%', animation: 'mockupOrbit 2.5s linear infinite reverse' }} />
        <div style={{ position: 'absolute', inset: '38px', background: 'radial-gradient(circle, #FF6B6B, #cc3344)', borderRadius: '50%', boxShadow: '0 0 22px rgba(255,107,107,0.5)' }} />
        <div style={{ position: 'absolute', width: '8px', height: '8px', background: '#FFD166', borderRadius: '50%', top: '-4px', left: '51px', boxShadow: '0 0 10px #FFD166', animation: 'mockupDot 4s linear infinite' }} />
        <div style={{ position: 'absolute', width: '5px', height: '5px', background: '#4ECDC4', borderRadius: '50%', top: '8px', left: '8px', boxShadow: '0 0 8px #4ECDC4', animation: 'mockupDot 2.5s linear infinite reverse' }} />
      </div>
    </div>
  )
}

function FluxMockup() {
  const bars = [62, 78, 45, 92, 68, 55, 83, 60, 74, 50]
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#0d1117', display: 'flex', flexDirection: 'column', padding: '18px', gap: '10px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ECDC4', animation: 'mockupBlink 1.2s ease-in-out infinite' }} />
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '9px', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.35)' }}>LIVE · BOOKINGS</span>
        <span style={{ marginLeft: 'auto', fontFamily: "'DM Mono', monospace", fontSize: '9px', color: '#4ECDC4' }}>MOBILE</span>
      </div>
      <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-end', flex: 1 }}>
        {bars.map((h, i) => (
          <div key={i} style={{ flex: 1, background: `linear-gradient(to top, #4ECDC4, rgba(78,205,196,0.25))`, height: `${h}%`, borderRadius: '3px 3px 0 0', animation: `mockupBarWave ${1.2 + i * 0.14}s ease-in-out infinite alternate` }} />
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {['1H','6H','1D','1W'].map(t => (
          <span key={t} style={{ fontFamily: "'DM Mono', monospace", fontSize: '8px', color: t === '1D' ? '#4ECDC4' : 'rgba(255,255,255,0.2)', letterSpacing: '0.05em' }}>{t}</span>
        ))}
      </div>
    </div>
  )
}

function PrismMockup() {
  const palette = ['#C77DFF','#FFD166','#FF6B6B','#4ECDC4','#080808','#F5F0E8']
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#f8f5f0', display: 'flex', flexDirection: 'column', padding: '18px', gap: '12px' }}>
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '9px', letterSpacing: '0.12em', color: 'rgba(8,8,8,0.4)' }}>LISTINGS · VEHICLES · PROPERTY</span>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '7px' }}>
        {palette.map((color, i) => (
          <div key={i} style={{ background: color, height: '34px', borderRadius: '7px', animation: `mockupSwatchPop ${0.8 + i * 0.12}s ease-in-out infinite alternate`, border: color === '#f8f5f0' ? '1px solid rgba(8,8,8,0.1)' : 'none' }} />
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        {[85, 65, 92].map((w, i) => (
          <div key={i} style={{ height: '7px', width: `${w}%`, background: 'rgba(8,8,8,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ height: '100%', background: palette[i], borderRadius: '4px', animation: `mockupBarWave ${1 + i * 0.3}s ease-in-out infinite alternate` }} />
          </div>
        ))}
      </div>
    </div>
  )
}

function GemMockup() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#0d0d12', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(199,125,255,0.18), transparent 60%)' }} />
      <svg width="120" height="120" viewBox="0 0 100 100" fill="none" stroke="#C77DFF" strokeWidth="1.6" style={{ animation: 'mockupOrbit 8s linear infinite' }}>
        <polygon points="25,22 75,22 94,42 50,92 6,42" strokeLinejoin="round" />
        <polyline points="6,42 94,42" />
        <polyline points="25,22 36,42 50,92 64,42 75,22" strokeLinejoin="round" />
        <polyline points="36,42 50,22 64,42" strokeLinejoin="round" />
      </svg>
      <span style={{ position: 'absolute', top: '16px', left: '18px', fontFamily: "'DM Mono', monospace", fontSize: '9px', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.35)' }}>IN PROGRESS</span>
    </div>
  )
}

const MOCKUPS = { orbital: OrbitalMockup, flux: FluxMockup, prism: PrismMockup, gem: GemMockup }

/* ── Data ─────────────────────────────────────────────────── */
const PROJECTS = [
  { num: '01', name: 'SIX',                tags: 'Next.js · Redux-Saga',        accent: '#FF6B6B', desc: 'Vehicle & property marketplace for buyers, sellers and dealers', mockup: 'prism',   href: 'https://www.six.ind.in/' },
  { num: '02', name: 'MYSTAYINN',          tags: 'React Native · Cashfree',     accent: '#4ECDC4', desc: 'Customer app · 15+ APIs, Cashfree payments, 30% faster screens', mockup: 'flux',    href: 'https://play.google.com/store/apps/details?id=in.co.mystayinn.customer' },
  { num: '03', name: 'MYSTAYINN BUSINESS', tags: 'React Native · Redux-Saga',   accent: '#4ECDC4', desc: 'Property-management app for hosts and business owners', mockup: 'flux',    href: 'https://play.google.com/store/apps/details?id=in.co.mystayinn.business' },
  { num: '04', name: 'PRESTIGIOUS GAMING', tags: 'React · Tailwind CSS',        accent: '#FFD166', desc: 'Production company website · responsive across devices', mockup: 'orbital', href: 'https://www.prestigiousgaming.in/' },
  { num: '05', name: 'KARIGAR',            tags: 'Expo · FastAPI · RAG · PayU', accent: '#C77DFF', desc: 'In progress · diamond & jewellery commerce with an AI concierge', mockup: 'gem' },
]

function ProjectRow({ num, name, tags, accent, desc, mockup, href, index, onEnter, onLeave }) {
  const rowRef  = useRef(null)
  const numRef  = useRef(null)
  const nameRef = useRef(null)
  const tagsRef = useRef(null)
  const viewRef = useRef(null)
  const [hovered, setHovered] = useState(false)

  useGSAP(() => {
    gsap.from(numRef.current,  { x: -60, opacity: 0, duration: 0.7, ease: 'power2.out', scrollTrigger: { trigger: rowRef.current, start: 'top 80%' } })
    gsap.from(nameRef.current, { x:  60, opacity: 0, duration: 0.7, ease: 'power2.out', scrollTrigger: { trigger: rowRef.current, start: 'top 80%' } })
    gsap.from(tagsRef.current, { y:  20, opacity: 0, duration: 0.5, delay: 0.15, ease: 'power2.out', scrollTrigger: { trigger: rowRef.current, start: 'top 80%' } })
  }, { scope: rowRef })

  const handleEnter = () => {
    setHovered(true)
    gsap.to(nameRef.current, { x: 22,    duration: 0.35, ease: 'power2.out' })
    gsap.to(viewRef.current, { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' })
    onEnter({ name, num, tags, accent, mockup })
  }
  const handleLeave = () => {
    setHovered(false)
    gsap.to(nameRef.current, { x: 0,     duration: 0.35, ease: 'power2.out' })
    gsap.to(viewRef.current, { y: 8, opacity: 0, duration: 0.25, ease: 'power2.in' })
    onLeave()
  }

  const Row = href ? 'a' : 'div'
  const linkProps = href ? { href, target: '_blank', rel: 'noopener noreferrer' } : {}

  return (
    <Row
      {...linkProps}
      ref={rowRef}
      data-cursor={href ? 'VIEW' : 'SOON'}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        borderTop: index === 0 ? '1px solid rgba(8,8,8,0.12)' : 'none',
        borderBottom: '1px solid rgba(8,8,8,0.12)',
        padding: 'clamp(1.4rem, 2.5vw, 2.2rem) 0',
        display: 'flex', alignItems: 'center',
        gap: 'clamp(1rem, 3vw, 3rem)',
        background: hovered ? `${accent}14` : 'transparent',
        transition: 'background 0.35s ease',
        overflow: 'hidden', position: 'relative',
      }}
    >
      <span ref={numRef} style={{ fontFamily: "'DM Mono', monospace", fontSize: '13px', color: 'rgba(8,8,8,0.35)', letterSpacing: '0.1em', minWidth: '36px' }}>
        {num}
      </span>
      <div style={{ flex: '1 0 auto', position: 'relative' }}>
        <span ref={nameRef} style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2.25rem, 5.5vw, 4.75rem)', color: '#080808', letterSpacing: '0.02em', lineHeight: 0.9, display: 'block', willChange: 'transform' }}>
          {name}
        </span>
        <span ref={viewRef} style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', letterSpacing: '0.15em', color: accent, position: 'absolute', bottom: '-18px', left: 0, opacity: 0, transform: 'translateY(8px)', textTransform: 'uppercase' }}>
          {desc}
        </span>
      </div>
      <span ref={tagsRef} style={{ fontFamily: "'DM Mono', monospace", fontSize: '13px', color: 'rgba(8,8,8,0.45)', letterSpacing: '0.05em', textAlign: 'right' }}>
        {tags}
      </span>
      <span style={{
        fontFamily: "'DM Mono', monospace", fontSize: '20px',
        color: hovered ? accent : 'rgba(8,8,8,0.3)',
        transform: hovered ? 'rotate(-45deg)' : 'rotate(0deg)',
        transition: 'transform 0.35s ease, color 0.3s ease',
        marginLeft: 'auto', paddingRight: '0.25rem', flexShrink: 0,
      }}>→</span>
    </Row>
  )
}

/* ── Main section ─────────────────────────────────────────── */
export default function Projects() {
  const sectionRef   = useRef(null)
  const previewRef   = useRef(null)
  const labelRef     = useRef(null)
  const [active, setActive] = useState(null)

  useEffect(() => {
    const onMove = (e) => {
      if (!previewRef.current) return
      gsap.to(previewRef.current, {
        x: e.clientX - 190, y: e.clientY - 130,
        duration: 0.5, ease: 'power3.out', overwrite: 'auto',
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useGSAP(() => {
    gsap.from(labelRef.current, {
      opacity: 0, y: 20, duration: 0.7, ease: 'power2.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
    })
  }, { scope: sectionRef })

  const handleEnter = (project) => {
    setActive(project)
    window.dispatchEvent(new Event('projectRowEnter'))
    gsap.fromTo(previewRef.current,
      { scale: 0, rotation: 0, opacity: 0 },
      { scale: 1, rotation: -3, opacity: 1, duration: 0.42, ease: 'back.out(1.7)' }
    )
  }
  const handleLeave = () => {
    window.dispatchEvent(new Event('projectRowLeave'))
    gsap.to(previewRef.current, { scale: 0, opacity: 0, duration: 0.25, ease: 'power2.in' })
  }

  const ActiveMockup = active ? MOCKUPS[active.mockup] : null

  return (
    <section
      id="section-projects"
      ref={sectionRef}
      style={{ minHeight: '100vh', background: '#F5F0E8', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(5rem, 10vw, 10rem) clamp(2rem, 8vw, 8rem)' }}
    >
      <p ref={labelRef} style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', letterSpacing: '0.3em', color: 'rgba(8,8,8,0.4)', textTransform: 'uppercase', marginBottom: 'clamp(3rem, 5vw, 5rem)' }}>
        Selected Work
      </p>

      <div>
        {PROJECTS.map((proj, i) => (
          <ProjectRow key={proj.num} {...proj} index={i} onEnter={handleEnter} onLeave={handleLeave} />
        ))}
      </div>

      {/* Floating animated preview */}
      <div
        ref={previewRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: '380px', height: '260px',
          borderRadius: '16px',
          pointerEvents: 'none', zIndex: 9990,
          opacity: 0, overflow: 'hidden',
          boxShadow: '0 30px 80px rgba(0,0,0,0.25)',
          willChange: 'transform',
        }}
      >
        {ActiveMockup && <ActiveMockup />}
        {/* Overlay info strip */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(8,8,8,0.7)', backdropFilter: 'blur(12px)', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '22px', color: '#ffffff', letterSpacing: '0.05em' }}>
            {active ? active.name : ''}
          </span>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '10px', color: active ? active.accent : '#FFD166', letterSpacing: '0.1em' }}>
            {active ? active.tags : ''}
          </span>
        </div>
      </div>
    </section>
  )
}
