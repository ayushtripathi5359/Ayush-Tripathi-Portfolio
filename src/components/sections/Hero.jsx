import { useRef, useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { emit } from '../../data/profile.js'

const LINE1 = 'AYUSH'.split('')
const LINE2 = 'TRIPATHI'.split('')

const MONO = "'DM Mono', monospace"
const GOLD = '#FFD166'

const goldText = {
  background: 'linear-gradient(180deg, #FFD166 35%, #8a6a24 100%)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  color: 'transparent',
}

function NavLink({ label, href, external, gold, optional }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={href}
      className={optional ? 'hero-nav-opt' : undefined}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      data-cursor="→"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: MONO, fontSize: '11px', letterSpacing: '0.2em',
        color: gold ? GOLD : hovered ? '#ffffff' : 'rgba(255,255,255,0.75)',
        position: 'relative', transition: 'color 0.2s ease',
      }}
    >
      {label}
      <span style={{
        position: 'absolute', bottom: '-3px', left: 0, width: '100%', height: '1px',
        background: GOLD, transformOrigin: 'left',
        transform: `scaleX(${hovered ? 1 : 0})`, transition: 'transform 0.25s ease',
      }} />
    </a>
  )
}

/* Fine-line ring graphic — reacts to the cursor with layered parallax */
function Ring({ outerRef, innerRef, crossRef }) {
  return (
    <div
      className="hero-ring"
      style={{
        position: 'absolute', right: 'clamp(-8rem, -6vw, -2rem)', top: '50%',
        width: 'min(46vw, 78vh)', aspectRatio: '1', transform: 'translateY(-50%)',
        pointerEvents: 'none', zIndex: 1,
      }}
    >
      <div ref={outerRef} style={{ position: 'absolute', inset: 0 }}>
        <svg viewBox="0 0 100 100" width="100%" height="100%" fill="none">
          <circle cx="50" cy="50" r="49.5" stroke="rgba(255,209,102,0.3)" strokeWidth="0.15" />
        </svg>
      </div>
      <div ref={innerRef} style={{ position: 'absolute', inset: '22%' }}>
        <svg viewBox="0 0 100 100" width="100%" height="100%" fill="none">
          <circle cx="50" cy="50" r="49.5" stroke="rgba(255,209,102,0.16)" strokeWidth="0.2" strokeDasharray="0.6 1.6" />
        </svg>
      </div>
      <div ref={crossRef} style={{ position: 'absolute', left: '50%', top: '50%', width: '28px', height: '28px', margin: '-14px 0 0 -14px' }}>
        <svg viewBox="0 0 28 28" width="28" height="28" stroke={GOLD} strokeWidth="1" opacity="0.8">
          <line x1="14" y1="0" x2="14" y2="28" />
          <line x1="0" y1="14" x2="28" y2="14" />
        </svg>
      </div>
    </div>
  )
}

