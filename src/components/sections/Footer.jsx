import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative border-t border-white/5 py-10 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(139,92,246,0.08),transparent_60%)]" />
      <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-display font-bold text-ink-100">
          VC<span className="text-electric">.</span>
        </span>
        <p className="text-ink-500 text-xs font-mono">
          Designed &amp; built by Vishal Chauhan · &copy; {year}
        </p>
        <div className="flex items-center gap-4 text-ink-500">
          <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-electric transition-colors">
            <FiGithub size={16} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-electric transition-colors">
            <FiLinkedin size={16} />
          </a>
          <a href="mailto:vishal.chauhan@example.com" className="hover:text-electric transition-colors">
            <FiMail size={16} />
          </a>
        </div>
      </div>
    </footer>
  )
}
