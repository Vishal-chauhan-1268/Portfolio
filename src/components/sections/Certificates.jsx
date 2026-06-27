import { motion } from 'framer-motion'
import { FiAward } from 'react-icons/fi'
import SectionHeading from '../ui/SectionHeading'
import { certificates } from '../../data/profile'

export default function Certificates() {
  return (
    <section id="certificates" className="section">
      <div className="section-inner">
        <SectionHeading eyebrow="Certificates" title="Proof of the work behind the work." />

        <div className="grid md:grid-cols-3 gap-5">
          {certificates.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass rounded-2xl p-6 hover:shadow-glow-violet transition-shadow"
            >
              <FiAward className="text-violet" size={22} />
              <h4 className="font-display font-semibold text-base mt-4">{c.title}</h4>
              <p className="text-ink-500 text-xs mt-1.5">{c.issuer}</p>
              <span className="text-ink-700 text-xs mt-3 inline-block font-mono">{c.year}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
