const fs = require('fs');

const dir = './';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'index.html' && f !== 'SEO-REPORT.html');

const indexHtml = fs.readFileSync('index.html', 'utf8');

// Extract pristine footer
const footerRegex = /<footer[\s\S]*?<\/footer>/;
const pristineFooter = indexHtml.match(footerRegex)[0];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Remove any existing footers
  content = content.replace(/<footer[\s\S]*?<\/footer>/g, '');
  
  // Insert pristine footer right before the closing site-wrapper div
  // The structure is usually:
  //     </div>
  //     <script type="module" src="/src/main.js"></script>
  //   </body>
  
  // We'll just replace the last </div> before </body>
  const lastDivIndex = content.lastIndexOf('</div>');
  if (lastDivIndex !== -1) {
    content = content.substring(0, lastDivIndex) + pristineFooter + '\n    </div>' + content.substring(lastDivIndex + 6);
  }
  
  fs.writeFileSync(file, content);
  console.log(`Added footer to ${file}`);
}
