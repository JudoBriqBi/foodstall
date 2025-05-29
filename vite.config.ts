import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import nodePolyfills from 'rollup-plugin-polyfill-node';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    nodePolyfills() // Add polyfills for Node.js modules
  ],
  base: '/',
  build: {
    target: 'esnext', // Ensure compatibility with modern environments
    rollupOptions: {
      plugins: [nodePolyfills()], // Ensure polyfills are applied during build
    },
  },
});
