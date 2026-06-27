import { motion } from 'framer-motion'
import { FiGithub } from 'react-icons/fi'
import SectionHeading from '../ui/SectionHeading'

const GITHUB_USERNAME = 'vishalchauhan'

export default function GitHubSection() {
  return (
    <section id="github" className="section">
      <div className="section-inner">
        <SectionHeading
          eyebrow="Open Source"
          title="Code in motion."
          subtitle="Live activity, pinned work, and language footprint — pulled directly from GitHub."
        />

        <div className="grid md:grid-cols-2 gap-5 mb-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-5 overflow-hidden"
          >
            <img
              src={`https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}&show_icons=true&theme=transparent&hide_border=true&title_color=4d7fff&icon_color=3fe0e0&text_color=b8bcc6&bg_color=00000000`}
              alt="GitHub stats"
              className="w-full"
              loading="lazy"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass rounded-2xl p-5 overflow-hidden"
          >
            <img
              src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${GITHUB_USERNAME}&layout=compact&theme=transparent&hide_border=true&title_color=4d7fff&text_color=b8bcc6&bg_color=00000000`}
              alt="Top languages"
              className="w-full"
              loading="lazy"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-5 overflow-hidden mb-5"
        >
          <img
            src={`https://github-readme-streak-stats.herokuapp.com/?user=${GITHUB_USERNAME}&theme=transparent&hide_border=true&background=00000000&ring=4D7FFF&fire=8B5CF6&currStreakLabel=3FE0E0`}
            alt="Contribution streak"
            className="w-full"
            loading="lazy"
          />
        </motion.div>

        <div className="text-center">
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass hover:border-electric/50 text-sm font-medium transition-colors"
          >
            <FiGithub size={16} /> View Full Profile
          </a>
        </div>
      </div>
    </section>
  )
}
