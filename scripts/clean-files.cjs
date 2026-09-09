const fs = require('fs');
const path = require('path');

const dir = './';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'index.html' && f !== 'SEO-REPORT.html');

const indexHtml = fs.readFileSync('index.html', 'utf8');

const jsonLdRegex = /<script type="application\/ld\+json">[\s\S]*?<\/script>/;
const pristineJsonLd = indexHtml.match(jsonLdRegex)[0];

const articleRegex = /<article class="prose seo-content">[\s\S]*?<\/article>/;
const pristineArticle = indexHtml.match(articleRegex)[0];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  content = content.replace(jsonLdRegex, pristineJsonLd);
  content = content.replace(/<article class="prose seo-content">[\s\S]*?<\/article>/g, '');
  content = content.replace('</main>', pristineArticle + '\n      </main>');
  
  fs.writeFileSync(file, content);
  console.log(`Cleaned ${file}`);
}
