export default function GlassCard({ children, className = '', hover = true }) {
  return (
    <div
      className={`glass rounded-2xl shadow-glass ${
        hover ? 'transition-all duration-300 hover:border-electric/40 hover:-translate-y-1' : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}
