import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: '.', // Ensure it's using the root folder
  publicDir: 'public',
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: './public/index.html' // This tells Vite where to start
    }
  }
});
