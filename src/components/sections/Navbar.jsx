import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMoon, FiSun, FiMenu, FiX, FiVolume2, FiVolumeX } from 'react-icons/fi'
import useActiveSection from '../../hooks/useActiveSection'

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'github', label: 'GitHub' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar({ theme, onToggleTheme, soundOn, onToggleSound }) {
  const [open, setOpen] = useState(false)
  const active = useActiveSection(LINKS.map((l) => l.id))

  const scrollTo = (id) => {
    setOpen(false)
    const el = document.getElementById(id)
    if (window.lenis && el) {
      window.lenis.scrollTo(el, { offset: -80 })
    } else {
      el?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-5xl"
    >
      <div className="glass rounded-full px-5 py-3 flex items-center justify-between shadow-glass">
        <button
          onClick={() => scrollTo('hero')}
          className="font-display font-bold text-base tracking-wide text-ink-100"
        >
          VC<span className="text-electric">.</span>
        </button>

        <ul className="hidden md:flex items-center gap-1">
          {LINKS.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => scrollTo(link.id)}
                className={`relative px-3.5 py-1.5 text-sm font-body rounded-full transition-colors ${
                  active === link.id ? 'text-ink-100' : 'text-ink-500 hover:text-ink-300'
                }`}
              >
                {active === link.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 bg-white/8 rounded-full -z-10"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleSound}
            aria-label="Toggle ambient sound"
            className="w-9 h-9 rounded-full flex items-center justify-center text-ink-300 hover:text-cyanx transition-colors"
          >
            {soundOn ? <FiVolume2 size={16} /> : <FiVolumeX size={16} />}
          </button>
          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className="w-9 h-9 rounded-full flex items-center justify-center text-ink-300 hover:text-electric transition-colors"
          >
            {theme === 'dark' ? <FiSun size={16} /> : <FiMoon size={16} />}
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-9 h-9 rounded-full flex items-center justify-center text-ink-300"
            aria-label="Toggle menu"
          >
            {open ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass mt-2 rounded-2xl p-4 flex flex-col gap-1 md:hidden"
        >
          {LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`text-left px-3 py-2.5 rounded-xl text-sm ${
                active === link.id ? 'bg-white/8 text-ink-100' : 'text-ink-300'
              }`}
            >
              {link.label}
            </button>
          ))}
        </motion.div>
      )}
    </motion.nav>
  )
}
