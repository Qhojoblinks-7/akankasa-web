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
          // Primary colors
          'deep-brown': '#564c38',
          'muted-olive': '#695e46',
          // Secondary colors
          'warm-gray': '#77705c',
          // Accent colors
          'pale-gold': '#f1d799',
          'soft-beige': '#c2ae81',
          // Neutral
          'black': '#000000',
          
          // Legacy aliases for backward compatibility
          primary: '#564c38',
          'primary-light': '#695e46',
          secondary: '#77705c',
          accent: '#f1d799',
          'accent-light': '#c2ae81',
          dark: '#000000',
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