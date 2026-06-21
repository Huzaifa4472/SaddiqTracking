/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        siddiq: {
          green: '#0F5132',
          greenLight: '#1E8449',
          blue: '#1B4965',
          blueLight: '#2E86AB',
          gold: '#C9A227',
          goldLight: '#E0B93D',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 10px rgba(15, 81, 50, 0.08)',
        cardDark: '0 2px 10px rgba(0,0,0,0.35)',
      },
    },
  },
  plugins: [],
}
