import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/Tic-Tac-Toe/',

  plugins: [
    tailwindcss(),
  ],
})