const fs = require('fs');
const path = require('path');
const seoPages = require('./seoPages.cjs');

const rootDir = path.join(__dirname, '..');
const templatePath = path.join(rootDir, 'index.html');

if (!fs.existsSync(templatePath)) {
  console.error('Template index.html not found!');
  process.exit(1);
}

const template = fs.readFileSync(templatePath, 'utf-8');
let count = 0;

console.log('🚀 Starting Static Site Prerendering for Nighthawk PDF SEO pages...');

// Helper for internal linking mesh across programmatic pages
function getRelatedLinks(currentPath) {
  const others = seoPages.filter(p => p.path !== currentPath);
  // Pick deterministic/shuffled selection
  const subset = [...others].sort(() => 0.5 - Math.random()).slice(0, 6);
  return subset.map(p => `<li><a href="/${p.path}.html" style="color: #10b981; text-decoration: none; font-weight: 500;">${p.heroTitle} ${p.heroSubtitle}</a></li>`).join('\n          ');
}

seoPages.forEach(page => {
  const targetPath = path.join(rootDir, `${page.path}.html`);
  const pageUrl = `https://www.nighthawkpdfreader.app/${page.path}.html`;

  let pageHtml = template
    // Title & Description
    .replace(/<title>.*?<\/title>/, `<title>${page.title}</title>`)
    .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${page.metaDescription}" />`)
    
    // Canonical & Alternate hreflang
    .replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${pageUrl}" />\n    <link rel="alternate" hreflang="x-default" href="${pageUrl}" />`)
    
    // Open Graph
    .replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${page.title}" />`)
    .replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${page.metaDescription}" />`)
    .replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${pageUrl}" />`)
    
    // Twitter Card
    .replace(/<meta name="twitter:card" content="summary_large_image" \/>/, `<meta name="twitter:card" content="summary_large_image" />\n    <meta name="twitter:title" content="${page.title}" />\n    <meta name="twitter:description" content="${page.metaDescription}" />\n    <meta name="twitter:url" content="${pageUrl}" />`)
    
    // True static H1 replacement
    .replace(
      /<h1>The Ultimate<br\/>Lightweight<br\/>PDF Reader<\/h1>/,
      `<h1>${page.heroTitle}<br/><span style="background: linear-gradient(to right, #10b981, #059669); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">${page.heroSubtitle}</span></h1>`
    )
    
    // True static hero paragraph replacement
    .replace(
      /<div class="hero-right">\s*<p>.*?<\/p>\s*<\/div>/s,
      `<div class="hero-right">\n            <p>${page.heroText} Engineered purely in native C++ with Direct2D hardware acceleration for zero lag, zero memory bloat, and total offline privacy.</p>\n          </div>`
    );

  // Breadcrumb schema
  const breadcrumbSchema = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [{
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.nighthawkpdfreader.app/"
      },{
        "@type": "ListItem",
        "position": 2,
        "name": "${page.title}",
        "item": "${pageUrl}"
      }]
    }
    </script>
  `;
  pageHtml = pageHtml.replace('</head>', `${breadcrumbSchema}\n  </head>`);

  // Internal linking mesh
  const meshHtml = `
      <section style="background: rgba(255, 255, 255, 0.02); border-top: 1px solid rgba(255, 255, 255, 0.08); border-bottom: 1px solid rgba(255, 255, 255, 0.08); padding: 3rem 1.5rem; margin-top: 4rem;">
        <div style="max-width: 1000px; margin: 0 auto; text-align: center;">
          <h3 style="color: #ffffff; font-size: 1.25rem; font-weight: 600; margin-bottom: 1.5rem;">Explore More Specialized Guides & Benchmarks</h3>
          <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-wrap: wrap; justify-content: center; gap: 1rem 1.5rem; font-size: 0.9rem;">
          ${getRelatedLinks(page.path)}
          </ul>
        </div>
      </section>
  `;

  pageHtml = pageHtml.replace('</main>', `${meshHtml}\n      </main>`);

  fs.writeFileSync(targetPath, pageHtml, 'utf-8');
  console.log(`Prerendered: ${page.path}.html`);
  count++;
});

console.log(`✅ Successfully prerendered ${count} static SEO HTML pages with exact canonicals, OpenGraph, and static hero content.`);
