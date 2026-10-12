import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

/* ── helpers ─────────────────────────────────────────────── */
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v))

export default function CustomCursor() {
  const dotRef    = useRef(null)
  const ringRef   = useRef(null)
  const labelRef  = useRef(null)
  const qX        = useRef(null)
  const qY        = useRef(null)
  const prev      = useRef({ x: 0, y: 0, t: Date.now() })
  const [info, setInfo] = useState({ accent: '#FFD166', label: '', big: false })

  useEffect(() => {
    /* GSAP quickTo for the ring — high-freq, low-overhead */
    qX.current = gsap.quickTo(ringRef.current, 'x', { duration: 0.55, ease: 'power3.out' })
    qY.current = gsap.quickTo(ringRef.current, 'y', { duration: 0.55, ease: 'power3.out' })

    /* ── mousemove ────────────────────────────────────────── */
    const onMove = (e) => {
      const { clientX: x, clientY: y } = e
      const now = Date.now()
      const dt  = Math.max(1, now - prev.current.t)

      /* velocity for elastic stretch */
      const vx = (x - prev.current.x) / dt * 16
      const vy = (y - prev.current.y) / dt * 16
      prev.current = { x, y, t: now }

      /* dot snaps instantly */
      gsap.set(dotRef.current, { x, y })

      /* ring interpolates */
      qX.current(x)
      qY.current(y)

      /* velocity → elastic stretch then snap */
      const sx = clamp(1 + Math.abs(vx) * 0.018, 1, 2.2)
      const sy = clamp(1 + Math.abs(vy) * 0.018, 1, 2.2)
      gsap.to(ringRef.current, { scaleX: sx, scaleY: sy, duration: 0.12, ease: 'power2.out', overwrite: 'auto' })
      gsap.to(ringRef.current, { scaleX: 1,  scaleY: 1,  duration: 0.7,  ease: 'elastic.out(1, 0.35)', delay: 0.12, overwrite: false })
    }

    /* ── [data-cursor] delegation ─────────────────────────── */
    const onOver = (e) => {
      const el = e.target.closest('[data-cursor]')
      if (!el) return
      const label = el.dataset.cursor || ''
      setInfo(s => ({ ...s, label, big: true }))
      const r = el.getBoundingClientRect()
      /* Magnetic expand only for small elements (buttons, badges, links).
         Full-width rows get a fixed round label cursor instead. */
      if (r.width <= 300 && r.height <= 120) {
        const w = Math.max(r.width  + 28, 64)
        const h = Math.max(r.height + 28, 64)
        gsap.to(ringRef.current, { width: w, height: h, borderRadius: '10px', duration: 0.35, ease: 'power2.out' })
      } else {
        gsap.to(ringRef.current, { width: 88, height: 88, borderRadius: '44px', duration: 0.35, ease: 'power2.out' })
      }
    }
    const onOut = (e) => {
      if (!e.target.closest('[data-cursor]')) return
      setInfo(s => ({ ...s, label: '', big: false }))
      gsap.to(ringRef.current, { width: 44, height: 44, borderRadius: '22px', duration: 0.35, ease: 'power2.out' })
    }

    /* ── section accent ──────────────────────────────────── */
    const onAccent     = (e) => setInfo(s => ({ ...s, accent: e.detail }))
    const onRowEnter   = ()  => setInfo(s => ({ ...s, label: 'VIEW', big: true }))
    const onRowLeave   = ()  => setInfo(s => ({ ...s, label: '',     big: false }))

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout',  onOut)
    window.addEventListener('accentChange',    onAccent)
    window.addEventListener('projectRowEnter', onRowEnter)
    window.addEventListener('projectRowLeave', onRowLeave)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout',  onOut)
      window.removeEventListener('accentChange',    onAccent)
      window.removeEventListener('projectRowEnter', onRowEnter)
      window.removeEventListener('projectRowLeave', onRowLeave)
    }
  }, [])

  const { accent, label, big } = info

  return (
    <>
      {/* Dot — instant, blend-mode difference */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 8, height: 8, borderRadius: '50%',
          background: accent,
          pointerEvents: 'none', zIndex: 99999,
          transform: 'translate(-50%, -50%)',
          mixBlendMode: 'difference',
          willChange: 'transform',
        }}
      />

      {/* Ring — interpolated, elastic */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 44, height: 44, borderRadius: '22px',
          pointerEvents: 'none', zIndex: 99998,
          transform: 'translate(-50%, -50%)',
          mixBlendMode: 'normal',
          willChange: 'transform',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Inner ring visual — separate so blend-mode doesn't fight transform */}
        <div style={{
          position: 'absolute', inset: 0,
          border: `1.5px solid ${accent}`,
          borderRadius: 'inherit',
          opacity: big ? 0 : 1,
          transition: 'opacity 0.2s ease',
        }} />
        {/* Label fill */}
        <div style={{
          position: 'absolute', inset: 0,
          background: accent,
          borderRadius: 'inherit',
          opacity: big ? 1 : 0,
          transition: 'opacity 0.2s ease',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {big && label && (
            <span ref={labelRef} style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '9px', letterSpacing: '0.08em',
              color: '#080808', whiteSpace: 'nowrap', userSelect: 'none',
              fontWeight: 400,
            }}>
              {label}
            </span>
          )}
        </div>
      </div>
    </>
  )
}
