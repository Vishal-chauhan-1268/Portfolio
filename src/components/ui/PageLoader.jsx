import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function PageLoader({ onDone }) {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(p + Math.random() * 18, 100)
        if (next >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setDone(true)
            onDone?.()
          }, 400)
        }
        return next
      })
    }, 180)
    return () => clearInterval(interval)
  }, [onDone])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] bg-void flex flex-col items-center justify-center"
        >
          <span className="font-display text-2xl tracking-widest text-ink-100 mb-6">
            VISHAL<span className="text-electric">.</span>DEV
          </span>
          <div className="w-56 h-px bg-ink-700 overflow-hidden relative">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-electric via-violet to-cyanx"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="font-mono text-xs text-ink-500 mt-4">{Math.floor(progress)}%</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
