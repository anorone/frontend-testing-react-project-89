/// <reference types="vitest/config" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    css: true,
    setupFiles: ['./vitest.setup.js'],
    server: {
      deps: {
        inline: ['@hexlet/chatbot-v2'],
      },
    },
  },
})
