import { motion } from 'framer-motion'

export default function SectionHeading({ eyebrow, title, subtitle, align = 'left' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`mb-12 ${align === 'center' ? 'text-center mx-auto' : ''} max-w-2xl`}
    >
      {eyebrow && (
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-cyanx/80">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 leading-tight">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-ink-300 text-base md:text-lg leading-relaxed">{subtitle}</p>}
    </motion.div>
  )
}
