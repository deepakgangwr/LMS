import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'    // <- add this!

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://lms-yo4y.onrender.com',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),   // <- add this!
    },
  },
})
