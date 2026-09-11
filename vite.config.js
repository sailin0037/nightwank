import { resolve } from 'path';
import { defineConfig } from 'vite';
import fs from 'fs';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import viteCompression from 'vite-plugin-compression';

const currentDir = typeof __dirname !== 'undefined' ? __dirname : import.meta.dirname;

// Dynamically grab all HTML files so we never forget to add a new page to the build
const htmlFiles = fs.readdirSync(currentDir).filter(file => file.endsWith('.html') && file !== 'SEO-REPORT.html');
const input = {};
htmlFiles.forEach(file => {
  const name = file.replace('.html', '');
  input[name] = resolve(currentDir, file);
});

export default defineConfig({
  plugins: [
    ViteImageOptimizer({
      png: { quality: 80 },
      jpeg: { quality: 80 },
      jpg: { quality: 80 },
      webp: { lossless: true },
      avif: { lossless: true },
    }),
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
    })
  ],
  build: {
    target: 'esnext',
    rollupOptions: {
      input
    },
  },
});
