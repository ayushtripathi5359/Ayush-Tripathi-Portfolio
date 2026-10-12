import { useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const QUOTE_LINES = [
  '"I obsess over the',
  'details nobody notices',
  'but everybody feels."',
]

const STATS = [
  { num: 1,   suffix: '+', label: 'Years in production' },
  { num: 20,  suffix: '+', label: 'Production issues resolved' },
  { num: 200, suffix: '+', label: 'LeetCode problems solved' },
]

function StatItem({ num, suffix, label, isLast }) {
  const numRef  = useRef(null)
  const itemRef = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const el = numRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return
        started.current = true
        observer.disconnect()

        if (num === null) {
          el.textContent = '∞'
          return
        }
        const obj = { val: 0 }
        gsap.to(obj, {
          val: num,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate() {
            el.textContent = Math.round(obj.val) + suffix
          },
        })
      },
      { threshold: 0.5 }
    )
    observer.observe(itemRef.current)
    return () => observer.disconnect()
  }, [num, suffix])

  return (
    <div ref={itemRef} style={{ paddingBottom: isLast ? 0 : '2rem', marginBottom: isLast ? 0 : '2rem', borderBottom: isLast ? 'none' : '1px solid rgba(8,8,8,0.15)' }}>
      <div
        ref={numRef}
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 'clamp(80px, 10vw, 120px)',
          color: '#080808',
          lineHeight: 0.85,
          letterSpacing: '0.01em',
        }}
      >
        {num === null ? '∞' : `0${suffix}`}
      </div>
      <p style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: '13px',
        color: 'rgba(8,8,8,0.55)',
        letterSpacing: '0.08em',
        marginTop: '0.5rem',
        textTransform: 'uppercase',
      }}>
        {label}
      </p>
    </div>
  )
}

export default function About() {
  const sectionRef = useRef(null)
  const lineRefs   = useRef([])

  useGSAP(() => {
    lineRefs.current.forEach((line, i) => {
      if (!line) return
      gsap.from(line, {
        x: -70,
        opacity: 0,
        duration: 1,
        delay: i * 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
        },
      })
    })
  }, { scope: sectionRef })

  return (
    <section
      id="section-about"
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        background: '#FFD166',
        display: 'flex',
        alignItems: 'center',
        padding: 'clamp(5rem, 8vw, 8rem) clamp(2rem, 8vw, 8rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Watermark number */}
      <div style={{
        position: 'absolute',
        left: '-0.05em',
        top: '50%',
        transform: 'translateY(-50%)',
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: 'clamp(300px, 50vw, 700px)',
        color: 'rgba(8,8,8,0.07)',
        lineHeight: 1,
        userSelect: 'none',
        pointerEvents: 'none',
        letterSpacing: '-0.03em',
      }}>
        03
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'clamp(3rem, 8vw, 8rem)',
        maxWidth: '1400px',
        width: '100%',
        position: 'relative',
        zIndex: 1,
        flexWrap: 'wrap',
      }}>
        {/* Quote */}
        <div style={{ flex: '1 1 55%', minWidth: '280px' }}>
          {QUOTE_LINES.map((line, i) => (
            <p
              key={i}
              ref={el => (lineRefs.current[i] = el)}
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontStyle: 'italic',
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                color: '#080808',
                lineHeight: 1.2,
              }}
            >
              {line}
            </p>
          ))}
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(1rem, 1.4vw, 1.125rem)', color: 'rgba(8,8,8,0.8)', lineHeight: 1.65, maxWidth: '52ch', marginTop: '2rem' }}>
            Full stack developer building web and mobile apps with React, Next.js, React Native and Node.js. I implement new features, optimize performance, integrate payment systems, build REST APIs and ship AI-powered workflows.
          </p>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '12px', letterSpacing: '0.1em', color: 'rgba(8,8,8,0.55)', textTransform: 'uppercase', marginTop: '1.25rem', lineHeight: 1.6 }}>
            B.Tech, Computer Science &amp; Engineering · 2021–2025<br />SRMS College of Engineering and Technology
          </p>
        </div>

        {/* Stats */}
        <div style={{ flex: '1 1 35%', minWidth: '220px' }}>
          {STATS.map((s, i) => (
            <StatItem key={s.label} {...s} isLast={i === STATS.length - 1} />
          ))}
        </div>
      </div>
    </section>
  )
}
