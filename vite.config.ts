
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Change 'LSProfit' to your actual repository name if it differs
  base: '/LSP/', 
  build: {
    outDir: 'dist',
  },
  server: {
    port: 3000,
  }
});
