import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function LoadingScreen() {
  const [done, setDone] = useState(false)
  const wrapRef   = useRef(null)
  const topRef    = useRef(null)
  const bottomRef = useRef(null)
  const counterRef = useRef(null)
  const obj = useRef({ val: 0 })

  useEffect(() => {
    gsap.to(obj.current, {
      val: 100,
      duration: 1.2,
      ease: 'power2.out',
      onUpdate() {
        if (counterRef.current) {
          counterRef.current.textContent = Math.round(obj.current.val)
        }
      },
      onComplete() {
        const tl = gsap.timeline({
          onComplete: () => {
            setDone(true)
            window.dispatchEvent(new Event('loadComplete'))
          },
        })
        tl.to([topRef.current, bottomRef.current], {
          yPercent: (i) => (i === 0 ? -100 : 100),
          duration: 0.9,
          ease: 'power3.inOut',
          stagger: 0,
        }).set(wrapRef.current, { display: 'none' })
      },
    })
  }, [])

  if (done) return null

  return (
    <div
      ref={wrapRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      <div
        ref={topRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '50%',
          background: '#080808',
          zIndex: 2,
        }}
      />
      <div
        ref={bottomRef}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '50%',
          background: '#080808',
          zIndex: 2,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
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
    </div>
  )
}
