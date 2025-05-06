import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  server: {
    proxy: {
      '/graphql': { // proxy websocket does not work https://github.com/oven-sh/bun/issues/14522
        target: 'http://localhost:3000/graphql',
        changeOrigin: true,
      }
    },
  },
})
