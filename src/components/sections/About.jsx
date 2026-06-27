import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { FiMapPin, FiTarget, FiCode } from 'react-icons/fi'
import SectionHeading from '../ui/SectionHeading'
import { education, achievements } from '../../data/profile'

function ProfileCard() {
  const cardRef = useRef(null)
  const [rotate, setRotate] = useState({ x: 0, y: 0 })

  const handleMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    setRotate({ x: py * -14, y: px * 16 })
  }

  return (
    <div className="relative flex items-center justify-center py-10">
      {/* glow rings */}
      <div className="absolute w-72 h-72 rounded-full border border-electric/20 animate-spin-slow" />
      <div className="absolute w-96 h-96 rounded-full border border-violet/15" style={{ animation: 'spin 24s linear infinite reverse' }} />
      <div className="absolute w-[26rem] h-[26rem] rounded-full bg-electric/10 blur-3xl" />

      <div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={() => setRotate({ x: 0, y: 0 })}
        style={{ perspective: '1000px' }}
        className="relative z-10"
      >
        <motion.div
          animate={{ rotateX: rotate.x, rotateY: rotate.y }}
          transition={{ type: 'spring', stiffness: 150, damping: 18 }}
          className="glass w-72 rounded-3xl p-7 shadow-glow-electric"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-electric via-violet to-cyanx flex items-center justify-center font-display font-bold text-3xl text-white">
            VC
          </div>
          <h3 className="text-center font-display font-bold text-xl mt-5">Vishal Chauhan</h3>
          <p className="text-center text-ink-300 text-sm mt-1">Software Engineer · AI Builder</p>

          <div className="mt-6 space-y-3 text-sm">
            <div className="flex items-center gap-3 text-ink-300">
              <FiMapPin className="text-cyanx" /> ABES Engineering College
            </div>
            <div className="flex items-center gap-3 text-ink-300">
              <FiCode className="text-electric" /> 250+ DSA Problems Solved
            </div>
            <div className="flex items-center gap-3 text-ink-300">
              <FiTarget className="text-violet" /> Seeking SWE Internship
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function Timeline() {
  const items = [
    { label: 'B.Tech, CSE', detail: education.school },
    { label: 'Full-Stack Builds', detail: 'Chat, AI, Registration platforms' },
    { label: '250+ DSA Problems', detail: 'Consistent algorithmic practice' },
    { label: 'Internship Goal', detail: 'Software Engineering roles' },
  ]
  return (
    <div className="relative pl-8">
      <div className="absolute left-[7px] top-1 bottom-1 w-px bg-gradient-to-b from-electric via-violet to-cyanx" />
      {items.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="relative mb-8"
        >
          <span className="absolute -left-8 top-1.5 w-3.5 h-3.5 rounded-full bg-electric shadow-glow-electric" />
          <h4 className="font-display font-semibold text-lg">{item.label}</h4>
          <p className="text-ink-300 text-sm mt-1">{item.detail}</p>
        </motion.div>
      ))}
    </div>
  )
}

export default function About() {
  return (
    <section id="about" className="section">
      <div className="section-inner">
        <SectionHeading
          eyebrow="About"
          title="Engineering with intent, learning with momentum."
          subtitle="A CSE student at ABES Engineering College building production-grade full-stack systems and exploring applied AI — one shipped project at a time."
        />

        <div className="grid md:grid-cols-2 gap-12 items-center mt-8">
          <ProfileCard />
          <Timeline />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
          {achievements.map((a, i) => (
            <motion.div
              key={a.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass rounded-2xl p-5 text-center"
            >
              <div className="font-display text-3xl md:text-4xl font-bold text-gradient">
                {a.value}{a.suffix}
              </div>
              <div className="text-ink-500 text-xs mt-2 uppercase tracking-wide">{a.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
