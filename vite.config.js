import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { APP_CONFIG } from './src/config/appConfig'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: APP_CONFIG.PROXY_TARGET,
        changeOrigin: true,
        secure: false,
      },
    },
  },
})