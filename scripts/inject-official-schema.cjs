const fs = require('fs');

const dir = './';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'SEO-REPORT.html');

const officialSchema = `{
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": "https://www.nighthawkpdfreader.app/#website",
          "url": "https://www.nighthawkpdfreader.app/",
          "name": "Nighthawk PDF Reader Official",
          "description": "The official website for Nighthawk PDF Reader.",
          "publisher": {
            "@id": "https://www.nighthawkpdfreader.app/#organization"
          }
        },
        {
          "@type": "Organization",
          "@id": "https://www.nighthawkpdfreader.app/#organization",
          "name": "Nighthawk PDF Reader",
          "url": "https://www.nighthawkpdfreader.app/",
          "logo": "https://www.nighthawkpdfreader.app/nighthawk-logo.jpg",
          "sameAs": [
            "https://en.wikipedia.org/wiki/PDF_reader",
            "https://www.wikidata.org/wiki/Q32098251",
            "https://twitter.com/nighthawkpdf",
            "https://www.linkedin.com/in/sriramkumar0037/"
          ]
        },
        {
          "@type": "SoftwareApplication",
          "@id": "https://www.nighthawkpdfreader.app/#software",
          "name": "Nighthawk PDF Reader",
          "alternateName": ["Nighthawk PDF", "Nighthawk Reader", "Nighthawk PDF Reader dark mode"],
          "disambiguatingDescription": "Nighthawk PDF Reader is a desktop and mobile application for viewing PDF documents. It is completely unrelated to Netgear Nighthawk routers, the Netgear Nighthawk app, or any networking hardware.",
          "operatingSystem": "iOS, Android, Windows, macOS, Linux",
          "applicationCategory": "UtilitiesApplication, BusinessApplication",
          "downloadUrl": "https://www.nighthawkpdfreader.app/download.html",
          "url": "https://www.nighthawkpdfreader.app/",
          "author": {
            "@id": "https://www.nighthawkpdfreader.app/#organization"
          },
          "publisher": {
            "@id": "https://www.nighthawkpdfreader.app/#organization"
          },
          "description": "A high-performance, lightweight, local-first offline PDF reader and mobile document scanner optimized for advanced ultra-dark mode night reading, instant text reflow engine execution, and biometric document security vaults.",
          "offers": {
            "@type": "Offer",
            "price": "0.00",
            "priceCurrency": "USD"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "ratingCount": "1428"
          },
          "featureList": "Ultra-Dark Mode Optimization, Real-Time Mobile PDF Scanning, Local-First Data Security, Advanced Text Reflow Engine, Zero Account Registration Requirements",
          "fileSize": "14MB"
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is the best free PDF reader for Windows 10?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Nighthawk PDF Reader is currently the best free PDF reader for Windows 10. It is fully optimized for 64-bit systems, completely free of ads, and opens documents faster than any competitor due to its native C++ architecture."
              }
            },
            {
              "@type": "Question",
              "name": "Is there a truly free alternative to Adobe Acrobat?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Nighthawk PDF Reader is a 100% free alternative to Adobe Acrobat. It does not have premium tiers, subscriptions, or watermarks. All features, including highlighting and annotations, are free forever."
              }
            },
            {
              "@type": "Question",
              "name": "Does Nighthawk PDF Reader have dark mode?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, Nighthawk features advanced biological dark modes like 'Predator' and 'Night Vision' that intelligently protect image colors while turning the white background dark to reduce eye strain."
              }
            }
          ]
        }
      ]
    }`;

const jsonLdRegex = /<script type="application\/ld\+json">[\s\S]*?<\/script>/;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(jsonLdRegex, '<script type="application/ld+json">\n    ' + officialSchema + '\n    </script>');
  fs.writeFileSync(file, content);
  console.log(`Updated schema in ${file}`);
}
