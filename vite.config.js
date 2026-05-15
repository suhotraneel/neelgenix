import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  base: command === 'serve' ? "/" : (process.env.VERCEL ? "/" : "/neelgenix/"),
  plugins: [react()],
}))
