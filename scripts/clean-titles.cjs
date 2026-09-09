const fs = require('fs');

const dir = './';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Match any title containing Ãƒ and replace the garbage with a dash
  // The regex matches everything up to the mojibake, then replaces the mojibake with ' - '
  // For example: <title>Native C++ Performance ÃƒÆ’Ã†â€™... Nighthawk PDF Reader</title>
  // Becomes: <title>Native C++ Performance - Nighthawk PDF Reader</title>
  
  content = content.replace(/<title>(.*?)(Ãƒ.*?)(Nighthawk PDF Reader)<\/title>/, '<title>$1 - $3</title>');
  
  // Also check if there's mojibake in other tags just in case
  content = content.replace(/ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢[\s\S]*?(such as Predator)/, '— $1');
  
  fs.writeFileSync(file, content);
}

console.log('Fixed titles');
