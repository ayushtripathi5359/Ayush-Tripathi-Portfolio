import { useState, useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { emit } from '../data/profile.js'

const LINKS = [
  { label: 'Work',       href: '#section-projects' },
  { label: 'Experience', href: '#section-experience' },
  { label: 'Skills',     href: '#section-skills' },
  { label: 'Contact',    href: '#section-contact' },
]

function NavItem({ label, href, onClick }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: '11px',
        letterSpacing: '0.2em',
        color: hovered ? '#ffffff' : 'rgba(255,255,255,0.5)',
        position: 'relative',
        transition: 'color 0.2s ease',
        textTransform: 'uppercase',
      }}
    >
      {label}
      <span style={{
        position: 'absolute',
        bottom: '-3px',
        left: 0,
        width: '100%',
        height: '1px',
        background: '#FFD166',
        transformOrigin: 'left',
        transform: `scaleX(${hovered ? 1 : 0})`,
        transition: 'transform 0.25s ease',
      }} />
    </a>
  )
}

export default function Nav() {
  const [visible, setVisible] = useState(false)
  const [open, setOpen]       = useState(false)

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: '#section-about',
      start: 'top top+=80',
      onEnter: () => setVisible(true),
      onLeaveBack: () => { setVisible(false); setOpen(false) },
    })
    return () => trigger.kill()
  }, [])

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 9995,
      padding: '1.1rem clamp(1.25rem, 5vw, 5rem)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: visible ? 'rgba(8,8,8,0.94)' : 'transparent',
      opacity: visible ? 1 : 0,
      pointerEvents: visible ? 'auto' : 'none',
      transition: 'opacity 0.4s ease, background 0.4s ease',
    }}>
      <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '22px', color: '#ffffff', letterSpacing: '0.05em' }}>
        AYUSH TRIPATHI
      </span>

      {/* Desktop links */}
      <div className="nav-links" style={{ display: 'flex', gap: 'clamp(1.25rem, 2.2vw, 2.5rem)', alignItems: 'center' }}>
        {LINKS.map(l => <NavItem key={l.href} {...l} />)}
        <button className="pill-btn" onClick={() => emit('app:terminal')} aria-label="Open terminal" title="Terminal (press `)">&gt;_</button>
        <button className="pill-btn pill-btn-gold" onClick={() => emit('app:recruiter', true)}>Recruiter mode</button>
      </div>

      {/* Mobile menu */}
      <button
        className="nav-toggle"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-label="Toggle menu"
        style={{
          display: 'none', background: 'none', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '100px',
          color: '#FFD166', fontFamily: "'DM Mono', monospace", fontSize: '11px', letterSpacing: '0.2em',
          padding: '0.45rem 0.9rem', textTransform: 'uppercase',
        }}
      >
        {open ? 'Close' : 'Menu'}
      </button>

      {open && (
        <div className="nav-panel" style={{
          position: 'absolute', top: '100%', left: 0, right: 0, background: 'rgba(8,8,8,0.98)',
          padding: '1.5rem clamp(1.25rem, 5vw, 5rem) 2rem', display: 'none', flexDirection: 'column', gap: '1.4rem',
          borderTop: '1px solid rgba(255,255,255,0.08)',
        }}>
          {LINKS.map(l => <NavItem key={l.href} {...l} onClick={() => setOpen(false)} />)}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button className="pill-btn pill-btn-gold" onClick={() => { setOpen(false); emit('app:recruiter', true) }}>Recruiter mode</button>
            <button className="pill-btn" onClick={() => { setOpen(false); emit('app:terminal') }}>&gt;_ Terminal</button>
            <button className="pill-btn" onClick={() => { setOpen(false); emit('app:game') }}>Bug Squash</button>
          </div>
          <a href="/Ayush-Tripathi-Resume.pdf" target="_blank" rel="noopener noreferrer"
            style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', letterSpacing: '0.2em', color: '#FFD166', textTransform: 'uppercase' }}>
            Resume ↗
          </a>
        </div>
      )}
    </nav>
  )
}
