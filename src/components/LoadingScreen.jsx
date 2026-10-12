import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function LoadingScreen() {
  const [done, setDone] = useState(false)
  const wrapRef    = useRef(null)
  const counterRef = useRef(null)

  useEffect(() => {
    const obj = { val: 0 }
    const tl = gsap.timeline()

    tl.to(obj, {
      val: 100,
      duration: 1.2,
      ease: 'power2.out',
      onUpdate() {
        if (counterRef.current) counterRef.current.textContent = Math.round(obj.val)
      },
    })
      /* Start the hero intro first (its letters jump to their scattered
         start under the opaque overlay), then fade the overlay away. */
      .add(() => window.dispatchEvent(new Event('loadComplete')))
      .to(counterRef.current, { opacity: 0, duration: 0.25, ease: 'power1.out' })
      .to(wrapRef.current, {
        opacity: 0, duration: 0.5, ease: 'power1.out',
        onComplete: () => setDone(true),
      }, '-=0.1')

    return () => tl.kill()
  }, [])

  if (done) return null

  return (
    <div
      ref={wrapRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#080808',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      <span
        ref={counterRef}
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: '48px',
          fontWeight: 400,
          color: '#FFD166',
          letterSpacing: '0.05em',
          lineHeight: 1,
        }}
      >
        0
      </span>
    </div>
  )
}
