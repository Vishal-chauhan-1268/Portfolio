# Vishal Chauhan — 3D Software Engineer Portfolio

A cinematic, Apple-launch-inspired developer portfolio built with React, Three.js (via React Three Fiber), Tailwind CSS, Framer Motion, GSAP, and Lenis smooth scroll.

## Stack
- **React + Vite** — app shell
- **Tailwind CSS** — styling (custom theme tokens in `tailwind.config.js`)
- **React Three Fiber + Drei** — 3D hero "dev room" scene and Skill Galaxy
- **Framer Motion** — section reveals, modals, micro-interactions
- **Lenis** — smooth scroll
- **EmailJS** — contact form delivery
- **React Icons** — iconography

## Getting Started

```bash
npm install
npm run dev       # local dev server
npm run build     # production build -> dist/
npm run preview   # preview the production build
```

## Project Structure

```
src/
  components/
    sections/     # Navbar, Hero, About, Skills, Projects, Experience,
                   # Certificates, GitHubSection, Contact, Footer
    three/         # DevRoomScene.jsx, SkillGalaxy.jsx (R3F scenes)
    ui/             # CustomCursor, MagneticButton, GlassCard,
                     # SectionHeading, PageLoader, ScrollProgress
  data/            # skills.js, projects.js, profile.js — edit these
                    # to update content without touching components
  hooks/           # useLenis, useTheme, useActiveSection
  index.css        # global styles, glass utility, scrollbar, cursor reset
```

## Configuration You Need To Do

1. **EmailJS** — open `src/components/sections/Contact.jsx` and replace:
   - `EMAILJS_SERVICE_ID`
   - `EMAILJS_TEMPLATE_ID`
   - `EMAILJS_PUBLIC_KEY`
   with your own values from [emailjs.com](https://www.emailjs.com/). Until then, the form simulates a send for demo purposes.

2. **GitHub stats** — open `src/components/sections/GitHubSection.jsx` and change
   `GITHUB_USERNAME` to your real GitHub handle so the live stats/streak images resolve.

3. **Resume** — drop your PDF at `public/resume.pdf` (the "Download Resume" button already links there).

4. **Ambient sound** (optional) — drop an mp3 at `public/ambient.mp3` to enable the navbar sound toggle.

5. **Social links** — update the GitHub/LinkedIn/email links in `Contact.jsx` and `Footer.jsx`.

6. **Content** — all copy (skills, projects, experience, certificates) lives in `src/data/*.js`. Edit there instead of inside components.

## Notes on Performance
- The two heavy 3D scenes (`DevRoomScene`, `SkillGalaxy`) are lazy-mounted inside `<Suspense>` and only render in their own section's canvas — they don't run globally.
- `prefers-reduced-motion` is respected globally via CSS.
- For production, consider code-splitting the Three.js bundle further (see the build warning about chunk size) using `React.lazy` per section if initial load time matters more than simplicity.

## Deployment
Any static host works (Vercel, Netlify, GitHub Pages):
```bash
npm run build
# deploy the dist/ folder
```
