import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const STEPS = [
  { num: '01', title: 'DISCOVER', body: 'I dig into the problem before touching code.', dir: -1 },
  { num: '02', title: 'DESIGN',   body: 'Mobile-first UI and clean API contracts before a line is built.', dir: 1 },
  { num: '03', title: 'BUILD',    body: 'React, React Native and Node.js. Fast screens, lean bundles.', dir: -1 },
  { num: '04', title: 'SHIP',     body: 'Payments, webhooks and AI workflows that hold up in production.', dir: 1 },
]

function ConnectorLine({ lineRef }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-start', paddingLeft: 'clamp(1rem, 3vw, 3rem)', margin: '0.5rem 0' }}>
      <svg width="2" height="60" viewBox="0 0 2 60" overflow="visible">
        <line
          ref={lineRef}
          x1="1" y1="0" x2="1" y2="60"
          stroke="rgba(8,8,8,0.25)"
          strokeWidth="1"
          strokeDasharray="60"
          strokeDashoffset="60"
        />
      </svg>
    </div>
  )
}

export default function Process() {
  const sectionRef  = useRef(null)
  const headlineRef = useRef(null)
  const stepRefs    = useRef([])
  const lineRefs    = useRef([])

  useGSAP(() => {
    gsap.from(headlineRef.current, {
      x: -80, opacity: 0, duration: 1.1, ease: 'power3.out',
      scrollTrigger: { trigger: headlineRef.current, start: 'top 80%' },
    })

    stepRefs.current.forEach((step, i) => {
      if (!step) return
      const dir = STEPS[i].dir
      gsap.from(step, {
        x: dir * 110,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: step, start: 'top 72%' },
      })
    })

    lineRefs.current.forEach((line) => {
      if (!line) return
      gsap.to(line, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: line,
          start: 'top 70%',
          end: 'bottom 30%',
          scrub: true,
        },
      })
    })
  }, { scope: sectionRef })

  return (
    <section
      id="section-process"
      ref={sectionRef}
      style={{ minHeight: '100svh', background: '#C77DFF', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(5rem, 8vw, 8rem) clamp(1.5rem, 8vw, 8rem)', position: 'relative', overflow: 'hidden' }}
    >
      <h2
        ref={headlineRef}
        style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(4rem, 10vw, 9rem)', color: '#080808', letterSpacing: '0.02em', lineHeight: 0.9, marginBottom: 'clamp(3rem, 5vw, 5rem)' }}
      >
        How I Work
      </h2>

      <div>
        {STEPS.map((step, i) => (
          <div key={step.num}>
            <div
              ref={el => (stepRefs.current[i] = el)}
              style={{ position: 'relative', padding: 'clamp(2.5rem, 4vw, 4rem) clamp(1rem, 3vw, 3rem)', overflow: 'hidden' }}
            >
              {/* Watermark number */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '-0.04em',
                transform: 'translateY(-50%)',
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(120px, 20vw, 200px)',
                color: '#080808',
                opacity: 0.12,
                lineHeight: 1,
                userSelect: 'none',
                pointerEvents: 'none',
                letterSpacing: '-0.02em',
              }}>
                {step.num}
              </div>

              <div style={{ position: 'relative', zIndex: 1 }}>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '12px', letterSpacing: '0.2em', color: 'rgba(8,8,8,0.55)', marginBottom: '0.6rem', textTransform: 'uppercase' }}>
                  {step.num}
                </p>
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(3.5rem, 8vw, 7rem)', color: '#080808', letterSpacing: '0.02em', lineHeight: 0.88, marginBottom: '1.2rem' }}>
                  {step.title}
                </h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(1rem, 1.5vw, 1.125rem)', color: 'rgba(8,8,8,0.7)', maxWidth: '40ch', lineHeight: 1.65 }}>
                  {step.body}
                </p>
              </div>
            </div>

            {i < STEPS.length - 1 && (
              <ConnectorLine lineRef={el => (lineRefs.current[i] = el)} />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
