import { useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import SkillGalaxy from '../three/SkillGalaxy'
import { skills } from '../../data/skills'

export default function Skills() {
  const [active, setActive] = useState(skills[0])

  return (
    <section id="skills" className="section bg-grid-glow">
      <div className="section-inner">
        <SectionHeading
          eyebrow="Skills"
          title="A galaxy of tools I build with."
          subtitle="Click any node to see where it's been used in production. Sized by depth of experience."
        />

        <div className="grid md:grid-cols-[1.3fr_1fr] gap-8 items-center">
          <div className="h-[420px] md:h-[520px] rounded-3xl glass overflow-hidden">
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
              <Suspense fallback={null}>
                <SkillGalaxy skills={skills} onSelect={setActive} activeId={active?.id} />
              </Suspense>
            </Canvas>
          </div>

          <AnimatePresence mode="wait">
            {active && (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className="glass rounded-3xl p-7"
              >
                <span
                  className="font-mono text-xs uppercase tracking-widest"
                  style={{ color: active.color }}
                >
                  {active.category}
                </span>
                <h3 className="font-display text-2xl font-bold mt-2">{active.name}</h3>
                <p className="text-ink-300 text-sm mt-4 leading-relaxed">{active.desc}</p>

                <div className="mt-6">
                  <div className="flex justify-between text-xs text-ink-500 mb-2">
                    <span>Proficiency</span>
                    <span>{active.level}/5</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(active.level / 5) * 100}%` }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full rounded-full"
                      style={{ background: active.color }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
