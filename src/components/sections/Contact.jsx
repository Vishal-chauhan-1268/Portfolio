import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { FiSend, FiGithub, FiLinkedin, FiMail, FiCheck } from 'react-icons/fi'
import SectionHeading from '../ui/SectionHeading'
import MagneticButton from '../ui/MagneticButton'

// EmailJS config — replace with your own service/template/public key from emailjs.com
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'

function FloatingLabelInput({ label, name, type = 'text', value, onChange, textarea = false }) {
  const [focused, setFocused] = useState(false)
  const filled = value?.length > 0
  const Comp = textarea ? 'textarea' : 'input'

  return (
    <div className="relative">
      <Comp
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows={textarea ? 4 : undefined}
        required
        className="w-full bg-white/[0.03] border border-ink-700 rounded-xl px-4 pt-6 pb-2.5 text-sm text-ink-100 outline-none transition-colors focus:border-electric resize-none"
      />
      <motion.label
        animate={{
          top: focused || filled ? 8 : '50%',
          fontSize: focused || filled ? '11px' : '14px',
          color: focused ? '#4d7fff' : '#7d828f',
        }}
        initial={false}
        transition={{ duration: 0.18 }}
        className="absolute left-4 -translate-y-1/2 pointer-events-none font-body"
      >
        {label}
      </motion.label>
    </div>
  )
}

export default function Contact() {
  const formRef = useRef(null)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      if (EMAILJS_SERVICE_ID !== 'YOUR_SERVICE_ID') {
        await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, EMAILJS_PUBLIC_KEY)
      } else {
        await new Promise((r) => setTimeout(r, 900)) // demo delay until keys are configured
      }
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setStatus('idle'), 3500)
    } catch (err) {
      console.error(err)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  return (
    <section id="contact" className="section">
      <div className="section-inner">
        <div className="glass rounded-3xl p-6 md:p-12 relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-electric/15 blur-3xl rounded-full" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-violet/15 blur-3xl rounded-full" />

          <SectionHeading
            eyebrow="Contact"
            title="Let's build something worth shipping."
            subtitle="Open to Software Engineering internships and full-stack collaborations. Drop a message below."
          />

          <div className="grid md:grid-cols-[1fr_1.2fr] gap-10 relative z-10">
            <div className="flex flex-col gap-4">
              {[
                { icon: FiMail, label: 'Email', value: 'vishal.chauhan@gmail.com', href: 'mailto:vishal.chauhan@example.com' },
                { icon: FiGithub, label: 'GitHub', value: 'github.com/vishalchauhan', href: 'https://github.com' },
                { icon: FiLinkedin, label: 'LinkedIn', value: 'linkedin.com/in/vishalchauhan', href: 'https://linkedin.com' },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 glass rounded-2xl p-4 hover:border-electric/40 transition-colors group"
                >
                  <span className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-cyanx group-hover:scale-110 transition-transform">
                    <item.icon size={17} />
                  </span>
                  <div>
                    <div className="text-xs text-ink-500">{item.label}</div>
                    <div className="text-sm text-ink-100">{item.value}</div>
                  </div>
                </a>
              ))}
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
              <FloatingLabelInput label="Your Name" name="name" value={form.name} onChange={handleChange} />
              <FloatingLabelInput label="Your Email" name="email" type="email" value={form.email} onChange={handleChange} />
              <FloatingLabelInput label="Your Message" name="message" textarea value={form.message} onChange={handleChange} />

              <MagneticButton
                variant="primary"
                className="mt-2 w-full md:w-fit"
                onClick={status === 'idle' ? undefined : undefined}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {status === 'sent' ? (
                    <motion.span key="sent" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                      <FiCheck /> Message Sent
                    </motion.span>
                  ) : status === 'sending' ? (
                    <motion.span key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      Sending...
                    </motion.span>
                  ) : (
                    <motion.span key="send" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                      Send Message <FiSend size={14} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </MagneticButton>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
