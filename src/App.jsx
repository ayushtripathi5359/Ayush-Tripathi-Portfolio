import { useEffect, useState } from 'react'
import gsap from 'gsap'
import LoadingScreen  from './components/LoadingScreen.jsx'
import CustomCursor   from './components/CustomCursor.jsx'
import AmbientLayer   from './components/AmbientLayer.jsx'
import Nav            from './components/Nav.jsx'
import ProgressBar    from './components/ProgressBar.jsx'
import SectionCount   from './components/SectionCount.jsx'
import FooterMarquee  from './components/FooterMarquee.jsx'
import RecruiterView  from './components/RecruiterView.jsx'
import Terminal       from './components/Terminal.jsx'
import BugSquash      from './components/BugSquash.jsx'
import Hero           from './components/sections/Hero.jsx'
import About          from './components/sections/About.jsx'
import Skills         from './components/sections/Skills.jsx'
import Experience     from './components/sections/Experience.jsx'
import Projects       from './components/sections/Projects.jsx'
import Process        from './components/sections/Process.jsx'
import Contact        from './components/sections/Contact.jsx'
import useSectionColor    from './hooks/useSectionColor.js'
import useEasterEggs      from './hooks/useEasterEggs.js'

const IS_TOUCH = typeof window !== 'undefined' && window.matchMedia('(hover: none), (pointer: coarse)').matches
const START_RECRUITER = typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('recruiter')

export default function App() {
  const [recruiter, setRecruiter] = useState(START_RECRUITER)
  const [terminal, setTerminal]   = useState(false)
  const [game, setGame]           = useState(false)

  useSectionColor()
  useEasterEggs()

  /* ── Overlay triggers: window events + keyboard ─────── */
  useEffect(() => {
    const onRecruiter = (e) => setRecruiter(v => (typeof e.detail === 'boolean' ? e.detail : !v))
    const onTerminal  = () => setTerminal(true)
    const onGame      = () => { setTerminal(false); setGame(true) }
    const onKey = (e) => {
      const typing = /^(INPUT|TEXTAREA)$/.test(e.target.tagName)
      if (e.key === 'Escape') { setTerminal(false); setGame(false) }
      /* ` or Ctrl/Cmd+K toggles the terminal */
      if ((e.key === '`' && !typing) || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k')) {
        e.preventDefault()
        setGame(false)
        setTerminal(v => !v)
      }
    }

    window.addEventListener('app:recruiter', onRecruiter)
    window.addEventListener('app:terminal',  onTerminal)
    window.addEventListener('app:game',      onGame)
    window.addEventListener('keydown',       onKey)
    return () => {
      window.removeEventListener('app:recruiter', onRecruiter)
      window.removeEventListener('app:terminal',  onTerminal)
      window.removeEventListener('app:game',      onGame)
      window.removeEventListener('keydown',       onKey)
    }
  }, [])

  /* ── Lock page scroll while any overlay is open ─────── */
  const overlay = recruiter || terminal || game
  useEffect(() => {
    const root = document.documentElement
    if (overlay) {
      window.__lenis?.stop()
      root.style.overflow = 'hidden'
      root.dataset.overlay = '1'
    } else {
      window.__lenis?.start()
      root.style.overflow = ''
      delete root.dataset.overlay
    }
  }, [overlay])

  /* ── Recruiter mode: freeze all motion, keep it shareable via ?recruiter ── */
  useEffect(() => {
    const root = document.documentElement
    const url  = new URL(window.location.href)
    if (recruiter) {
      gsap.globalTimeline.pause()
      root.dataset.plain = '1'
      url.searchParams.set('recruiter', '1')
    } else {
      gsap.globalTimeline.resume()
      delete root.dataset.plain
      url.searchParams.delete('recruiter')
    }
    window.history.replaceState(null, '', url)
  }, [recruiter])

  return (
    <>
      <LoadingScreen />
      {!IS_TOUCH && !recruiter && <CustomCursor />}
      <AmbientLayer />
      <ProgressBar />
      <SectionCount />
      <Nav />

      {recruiter && <RecruiterView />}
      {terminal && <Terminal onClose={() => setTerminal(false)} />}
      {game && <BugSquash onClose={() => setGame(false)} />}

      <div id="smooth-content">
        {/* Skewable top — no GSAP pins inside */}
        <div>
          <Hero />
          <About />
        </div>

        {/* Skills sits outside every skewY wrapper so pin: true stays
            relative to the viewport, not a CSS containing block */}
        <Skills />

        {/* Skewable bottom — no GSAP pins inside */}
        <div>
          <Experience />
          <Projects />
          <Process />
          <Contact />
          <FooterMarquee />
        </div>
      </div>
    </>
  )
}
