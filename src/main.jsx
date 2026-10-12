import React from 'react'
import ReactDOM from 'react-dom/client'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText }     from 'gsap/SplitText'
import { useGSAP }       from '@gsap/react'
import Lenis from 'lenis'
import App from './App.jsx'
import './styles/global.css'

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
})

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
})
gsap.ticker.lagSmoothing(0)

window.__lenis = lenis

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
