import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/apptica-test/",
  plugins: [react()],
  resolve: {
    alias: {
      src: '/src'
    }
  },
})
