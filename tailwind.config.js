/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'yellow-600': '#ca8a04',
        'yellow-500': '#f59e0b',
        'yellow-400': '#fbbf24',
        'gray-900': '#111827',
        'gray-800': '#1f2937',
        'gray-700': '#374151',
        'gray-600': '#4b5563',
        'gray-500': '#6b7280',
        'gray-400': '#9ca3af',
        'gray-300': '#d1d5db',
        'gray-200': '#e5e7eb',
        'gray-100': '#f3f4f6',
        'primary': '#ca8a04',
        'primary-hover': '#f59e0b',
        'secondary': '#374151',
        'surface': '#ffffff',
        'surface-dark': '#262626',
      },
      fontFamily: {
        display: ['Georama', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        accent: ['EB Garamond', 'serif'],
      },
    },
  },
  plugins: [],
};
