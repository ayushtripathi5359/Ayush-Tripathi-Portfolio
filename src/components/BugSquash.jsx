import { useEffect, useRef, useState } from 'react'
import { PROFILE } from '../data/profile.js'

const DURATION = 30
const MAX_BUGS = 14
const SPRITES  = ['🪲', '🐞', '🕷️']

/* 30-second game: bugs crawl over the page, click/tap to squash them.
   Bugs are plain DOM nodes moved in one rAF loop — no React state per frame. */
export default function BugSquash({ onClose }) {
  const fieldRef = useRef(null)
  const [phase, setPhase]       = useState('ready')   // ready | playing | over
  const [score, setScore]       = useState(0)
  const [timeLeft, setTimeLeft] = useState(DURATION)

  useEffect(() => {
    if (phase !== 'playing') return
    const field = fieldRef.current
    const bugs  = new Set()
    let raf, last = performance.now(), elapsed = 0, spawnAcc = 0.6, shown = DURATION

    const spawn = () => {
      const W = window.innerWidth, H = window.innerHeight
      const side = Math.floor(Math.random() * 4)
      const x = side === 0 ? -40 : side === 1 ? W + 40 : Math.random() * W
      const y = side === 2 ? -40 : side === 3 ? H + 40 : Math.random() * H
      /* aim at a random point in the middle 70% of the screen */
      const tx = W * (0.15 + Math.random() * 0.7)
      const ty = H * (0.15 + Math.random() * 0.7)
      const speed = 90 + Math.random() * 90 + elapsed * 5
      const d = Math.hypot(tx - x, ty - y) || 1

      const el = document.createElement('button')
      el.className = 'bug'
      el.type = 'button'
      el.setAttribute('aria-label', 'Bug')
      el.textContent = SPRITES[Math.floor(Math.random() * SPRITES.length)]
      el.style.fontSize = `${34 + Math.random() * 20}px`

      const bug = { el, x, y, vx: (tx - x) / d * speed, vy: (ty - y) / d * speed, speed, wob: Math.random() * 6, alive: true }

      el.addEventListener('pointerdown', (e) => {
        e.preventDefault()
        if (!bug.alive) return
        bug.alive = false
        bugs.delete(bug)
        el.textContent = '💥'
        el.classList.add('bug-dead')
        setScore(s => s + 1)
        setTimeout(() => el.remove(), 350)
      })

      field.appendChild(el)
      bugs.add(bug)
    }

    const tick = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      elapsed += dt

      const left = Math.max(0, DURATION - elapsed)
      if (Math.ceil(left) !== shown) { shown = Math.ceil(left); setTimeLeft(shown) }
      if (left <= 0) return setPhase('over')

      /* spawn faster as time runs out */
      spawnAcc += dt
      const interval = Math.max(0.3, 0.85 - elapsed * 0.02)
      while (spawnAcc > interval) {
        spawnAcc -= interval
        if (bugs.size < MAX_BUGS) spawn()
      }

      const W = window.innerWidth, H = window.innerHeight
      bugs.forEach((b) => {
        b.wob += dt * 7
        const sway = Math.sin(b.wob)
        /* move forward plus a sideways wiggle */
        b.x += (b.vx - b.vy / b.speed * sway * 45) * dt
        b.y += (b.vy + b.vx / b.speed * sway * 45) * dt
        const angle = Math.atan2(b.vy, b.vx) + Math.PI / 2 + sway * 0.25
        b.el.style.transform = `translate3d(${b.x}px, ${b.y}px, 0) rotate(${angle}rad)`

        if (b.x < -90 || b.x > W + 90 || b.y < -90 || b.y > H + 90) {
          b.el.remove()
          bugs.delete(b)
        }
      })

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      field.replaceChildren()
    }
  }, [phase])

  const start = () => { setScore(0); setTimeLeft(DURATION); setPhase('playing') }

  return (
    <div className="bugs" role="dialog" aria-label="Bug Squash game">
      <div ref={fieldRef} className="bugs-field" />

      <div className="bugs-hud">
        <span>BUGS SQUASHED <strong>{String(score).padStart(2, '0')}</strong></span>
        <span>TIME <strong>{String(timeLeft).padStart(2, '0')}s</strong></span>
        <button onClick={onClose} aria-label="Close game">ESC ✕</button>
      </div>

      {phase === 'ready' && (
        <div className="bugs-card">
          <p className="bugs-kicker">Bug Squash</p>
          <h2>Production is on fire.</h2>
          <p>You have {DURATION} seconds. Click or tap every bug before it crawls away.</p>
          <div className="bugs-actions">
            <button className="bugs-primary" onClick={start}>Start squashing</button>
            <button onClick={onClose}>Not now</button>
          </div>
        </div>
      )}

      {phase === 'over' && (
        <div className="bugs-card">
          <p className="bugs-kicker">Time&apos;s up</p>
          <h2>{score === 0 ? 'The bugs won this round.' : `You squashed ${score} ${score === 1 ? 'bug' : 'bugs'}.`}</h2>
          <p>Ayush has fixed <strong>20+ of these in production</strong> — across frontend, backend and database layers.</p>
          <div className="bugs-actions">
            <a className="bugs-primary" href={PROFILE.mailHref} target="_blank" rel="noopener noreferrer">Hire the exterminator</a>
            <button onClick={start}>Play again</button>
            <button onClick={onClose}>Close</button>
          </div>
        </div>
      )}
    </div>
  )
}
