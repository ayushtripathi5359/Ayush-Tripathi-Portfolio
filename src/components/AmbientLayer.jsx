import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/* Global depth-light + glow pulses + vignette */
export default function AmbientLayer() {
  const lightRef  = useRef(null)
  const pulse1Ref = useRef(null)
  const pulse2Ref = useRef(null)
  const pulse3Ref = useRef(null)

  useEffect(() => {
    /* ── cursor depth light ───────────────────────────────── */
    const onMove = (e) => {
      gsap.to(lightRef.current, {
        x: e.clientX, y: e.clientY,
        duration: 1.0, ease: 'power2.out', overwrite: 'auto',
      })
    }
    window.addEventListener('mousemove', onMove)

    /* ── ambient glow pulses ─────────────────────────────── */
    const PULSE_COLORS = [
      'rgba(255,209,102,0.055)',
      'rgba(199,125,255,0.045)',
      'rgba(78,205,196,0.04)',
    ]
    const pulses = [pulse1Ref, pulse2Ref, pulse3Ref]

    pulses.forEach((ref, i) => {
      const drift = () => {
        if (!ref.current) return
        gsap.to(ref.current, {
          x: `${gsap.utils.random(-30, 30)}vw`,
          y: `${gsap.utils.random(-30, 30)}vh`,
          opacity: gsap.utils.random(0.3, 1),
          duration: gsap.utils.random(4, 8),
          ease: 'sine.inOut',
          onComplete: drift,
        })
      }
      /* stagger start */
      gsap.set(ref.current, {
        x: `${gsap.utils.random(-20, 20)}vw`,
        y: `${gsap.utils.random(-20, 20)}vh`,
        opacity: 0.4,
      })
      setTimeout(drift, i * 1800)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  const pulseBase = {
    position: 'fixed',
    width: '50vw', height: '50vh',
    borderRadius: '50%',
    pointerEvents: 'none',
    willChange: 'transform, opacity',
    top: '50%', left: '50%',
  }

  return (
    <>
      {/* Cursor depth light */}
      <div
        ref={lightRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: '700px', height: '700px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,209,102,0.04) 0%, transparent 65%)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none', zIndex: 2,
          willChange: 'transform',
        }}
      />

      {/* Ambient glow orbs — behind all content */}
      <div ref={pulse1Ref} style={{ ...pulseBase, background: 'radial-gradient(circle, rgba(255,209,102,0.07) 0%, transparent 70%)', zIndex: 0 }} />
      <div ref={pulse2Ref} style={{ ...pulseBase, background: 'radial-gradient(circle, rgba(199,125,255,0.06) 0%, transparent 70%)', zIndex: 0 }} />
      <div ref={pulse3Ref} style={{ ...pulseBase, background: 'radial-gradient(circle, rgba(78,205,196,0.05) 0%, transparent 70%)', zIndex: 0 }} />

      {/* Vignette — normal blend so multiply never destroys dark-on-color text */}
      <div style={{
        position: 'fixed', inset: 0,
        background: 'radial-gradient(ellipse at 50% 50%, transparent 42%, rgba(0,0,0,0.38) 100%)',
        pointerEvents: 'none', zIndex: 9975,
      }} />
    </>
  )
}
