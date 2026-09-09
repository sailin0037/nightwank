const fs = require('fs');
const path = require('path');
const seoPages = require('./seoPages.cjs');

const today = new Date().toISOString().split('T')[0];
const baseUrl = 'https://www.nighthawkpdfreader.app';

const corePages = [
  { loc: `${baseUrl}/`, changefreq: 'daily', priority: '1.0' },
  { loc: `${baseUrl}/download.html`, changefreq: 'daily', priority: '0.9' },
  { loc: `${baseUrl}/performance.html`, changefreq: 'daily', priority: '0.8' },
  { loc: `${baseUrl}/privacy.html`, changefreq: 'daily', priority: '0.8' },
  { loc: `${baseUrl}/dark-mode.html`, changefreq: 'daily', priority: '0.8' },
  { loc: `${baseUrl}/annotations.html`, changefreq: 'daily', priority: '0.8' },
  { loc: `${baseUrl}/windows-10-pdf-reader.html`, changefreq: 'daily', priority: '0.8' },
  { loc: `${baseUrl}/windows-11-pdf-reader.html`, changefreq: 'daily', priority: '0.8' },
  { loc: `${baseUrl}/best-free-pdf-reader.html`, changefreq: 'daily', priority: '0.8' },
  { loc: `${baseUrl}/fastest-pdf-reader.html`, changefreq: 'daily', priority: '0.8' },
  { loc: `${baseUrl}/adobe-acrobat-alternative.html`, changefreq: 'daily', priority: '0.8' },
  { loc: `${baseUrl}/offline-pdf-reader.html`, changefreq: 'daily', priority: '0.8' },
  { loc: `${baseUrl}/science-of-dark-mode-reading.html`, changefreq: 'daily', priority: '0.8' },
  { loc: `${baseUrl}/is-it-safe-to-upload-pdfs.html`, changefreq: 'daily', priority: '0.8' },
  { loc: `${baseUrl}/best-open-source-pdf-tools.html`, changefreq: 'daily', priority: '0.8' },
  { loc: `${baseUrl}/how-to-fix-pdf-rendering-lag.html`, changefreq: 'daily', priority: '0.8' }
];

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

for (const page of corePages) {
  xml += `  <url>
    <loc>${page.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
}

for (const page of seoPages) {
  xml += `  <url>
    <loc>${baseUrl}/${page.path}.html</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
`;
}

xml += `</urlset>
`;

const publicPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
const rootPath = path.join(__dirname, '..', 'sitemap.xml');

fs.writeFileSync(publicPath, xml);
fs.writeFileSync(rootPath, xml);

console.log(`✅ Sitemap dynamically generated with ${corePages.length + seoPages.length} URLs (${seoPages.length} Programmatic SEO pages synced).`);
