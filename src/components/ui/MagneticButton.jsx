import { useRef } from 'react'
import { motion } from 'framer-motion'

export default function MagneticButton({ children, onClick, variant = 'primary', className = '', as = 'button', href }) {
  const ref = useRef(null)

  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`
  }

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate(0px, 0px)'
  }

  const base =
    'magnetic relative inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-body font-medium text-sm tracking-wide overflow-hidden'

  const styles = {
    primary: 'bg-gradient-to-r from-electric to-violet text-white shadow-glow-electric',
    ghost: 'glass text-ink-100 hover:border-electric/50',
    outline: 'border border-ink-700 text-ink-100 hover:border-cyanx',
  }

  const Comp = as === 'a' ? motion.a : motion.button

  return (
    <Comp
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileTap={{ scale: 0.96 }}
      className={`${base} ${styles[variant]} ${className}`}
    >
      {children}
    </Comp>
  )
}
