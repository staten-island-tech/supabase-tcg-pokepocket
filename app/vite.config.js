// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      '@': '/src', // This allows you to use '@' for the src folder
    },
  },
});
