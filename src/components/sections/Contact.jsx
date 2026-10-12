import { useRef, useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { emit } from '../../data/profile.js'

const SOCIALS = [
  { label: 'Resume',   href: '/Ayush-Tripathi-Resume.pdf' },
  { label: 'GitHub',   href: 'https://github.com/ayushtripathi5359' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ayush-tripathi-74171b1b9/' },]

const PALETTE = ['#FFD166', '#FF6B6B', '#4ECDC4', '#C77DFF']
const EMAIL   = 'ayushtripathi5359@gmail.com'

function SocialLink({ label, href }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ fontFamily: "'DM Mono', monospace", fontSize: '13px', letterSpacing: '0.15em', color: hovered ? '#FFD166' : 'rgba(255,255,255,0.45)', position: 'relative', transition: 'color 0.25s ease', paddingBottom: '2px', textTransform: 'uppercase' }}
    >
      {label}
      <span style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '1px', background: '#FFD166', transformOrigin: 'left', transform: `scaleX(${hovered ? 1 : 0})`, transition: 'transform 0.3s ease' }} />
    </a>
  )
}

function EmailCTA() {
  const [charColors, setCharColors] = useState([])
  const chars = EMAIL.split('')

  const handleEnter = () => {
    const colors = chars.map(() => PALETTE[Math.floor(Math.random() * PALETTE.length)])
    setCharColors(colors)
  }
  const handleLeave = () => setCharColors([])

  return (
    <a
      href={`https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}`}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{ display: 'inline-block', lineHeight: 1 }}
    >
      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(1.2rem, 4.6vw, 5rem)', letterSpacing: '0.02em', lineHeight: 1, display: 'flex', flexWrap: 'wrap' }}>
        {chars.map((ch, i) => (
          <span
            key={i}
            style={{
              color: charColors[i] ?? '#ffffff',
              transition: `color 0.15s ease ${i * 0.03}s`,
              display: 'inline-block',
            }}
          >
            {ch === ' ' ? ' ' : ch}
          </span>
        ))}
      </div>
    </a>
  )
}

function Clock() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const update = () => {
      const t = new Date().toLocaleTimeString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      })
      setTime(t + ' IST')
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '13px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em' }}>
      {time}
    </span>
  )
}

export default function Contact() {
  const sectionRef  = useRef(null)
  const headlineRef = useRef(null)
  const emailRef    = useRef(null)
  const bottomRef   = useRef(null)

  useGSAP(() => {
    const lines = headlineRef.current.querySelectorAll('.cta-line')
    gsap.from(lines, {
      y: 110, stagger: 0.08, duration: 1.1, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
    })
    gsap.from(emailRef.current, {
      opacity: 0, y: 30, duration: 0.9, ease: 'power2.out',
      scrollTrigger: { trigger: emailRef.current, start: 'top 80%' },
    })
    gsap.from(bottomRef.current, {
      opacity: 0, y: 20, duration: 0.7, ease: 'power2.out',
      scrollTrigger: { trigger: bottomRef.current, start: 'top 88%' },
    })
  }, { scope: sectionRef })

  return (
    <section
      id="section-contact"
      ref={sectionRef}
      style={{ minHeight: '100vh', background: '#080808', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(5rem, 8vw, 8rem) clamp(1.5rem, 8vw, 8rem) 6rem', position: 'relative' }}
    >
      {/* Headline */}
      <div ref={headlineRef}>
        {["LET'S BUILD", 'SOMETHING', 'GREAT.'].map((line, i) => (
          <div key={i} style={{ overflow: 'hidden', lineHeight: 0.88, paddingBottom: '0.04em' }}>
            <div
              className="cta-line"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(3rem, 11vw, 10rem)',
                color: i === 2 ? '#FFD166' : '#ffffff',
                letterSpacing: '0.02em',
                lineHeight: 0.88,
              }}
            >
              {line}
            </div>
          </div>
        ))}
      </div>

      {/* Email */}
      <div ref={emailRef} style={{ marginTop: 'clamp(3rem, 5vw, 5rem)' }}>
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', letterSpacing: '0.25em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: '1rem' }}>
          Get in touch
        </p>
        <EmailCTA />
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '13px', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.06em' }}>
            📍 Currently in Bengaluru, India 🇮🇳
          </span>
          <Clock />
        </div>
      </div>

      {/* Socials */}
      <div
        ref={bottomRef}
        style={{ marginTop: '3rem', display: 'flex', gap: 'clamp(1.5rem, 3vw, 3rem)', flexWrap: 'wrap' }}
      >
        {SOCIALS.map((s) => (
          <SocialLink key={s.label} {...s} />
        ))}
      </div>

      {/* Extras */}
      <div style={{ marginTop: '2rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <button className="pill-btn" data-cursor="PLAY" onClick={() => emit('app:game')}>Play Bug Squash</button>
        <button className="pill-btn" data-cursor="→" onClick={() => emit('app:terminal')}>&gt;_ Open terminal</button>
        <button className="pill-btn pill-btn-gold" data-cursor="→" onClick={() => emit('app:recruiter', true)}>Recruiter mode</button>
      </div>

      {/* Footer bar */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, borderTop: '1px solid rgba(255,255,255,0.07)', padding: '1.2rem clamp(1.5rem, 8vw, 8rem)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '10px', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.22)', textTransform: 'uppercase' }}>
          Ayush Tripathi · Full Stack Developer
        </span>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '10px', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.22)' }}>
          ©2026
        </span>
      </div>
    </section>
  )
}
