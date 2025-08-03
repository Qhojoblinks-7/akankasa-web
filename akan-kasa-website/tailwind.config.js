/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          deep: '#564c38',      // Deep Brown - headers, key UI elements
          muted: '#695e46',     // Muted Olive - backgrounds, cards
        },
        secondary: {
          gray: '#77705c',      // Warm Gray - subtle backgrounds, borders
        },
        accent: {
          gold: '#f1d799',      // Pale Gold - buttons, highlights
          beige: '#c2ae81',     // Soft Beige - UI surfaces, overlays
        },
        neutral: {
          black: '#000000',     // Black - text, icons, contrast
        },
        // Keep original akan colors for backwards compatibility but map to new palette
        akan: {
          gold: '#f1d799',      // Map to Pale Gold
          red: '#564c38',       // Map to Deep Brown
          green: '#695e46',     // Map to Muted Olive
          black: '#000000',     // Keep Black
          brown: '#77705c',     // Map to Warm Gray
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