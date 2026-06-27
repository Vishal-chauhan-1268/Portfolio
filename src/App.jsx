import { useState, useRef } from 'react'
import useLenis from './hooks/useLenis'
import useTheme from './hooks/useTheme'
import PageLoader from './components/ui/PageLoader'
import CustomCursor from './components/ui/CustomCursor'
import ScrollProgress from './components/ui/ScrollProgress'
import Navbar from './components/sections/Navbar'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import Experience from './components/sections/Experience'
import Certificates from './components/sections/Certificates'
import GitHubSection from './components/sections/GitHubSection'
import Contact from './components/sections/Contact'
import Footer from './components/sections/Footer'

export default function App() {
  useLenis()
  const { theme, toggle } = useTheme()
  const [soundOn, setSoundOn] = useState(false)
  const audioRef = useRef(null)

  const toggleSound = () => {
    setSoundOn((prev) => {
      const next = !prev
      if (audioRef.current) {
        if (next) audioRef.current.play().catch(() => {})
        else audioRef.current.pause()
      }
      return next
    })
  }

  return (
    <div className="relative bg-void min-h-screen">
      <PageLoader />
      <CustomCursor />
      <ScrollProgress />
      <Navbar theme={theme} onToggleTheme={toggle} soundOn={soundOn} onToggleSound={toggleSound} />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certificates />
        <GitHubSection />
        <Contact />
      </main>

      <Footer />

      {/* Ambient background sound — add /public/ambient.mp3 to enable */}
      <audio ref={audioRef} loop src="/ambient.mp3" />
    </div>
  )
}
