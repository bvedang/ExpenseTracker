import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://dolphin-app-95g38.ondigitalocean.app/',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
});
