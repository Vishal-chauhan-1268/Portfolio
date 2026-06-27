import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import { experience } from '../../data/profile'

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="section-inner">
        <SectionHeading
          eyebrow="Timeline"
          title="How the journey has unfolded."
          subtitle="A chronological view of builds, milestones, and the academic foundation behind them."
        />

        <div className="relative max-w-2xl mx-auto md:mx-0">
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-electric via-violet to-cyanx" />
          {experience.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="relative pl-12 mb-10"
            >
              <motion.span
                whileInView={{ scale: [0.5, 1.3, 1] }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 + 0.2 }}
                className="absolute left-[12px] top-1.5 w-4 h-4 rounded-full bg-electric shadow-glow-electric"
              />
              <span className="font-mono text-xs text-cyanx/80 uppercase tracking-widest">{item.year}</span>
              <h3 className="font-display text-lg md:text-xl font-bold mt-1.5">{item.title}</h3>
              <p className="text-ink-500 text-sm mt-0.5">{item.org}</p>
              <p className="text-ink-300 text-sm mt-2.5 leading-relaxed max-w-xl">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
