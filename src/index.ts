import { MetaRewriter, SitemapRewriter, StyleRewriter, SuperConfigRewriter } from "./helpers";

export const SITE_DOMAIN = "nourman.id";

async function rewriteHTML(res: Response) {
  return new HTMLRewriter()
    .on("head", new StyleRewriter())
    .on("meta", new MetaRewriter())
    .on("script#__NEXT_DATA__", new SuperConfigRewriter())
    .transform(res);
}

async function fetchAndApply(request: Request) {
  const url = new URL(request.url);

  /* Robots.txt */
  if (url.pathname === "/robots.txt") {
    return new Response(`User-agent: *\nDisallow: /api\nDisallow: /_next\nSitemap: https://${SITE_DOMAIN}/sitemap.xml`);
  }

  url.hostname = "nourman-hajar.super.site";
  url.protocol = "https:";
  url.port = "";

  /* Sitemap */
  if (url.pathname === "/sitemap.xml") {
    let response = await fetch(url.toString(), {
      body: request.body,
      headers: request.headers,
      method: request.method,
    });
    response = new Response(response.body, response);
    return new HTMLRewriter().on("*", new SitemapRewriter()).transform(response);
  }

  let response = await fetch(url.toString(), {
    body: request.body,
    headers: request.headers,
    method: request.method,
  });
  response = new Response(response.body, response);

  /* JS files */
  if (url.pathname.endsWith(".js")) {
    return response;
  }

  /* Anything else */
  return rewriteHTML(response);
}

addEventListener("fetch", (event: FetchEvent) => {
  event.respondWith(fetchAndApply(event.request));
});
