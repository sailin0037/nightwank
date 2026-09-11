export async function onRequest(context) {
  const { request, next, env } = context;
  const acceptHeader = request.headers.get("accept") || "";

  // Check for Markdown content negotiation request
  if (acceptHeader.toLowerCase().includes("text/markdown")) {
    const url = new URL(request.url);
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
      // If asset fetch fails, proceed with default flow
    }
  }

  return await next();
}
