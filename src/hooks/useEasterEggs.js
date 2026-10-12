import { useEffect } from 'react'
import gsap from 'gsap'

const KONAMI = [
  'ArrowUp','ArrowUp','ArrowDown','ArrowDown',
  'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight',
  'b','a',
]

export default function useEasterEggs() {
  useEffect(() => {
    /* ── Dev console signature ──────────────────────────── */
    const styles = [
      'color: #FFD166; font-size: 28px; font-weight: bold; font-family: monospace',
      'color: #FFD166; font-size: 16px; font-family: "DM Mono", monospace',
      'color: #C77DFF; font-size: 13px; font-family: "DM Mono", monospace',
      'color: #4ECDC4; font-size: 12px; font-family: "DM Mono", monospace',
      'color: rgba(255,255,255,0.35); font-size: 11px; font-family: "DM Mono", monospace',
    ]
    console.log('%c✦', styles[0])
    console.log('%c Hey developer — you found me.', styles[1])
    console.log('%c Built with React · GSAP · Three.js · obsession', styles[2])
    console.log('%c Try the Konami code ↑↑↓↓←→←→BA', styles[3])
    console.log('%c Or press G to go full chaos.', styles[4])

    /* ── Konami code ─────────────────────────────────────── */
    let progress = 0

    const triggerKonami = () => {
      /* All section colors fire in sequence */
      const colors = ['#FFD166', '#FF6B6B', '#4ECDC4', '#C77DFF', '#FFD166']
      colors.forEach((c, i) => {
        gsap.to('body', { backgroundColor: c, duration: 0.25, delay: i * 0.25, ease: 'none' })
      })
      gsap.to('body', { backgroundColor: '#080808', duration: 0.5, delay: colors.length * 0.25, ease: 'power2.out' })
      window.dispatchEvent(new Event('chaosMode'))
      console.log('%c⚡ CHAOS MODE', 'color: #FF6B6B; font-size: 20px; font-family: monospace')
    }

    /* ── Keyboard ─────────────────────────────────────────── */
    const onKey = (e) => {
      /* Konami */
      if (e.key === KONAMI[progress]) {
        progress++
        if (progress === KONAMI.length) {
          progress = 0
          triggerKonami()
        }
      } else {
        progress = 0
      }

      /* G → chaos scatter */
      if (e.key === 'g' || e.key === 'G') {
        window.dispatchEvent(new Event('chaosMode'))
      }

      /* L → color flash */
      if (e.key === 'l' || e.key === 'L') {
        const tl = gsap.timeline()
        tl.to('body', { backgroundColor: '#ffffff', duration: 0.08, ease: 'none' })
          .to('body', { backgroundColor: '#080808', duration: 0.6, ease: 'power3.out' })
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
}
