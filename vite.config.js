import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      }
    },
    watch: {
      ignored: ['**/backend/**', '**/*.db', '**/*.db-wal', '**/*.db-shm', '**/node_modules/**']
    }
  }
})