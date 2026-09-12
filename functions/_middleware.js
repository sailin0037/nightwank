export async function onRequest(context) {
  const { request, next, env } = context;
  const url = new URL(request.url);
  const acceptHeader = request.headers.get("accept") || "";

  // 1. Robots.txt: Clean AEO and search engine directives
  if (url.pathname === "/robots.txt") {
    const robotsTxt = `User-agent: *
Allow: /

# Answer Engine Optimization (AEO)
# Explicitly allow AI crawlers so Nighthawk PDF Reader is cited in search and AI overviews
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: Bytespider
Allow: /

User-agent: CCBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: FacebookBot
Allow: /

User-agent: Amazonbot
Allow: /

Allow: /llms.txt
Allow: /index.md
Allow: /auth.md

Sitemap: https://www.nighthawkpdfreader.app/sitemap.xml
`;
    return new Response(robotsTxt, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }

  // 2. Markdown content negotiation
  if (acceptHeader.toLowerCase().includes("text/markdown")) {
    let mdPath = "/index.md";
    if (url.pathname === "/auth" || url.pathname === "/auth.md") {
      mdPath = "/auth.md";
    } else if (url.pathname.endsWith(".md")) {
      mdPath = url.pathname;
    }

    try {
      const mdUrl = new URL(mdPath, request.url);
      const assetRes = await env.ASSETS.fetch(mdUrl);
      if (assetRes && assetRes.ok) {
        const markdown = await assetRes.text();
        const tokens = Math.round(markdown.length / 4);
        return new Response(markdown, {
          status: 200,
          headers: {
            "Content-Type": "text/markdown; charset=utf-8",
            "x-markdown-tokens": String(tokens),
            "Access-Control-Allow-Origin": "*",
            "Vary": "Accept"
          }
        });
      }
    } catch (err) {
      // Proceed if asset fetch fails
    }
  }

  // 3. Extensionless URL mapping (e.g., /trust or /security -> /security.html)
  if (url.pathname === "/trust" || url.pathname === "/security") {
    const targetUrl = new URL("/security.html", request.url);
    const assetRes = await env.ASSETS.fetch(targetUrl);
    if (assetRes && assetRes.ok) {
      return new Response(assetRes.body, {
        status: 200,
        headers: {
          ...Object.fromEntries(assetRes.headers.entries()),
          "Content-Type": "text/html; charset=utf-8"
        }
      });
    }
  }

  // 4. Try default asset handling
  const response = await next();

  // 5. Handle missing routes cleanly (prevent soft 404)
  if (response.status === 404) {
    try {
      const notFoundUrl = new URL("/404.html", request.url);
      const notFoundRes = await env.ASSETS.fetch(notFoundUrl);
      if (notFoundRes && notFoundRes.ok) {
        return new Response(notFoundRes.body, {
          status: 404,
          headers: {
            "Content-Type": "text/html; charset=utf-8"
          }
        });
      }
    } catch (e) {
      // Fallback
    }
  }

  return response;
}
