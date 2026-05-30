import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  server: {
    proxy: {
      // Browser calls /celestrak/...  ->  Vite forwards to https://celestrak.org/...
      '/celestrak': {
        target: 'https://celestrak.org',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/celestrak/, ''),
      },
    },
  },
})
