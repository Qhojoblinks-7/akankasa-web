/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        akan: {
          gold: '#FFD700',
          red: '#CC0000',
          green: '#008000',
          black: '#000000',
          brown: '#8B4513',
        }
      },
      fontFamily: {
        'akan': ['Georgia', 'serif'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}