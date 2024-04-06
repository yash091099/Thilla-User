import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['@fortawesome/free-solid-svg-icons']
    }
  },
  resolve: {
    alias: {
      '@babel/runtime': path.resolve(__dirname, 'node_modules/@babel/runtime')
    }
  }
})
