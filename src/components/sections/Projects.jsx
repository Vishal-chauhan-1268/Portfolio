import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiGithub, FiExternalLink, FiX } from 'react-icons/fi'
import SectionHeading from '../ui/SectionHeading'
import { projects } from '../../data/projects'

function ProjectCube({ project, onOpen }) {
  return (
    <motion.button
      onClick={() => onOpen(project)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.6 }}
      className="group relative glass rounded-3xl p-7 text-left overflow-hidden"
      style={{ perspective: '900px' }}
    >
      <div
        className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-30 transition-opacity group-hover:opacity-50"
        style={{ background: project.accent }}
      />
      <motion.div
        className="w-14 h-14 rounded-2xl mb-6 flex items-center justify-center"
        style={{ background: `linear-gradient(135deg, ${project.accent}33, transparent)`, border: `1px solid ${project.accent}55` }}
        whileHover={{ rotateY: 25, rotateX: -10 }}
        transition={{ type: 'spring', stiffness: 200 }}
      >
        <span className="font-display font-bold" style={{ color: project.accent }}>
          {project.title.charAt(0)}
        </span>
      </motion.div>

      <span className="font-mono text-[11px] uppercase tracking-widest" style={{ color: project.accent }}>
        {project.tag}
      </span>
      <h3 className="font-display text-xl font-bold mt-2">{project.title}</h3>
      <p className="text-ink-300 text-sm mt-3 leading-relaxed">{project.summary}</p>

      <div className="flex flex-wrap gap-2 mt-5">
        {project.tech.slice(0, 4).map((t) => (
          <span key={t} className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-white/5 text-ink-300">
            {t}
          </span>
        ))}
      </div>

      <div className="mt-6 text-sm text-electric-glow font-medium flex items-center gap-1.5 opacity-80 group-hover:opacity-100">
        Explore <FiExternalLink size={13} />
      </div>
    </motion.button>
  )
}

function ProjectModal({ project, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[80] bg-void/80 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="glass rounded-3xl max-w-2xl w-full p-8 max-h-[85vh] overflow-y-auto relative"
      >
        <button onClick={onClose} className="absolute top-5 right-5 text-ink-500 hover:text-ink-100">
          <FiX size={20} />
        </button>

        <span className="font-mono text-xs uppercase tracking-widest" style={{ color: project.accent }}>
          {project.tag}
        </span>
        <h3 className="font-display text-2xl md:text-3xl font-bold mt-2">{project.title}</h3>
        <p className="text-ink-300 mt-4 leading-relaxed text-sm md:text-base">{project.description}</p>

        <div className="grid grid-cols-3 gap-3 mt-6">
          {project.metrics.map((m) => (
            <div key={m.label} className="text-center rounded-xl bg-white/5 py-3">
              <div className="font-display font-bold text-lg" style={{ color: project.accent }}>
                {m.value}
              </div>
              <div className="text-[10px] text-ink-500 mt-1 uppercase tracking-wide">{m.label}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mt-6">
          {project.tech.map((t) => (
            <span key={t} className="text-xs font-mono px-3 py-1.5 rounded-full bg-white/5 text-ink-300">
              {t}
            </span>
          ))}
        </div>

        <div className="flex gap-3 mt-7">
          <a href={project.github} className="flex items-center gap-2 px-5 py-2.5 rounded-full glass text-sm hover:border-electric/50">
            <FiGithub size={15} /> GitHub
          </a>
          <a
            href={project.demo}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm bg-gradient-to-r from-electric to-violet text-white"
          >
            <FiExternalLink size={15} /> Live Demo
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const [open, setOpen] = useState(null)

  return (
    <section id="projects" className="section">
      <div className="section-inner">
        <SectionHeading
          eyebrow="Projects"
          title="Systems I've designed, built, and shipped."
          subtitle="Each project below was built end-to-end — architecture, backend, frontend, and documentation."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((p) => (
            <ProjectCube key={p.id} project={p} onOpen={setOpen} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open && <ProjectModal project={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </section>
  )
}
