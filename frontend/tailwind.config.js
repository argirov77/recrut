// frontend/tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      /* ─── фирменная палитра ───────────────────────────── */
      colors: {
        primary:     '#1A0940', // индиго — основной текст
        accentGreen: '#00966E', // зелёный — success / active
        accentRed:   '#D62612', // красный — CTA
        accentCyan:  '#0CC3E6', // бирюзовый — декор / hover
      },

      /* ─── шрифты ──────────────────────────────────────── */
      fontFamily: {
        sans:    ['Inter', 'ui-sans-serif', 'system-ui'],
        heading: ['Montserrat', 'ui-sans-serif', 'system-ui'],
      },

      /* ─── анимация «накрытия» секций ──────────────────── */
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(60px) scale(0.98)' },
          '100%': { opacity: '1', transform: 'translateY(0)    scale(1)'    },
        },
        'fade-down': {
          '0%':   { opacity: '0', transform: 'translateY(-40px) scale(0.98)' },
          '100%': { opacity: '1', transform: 'translateY(0)      scale(1)'    },
        },
      },
      animation: {
        'fade-up':   'fade-up 0.7s ease-out forwards',
        'fade-down': 'fade-down 0.6s ease-out forwards',
      },

      /* ─── z‑index уровни для видео/оверлеев ───────────── */
      zIndex: {
        '-10': '-10',
        '-20': '-20',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
  ],
};
