import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages deployment expects base path to be /<repo-name>/ if not using custom domain.
  // We'll set it to relative for generic hosting for now.
  base: './',
})
