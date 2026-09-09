const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');

async function optimizeImages() {
  const images = [
    { src: 'nighthawk.jpg', dest: 'nighthawk.webp', quality: 82 },
    { src: 'logo.jpg', dest: 'logo.webp', quality: 82 },
    { src: 'nighthawk-logo.jpg', dest: 'nighthawk-logo.webp', quality: 82 }
  ];

  console.log('🖼️ Starting WebP Image Optimization...');

  for (const img of images) {
    const srcPath = path.join(publicDir, img.src);
    const destPath = path.join(publicDir, img.dest);

    if (fs.existsSync(srcPath)) {
      try {
        const originalSize = fs.statSync(srcPath).size;
        await sharp(srcPath)
          .webp({ quality: img.quality })
          .toFile(destPath);
        const newSize = fs.statSync(destPath).size;
        const savedPercent = (((originalSize - newSize) / originalSize) * 100).toFixed(1);
        console.log(`✅ Converted ${img.src} (${(originalSize/1024).toFixed(0)}KB) -> ${img.dest} (${(newSize/1024).toFixed(0)}KB) [Saved ${savedPercent}%]`);
      } catch (err) {
        console.error(`❌ Error converting ${img.src}:`, err);
      }
    } else {
      console.log(`⚠️ ${img.src} not found in ${publicDir}, skipping.`);
    }
  }
}

optimizeImages();
