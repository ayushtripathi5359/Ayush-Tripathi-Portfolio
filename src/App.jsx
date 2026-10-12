import LoadingScreen  from './components/LoadingScreen.jsx'
import CustomCursor   from './components/CustomCursor.jsx'
import AmbientLayer   from './components/AmbientLayer.jsx'
import Nav            from './components/Nav.jsx'
import ProgressBar    from './components/ProgressBar.jsx'
import SectionCount   from './components/SectionCount.jsx'
import FooterMarquee  from './components/FooterMarquee.jsx'
import Hero           from './components/sections/Hero.jsx'
import About          from './components/sections/About.jsx'
import Skills         from './components/sections/Skills.jsx'
import Experience     from './components/sections/Experience.jsx'
import Projects       from './components/sections/Projects.jsx'
import Process        from './components/sections/Process.jsx'
import Contact        from './components/sections/Contact.jsx'
import useSectionColor    from './hooks/useSectionColor.js'
import useEasterEggs      from './hooks/useEasterEggs.js'

export default function App() {
  useSectionColor()
  useEasterEggs()

  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <AmbientLayer />
      <ProgressBar />
      <SectionCount />
      <Nav />

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
