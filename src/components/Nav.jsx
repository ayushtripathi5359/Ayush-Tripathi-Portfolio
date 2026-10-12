import { useState, useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

function NavItem({ label, href }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={href}
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

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: '#section-about',
      start: 'top top+=80',
      onEnter: () => setVisible(true),
      onLeaveBack: () => setVisible(false),
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
      padding: '1.25rem clamp(2rem, 5vw, 5rem)',
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
      <div style={{ display: 'flex', gap: '2.5rem' }}>
        <NavItem label="Work"    href="#section-projects" />
        <NavItem label="Experience" href="#section-experience" />
        <NavItem label="Skills"  href="#section-skills"   />
        <NavItem label="Contact" href="#section-contact"  />
      </div>
    </nav>
  )
}
