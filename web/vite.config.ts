import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// base: tên repo GitHub Pages — web sẽ chạy tại
// https://<username>.github.io/xemdat-online/
export default defineConfig({
  base: '/xemdat-online/',
  plugins: [react(), tailwindcss()],
})