export default function Hero() {
  const sectionRef   = useRef(null)
  const line1Refs    = useRef([])
  const line2Refs    = useRef([])
  const roleRef      = useRef(null)
  const introRef     = useRef(null)
  const ringOuter    = useRef(null)
  const ringInner    = useRef(null)
  const ringCross    = useRef(null)
  const physicsReady = useRef(false)

  /* ── Initial entrance animation ──────────────────────── */
  useGSAP(() => {
    const allChars = [...line1Refs.current, ...line2Refs.current].filter(Boolean)
    const chrome   = sectionRef.current.querySelectorAll('.hero-fade')

    const start = () => {
      const tl = gsap.timeline({
        onComplete: () => { physicsReady.current = true },
      })
      tl.from(allChars, {
        x:        () => gsap.utils.random(-220, 220),
        y:        () => gsap.utils.random(-180, 180),
        rotation: () => gsap.utils.random(-45, 45),
        scale:    () => gsap.utils.random(0.4, 1.6),
        opacity: 0,
        duration: () => gsap.utils.random(0.8, 1.3),
        stagger: { each: 0.05, from: 'random' },
        ease: 'power3.out',
      })
        .fromTo(roleRef.current,
          { clipPath: 'inset(0 100% 0 0)' },
          { clipPath: 'inset(0 0% 0 0)', duration: 1, ease: 'power2.inOut' },
          '-=0.8'
        )
        .fromTo(introRef.current,
          { clipPath: 'inset(0 100% 0 0)' },
          { clipPath: 'inset(0 0% 0 0)', duration: 1, ease: 'power2.inOut' },
          '-=0.6'
        )
        .from(chrome, { opacity: 0, duration: 1, stagger: 0.08, ease: 'power2.out' }, '-=0.9')
        .from([ringOuter.current, ringInner.current], {
          opacity: 0, scale: 0.9, duration: 1.4, stagger: 0.15, ease: 'power3.out',
        }, '-=1.2')
    }

    window.addEventListener('loadComplete', start, { once: true })
    return () => window.removeEventListener('loadComplete', start)
  }, { scope: sectionRef })

  /* ── Chaos mode easter egg ───────────────────────────── */
  useEffect(() => {
    const allChars = [...line1Refs.current, ...line2Refs.current].filter(Boolean)

    const onChaos = () => {
      gsap.to(allChars, {
        x:        () => gsap.utils.random(-600, 600),
        y:        () => gsap.utils.random(-400, 400),
        rotation: () => gsap.utils.random(-180, 180),
        scale:    () => gsap.utils.random(0.3, 2.5),
        stagger:  { each: 0.03, from: 'random' },
        ease: 'power3.out', duration: 0.55, overwrite: true,
      })
      gsap.to(allChars, {
        x: 0, y: 0, rotation: 0, scale: 1,
        stagger:  { each: 0.04, from: 'center' },
        ease: 'elastic.out(1, 0.28)', duration: 1.6, delay: 0.7, overwrite: false,
      })
    }

    window.addEventListener('chaosMode', onChaos)
    return () => window.removeEventListener('chaosMode', onChaos)
  }, [])

  /* ── Letter proximity physics + ring parallax ────────── */
  useEffect(() => {
    const allChars = [...line1Refs.current, ...line2Refs.current].filter(Boolean)

    /* Cache rects after mount (updated on resize) */
    const cached = allChars.map(el => ({ el, cx: 0, cy: 0 }))
    const cacheRects = () => {
      cached.forEach(c => {
        const r = c.el.getBoundingClientRect()
        c.cx = r.left + r.width  / 2
        c.cy = r.top  + r.height / 2
      })
    }
    /* Wait until initial animation is done before caching */
    const initTimer = setTimeout(cacheRects, 2500)
    window.addEventListener('resize', cacheRects)

    /* quickTo — cheap, reusable tweens for the ring layers */
    const q = (el, prop, d) => gsap.quickTo(el, prop, { duration: d, ease: 'power3.out' })
    const oX = q(ringOuter.current, 'x', 1.4), oY = q(ringOuter.current, 'y', 1.4)
    const iX = q(ringInner.current, 'x', 1.0), iY = q(ringInner.current, 'y', 1.0)
    const cX = q(ringCross.current, 'x', 0.7), cY = q(ringCross.current, 'y', 0.7)

    const RADIUS = 180

    const onMove = (e) => {
      const { clientX: mx, clientY: my } = e

      /* ring parallax: normalised -0.5 … 0.5 */
      const nx = mx / window.innerWidth  - 0.5
      const ny = my / window.innerHeight - 0.5
      oX(-nx * 28); oY(-ny * 28)
      iX( nx * 46); iY( ny * 46)
      cX( nx * 120); cY(ny * 120)

      if (!physicsReady.current) return

      cached.forEach(({ el, cx, cy }) => {
        const dx   = mx - cx
        const dy   = my - cy
        const dist = Math.hypot(dx, dy)

        if (dist < RADIUS) {
          const strength = (RADIUS - dist) / RADIUS
          const angle    = Math.atan2(dy, dx)
          gsap.to(el, {
            x:        -Math.cos(angle) * strength * 55,
            y:        -Math.sin(angle) * strength * 32,
            rotation: -Math.sin(angle) * strength * 12,
            ease: 'power2.out', duration: 0.35, overwrite: 'auto',
          })
        } else {
          gsap.to(el, {
            x: 0, y: 0, rotation: 0,
            ease: 'elastic.out(1, 0.25)', duration: 1.5, overwrite: 'auto',
          })
        }
      })
    }

    window.addEventListener('mousemove', onMove)
    return () => {
      clearTimeout(initTimer)
      window.removeEventListener('resize', cacheRects)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  const letterStyle = { display: 'inline-block', willChange: 'transform' }

  return (
    <section
      id="section-hero"
      ref={sectionRef}
      style={{ height: '100svh', minHeight: '520px', background: '#080808', position: 'relative', overflow: 'hidden' }}
    >
      {/* Film grain */}
      <div style={{
        position: 'absolute', inset: '-10%', width: '120%', height: '120%', backgroundSize: '200px 200px', willChange: 'transform',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        opacity: 0.05, pointerEvents: 'none', animation: 'grain 0.4s steps(1) infinite', zIndex: 0,
      }} />

      {/* Left rail line */}
      <div className="hero-fade" style={{ position: 'absolute', left: 'clamp(1.75rem, 8vw, 8rem)', top: 0, bottom: 0, width: '1px', background: 'rgba(255,255,255,0.07)', zIndex: 1 }} />

      {/* Top bar: monogram · hairline · nav */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: 'clamp(1.25rem, 2.5vw, 2.25rem) clamp(1.5rem, 3vw, 3.5rem)', display: 'flex', alignItems: 'center', gap: '2rem', zIndex: 3 }}>
        <div className="hero-fade" style={{ width: '44px', height: '44px', borderRadius: '50%', border: `1px solid rgba(255,209,102,0.6)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: GOLD, fontSize: '18px', flexShrink: 0 }}>
          A
        </div>
        <div className="hero-fade hero-hairline" style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
        <nav className="hero-fade" style={{ display: 'flex', gap: 'clamp(1rem, 2.5vw, 2.75rem)', alignItems: 'center', justifyContent: 'flex-end', marginLeft: 'auto' }}>
          <NavLink optional label="WORK"       href="#section-projects" />
          <NavLink optional label="EXPERIENCE" href="#section-experience" />
          <NavLink optional label="SKILLS"     href="#section-skills" />
          <NavLink optional label="CONTACT"    href="#section-contact" />
          <button className="pill-btn hero-nav-opt" data-cursor="→" onClick={() => emit('app:terminal')} aria-label="Open terminal" title="Terminal (press `)">&gt;_</button>
          <button className="pill-btn pill-btn-gold" data-cursor="→" onClick={() => emit('app:recruiter', true)}>Recruiter mode</button>
          <NavLink label="RESUME ↗"   href="/Ayush-Tripathi-Resume.pdf" external gold />
        </nav>
      </div>

      {/* Main content */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: 'clamp(3.5rem, 13vw, 15rem)', paddingRight: '1.25rem', zIndex: 2 }}>
        {/* Role label */}
        <div ref={roleRef} style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem', marginBottom: 'clamp(1rem, 2vw, 1.75rem)' }}>
          <span style={{ width: '24px', height: '1px', background: GOLD, marginTop: '0.55em', flexShrink: 0 }} />
          <p style={{ fontFamily: MONO, fontSize: 'clamp(10px, 0.9vw, 13px)', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', lineHeight: 1.7 }}>
            Full Stack Developer<br />Bengaluru, India
          </p>
        </div>

        {/* Name */}
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(64px, 12.5vw, 210px)', lineHeight: 0.86, letterSpacing: '0.01em' }}>
          <div style={{ display: 'flex', color: '#F5F3EE' }}>
            {LINE1.map((ch, i) => (
              <span key={i} ref={el => (line1Refs.current[i] = el)} style={letterStyle}>{ch}</span>
            ))}
          </div>
          <div style={{ display: 'flex' }}>
            {LINE2.map((ch, i) => (
              <span key={i} ref={el => (line2Refs.current[i] = el)} style={{ ...letterStyle, ...goldText }}>{ch}</span>
            ))}
          </div>
        </div>

        {/* Intro */}
        <div ref={introRef} style={{ marginTop: 'clamp(1.5rem, 3vw, 2.5rem)', display: 'flex', gap: '1.25rem', maxWidth: '44ch' }}>
          <span style={{ width: '1px', background: 'rgba(255,255,255,0.2)', flexShrink: 0 }} />
          <p style={{ fontFamily: MONO, fontSize: 'clamp(11px, 1vw, 14px)', letterSpacing: '0.16em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', lineHeight: 1.8 }}>
            Building web, mobile &amp; AI products that hold up in production.
          </p>
        </div>
      </div>

      <Ring outerRef={ringOuter} innerRef={ringInner} crossRef={ringCross} />

      {/* Scroll indicator */}
      <div className="hero-fade" style={{ position: 'absolute', left: 'clamp(1.75rem, 8vw, 8rem)', bottom: 'clamp(1.5rem, 3vw, 2.5rem)', marginLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.9rem', zIndex: 2 }}>
        <span style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.25em', color: 'rgba(255,255,255,0.5)' }}>SCROLL</span>
        <span style={{ color: GOLD, fontSize: '22px', lineHeight: 1, animation: 'heroNudge 2s ease-in-out infinite' }}>↓</span>
      </div>

      {/* Tagline */}
      <div className="hero-fade hero-tag" style={{ position: 'absolute', right: 'clamp(1.5rem, 3vw, 3.5rem)', bottom: 'clamp(1.5rem, 3vw, 2.5rem)', fontFamily: MONO, fontSize: '10px', letterSpacing: '0.25em', color: 'rgba(255,255,255,0.35)', zIndex: 2 }}>
        CODE · DESIGN · BUILD · REPEAT
      </div>
    </section>
  )
}
