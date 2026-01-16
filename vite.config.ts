
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Ensure this matches your GitHub repository name exactly
  base: '/LSP/', 
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false
  },
  define: {
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
  }
});
