import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'

// Initializes Lenis smooth scrolling for the whole app lifetime.
export default function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    const rafId = requestAnimationFrame(raf)

    window.lenis = lenis

    return () => {
      lenis.destroy()
      cancelAnimationFrame(rafId)
    }
  }, [])
}
