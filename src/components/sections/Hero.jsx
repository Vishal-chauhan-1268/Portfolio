import { useRef, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { motion } from 'framer-motion'
import { FiArrowDown } from 'react-icons/fi'
import DevRoomScene from '../three/DevRoomScene'
import MagneticButton from '../ui/MagneticButton'

const ROLES = ['Software Engineer', 'Full Stack Developer', 'AI Builder', 'Problem Solver']

function TypingRoles() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = ROLES[roleIndex]
    const speed = deleting ? 40 : 70
    const timeout = setTimeout(() => {
      if (!deleting) {
        if (text.length < current.length) {
          setText(current.slice(0, text.length + 1))
        } else {
          setTimeout(() => setDeleting(true), 1200)
        }
      } else {
        if (text.length > 0) {
          setText(text.slice(0, -1))
        } else {
          setDeleting(false)
          setRoleIndex((i) => (i + 1) % ROLES.length)
        }
      }
    }, speed)
    return () => clearTimeout(timeout)
  }, [text, deleting, roleIndex])

  return (
    <span className="text-gradient font-display font-semibold">
      {text}
      <span className="inline-block w-[2px] h-6 md:h-8 bg-cyanx ml-1 align-middle animate-pulse" />
    </span>
  )
}

export default function Hero() {
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (window.lenis && el) window.lenis.scrollTo(el, { offset: -80 })
    else el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="relative min-h-screen w-full overflow-hidden bg-void">
      {/* 3D canvas background */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0.6, 5], fov: 42 }} dpr={[1, 1.6]}>
          <Suspense fallback={null}>
            <DevRoomScene mouse={mouse} />
          </Suspense>
        </Canvas>
      </div>

      {/* vignette + grid glow for legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-void/10 via-void/40 to-void pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(77,127,255,0.14),transparent_55%)] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-mono text-xs md:text-sm uppercase tracking-[0.3em] text-cyanx/80 mb-5"
        >
          Welcome to my digital workspace
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-extrabold text-4xl sm:text-5xl md:text-7xl leading-[1.05] max-w-4xl"
        >
          Hi, I'm <span className="text-gradient">Vishal Chauhan</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.7 }}
          className="mt-5 text-xl md:text-3xl h-10 font-display"
        >
          <TypingRoles />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="mt-6 max-w-xl text-ink-300 text-sm md:text-base leading-relaxed"
        >
          I design and ship full-stack systems — from real-time messaging platforms to
          AI-powered RAG pipelines — with a focus on clean architecture and production readiness.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton variant="primary" onClick={() => scrollTo('projects')}>
            View Projects
          </MagneticButton>
          <MagneticButton
            variant="ghost"
                  as="a"
             href="/resumees.pdf"
                      download
                   target="_blank"
                     rel="noopener noreferrer"
                                         >
                          Download Resume
</MagneticButton>
          <MagneticButton variant="outline" onClick={() => scrollTo('contact')}>
            Contact Me
          </MagneticButton>
        </motion.div>
      </div>

      <motion.button
        onClick={() => scrollTo('about')}
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-ink-500 hover:text-cyanx transition-colors"
        aria-label="Scroll down"
      >
        <FiArrowDown size={20} />
      </motion.button>
    </section>
  )
}
