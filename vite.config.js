import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        darkMode: resolve(__dirname, 'dark-mode.html'),
        annotations: resolve(__dirname, 'annotations.html'),
        performance: resolve(__dirname, 'performance.html'),
        privacy: resolve(__dirname, 'privacy.html'),
        download: resolve(__dirname, 'download.html'),
      },
    },
  },
});
