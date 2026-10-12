import { useEffect, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const SECTIONS = [
  'section-hero',
  'section-about',
  'section-skills',
  'section-experience',
  'section-projects',
  'section-process',
  'section-contact',
]

export default function SectionCount() {
  const [current, setCurrent] = useState(1)

  useEffect(() => {
    const triggers = SECTIONS.map((id, i) =>
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: 'top center',
        onEnter:     () => setCurrent(i + 1),
        onLeaveBack: () => setCurrent(Math.max(1, i)),
      })
    )
    return () => triggers.forEach((t) => t.kill())
  }, [])

  return (
    <div style={{
      position: 'fixed',
      right: '1.75rem',
      top: '50%',
      transform: 'translateY(-50%) rotate(90deg)',
      zIndex: 9990,
      pointerEvents: 'none',
    }}>
      <span style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: '10px',
        letterSpacing: '0.2em',
        color: 'rgba(128,128,128,0.8)',
        whiteSpace: 'nowrap',
      }}>
        {String(current).padStart(2, '0')} / {String(SECTIONS.length).padStart(2, '0')}
      </span>
    </div>
  )
}
