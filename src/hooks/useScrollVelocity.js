import { useEffect } from 'react'
import gsap from 'gsap'

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v))

export default function useScrollVelocity(refs) {
  useEffect(() => {
    const lenis = window.__lenis
    if (!lenis) return

    const targets = refs.map(r => r.current).filter(Boolean)
    if (targets.length === 0) return

    let tween = null

    const onScroll = ({ velocity }) => {
      const skew = clamp(velocity * 0.45, -4, 4)

      if (tween) tween.kill()
      tween = gsap.timeline()
        .to(targets, { skewY: skew, duration: 0.15, ease: 'none', overwrite: true })
        .to(targets, {
          skewY: 0,
          duration: 0.9,
          ease: 'power3.out',
          onComplete: () => targets.forEach(t => gsap.set(t, { clearProps: 'skewY' })),
        })
    }

    lenis.on('scroll', onScroll)
    return () => {
      lenis.off('scroll', onScroll)
      if (tween) tween.kill()
      targets.forEach(t => gsap.set(t, { skewY: 0 }))
    }
  }, [])
}
