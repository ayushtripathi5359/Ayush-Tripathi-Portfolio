import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function ProgressBar() {
  const barRef = useRef(null)

  useGSAP(() => {
    gsap.to(barRef.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      },
    })
  })

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '2px', zIndex: 99999, pointerEvents: 'none' }}>
      <div
        ref={barRef}
        style={{
          height: '100%',
          background: 'linear-gradient(90deg, #FFD166, #FF6B6B, #4ECDC4, #C77DFF, #FFD166)',
          transformOrigin: 'left',
          transform: 'scaleX(0)',
        }}
      />
    </div>
  )
}
