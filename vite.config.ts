import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages (project site): the site lives at /repository-name/ — set the same in CI, e.g.
//   VITE_BASE=/my-repo/ npm run build
// Netlify, Vercel, or custom root domain: leave default (/) or do not set VITE_BASE.
const base = (process.env.VITE_BASE || '/').replace(/([^/])$/, '$1/')

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
})
