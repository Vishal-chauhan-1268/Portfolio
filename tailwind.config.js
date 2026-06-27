/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: '#050505',
        surface: '#0a0a0d',
        electric: {
          DEFAULT: '#4d7fff',
          dim: '#2f53cc',
          glow: '#6e9bff',
        },
        violet: {
          DEFAULT: '#8b5cf6',
          dim: '#6d3fd1',
        },
        cyanx: {
          DEFAULT: '#3fe0e0',
          dim: '#2bb8b8',
        },
        ink: {
          100: '#f4f5f7',
          300: '#b8bcc6',
          500: '#7d828f',
          700: '#42454d',
        },
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        glass: '0 8px 32px rgba(0,0,0,0.45)',
        'glow-electric': '0 0 40px rgba(77,127,255,0.35)',
        'glow-violet': '0 0 40px rgba(139,92,246,0.3)',
        'glow-cyan': '0 0 40px rgba(63,224,224,0.3)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'spin-slow': 'spin 18s linear infinite',
        shimmer: 'shimmer 2.4s linear infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'pulse-glow': {
          '0%,100%': { opacity: 0.5 },
          '50%': { opacity: 1 },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
