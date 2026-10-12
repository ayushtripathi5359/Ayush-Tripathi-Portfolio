import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const SECTIONS = [
  { id: 'section-hero',     bg: '#080808', accent: '#FFD166' },
  { id: 'section-about',    bg: '#FFD166', accent: '#080808' },
  { id: 'section-skills',   bg: '#0A0A0A', accent: '#FFD166' },
  { id: 'section-experience', bg: '#FF6B6B', accent: '#080808' },
  { id: 'section-projects', bg: '#F5F0E8', accent: '#FF6B6B' },
  { id: 'section-process',  bg: '#C77DFF', accent: '#080808' },
  { id: 'section-contact',  bg: '#080808', accent: '#FFD166' },
]

function emitAccent(accent) {
  window.dispatchEvent(new CustomEvent('accentChange', { detail: accent }))
}

export default function useSectionColor() {
  useEffect(() => {
    const triggers = SECTIONS.map((section, i) => {
      const prev = SECTIONS[i - 1]
      return ScrollTrigger.create({
        trigger: `#${section.id}`,
        start: 'top center',
        onEnter: () => {
          gsap.to('body', { backgroundColor: section.bg, duration: 0.6, ease: 'power2.out' })
          emitAccent(section.accent)
        },
        onLeaveBack: prev
          ? () => {
              gsap.to('body', { backgroundColor: prev.bg, duration: 0.6, ease: 'power2.out' })
              emitAccent(prev.accent)
            }
          : undefined,
      })
    })
    return () => triggers.forEach((t) => t.kill())
  }, [])
}
