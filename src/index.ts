import { MY_DOMAIN, SLUG_TO_PAGE, slugs } from "./config";
import { DataRewriter, generateSitemap, handleOptions, HeadRewriter, MetaRewriter, XMLRewriter } from "./helpers";

async function rewriteHTML(res: Response) {
  return new HTMLRewriter()
    .on("head", new HeadRewriter())
    .on("script#__NEXT_DATA__", new DataRewriter())
    .transform(res);
}

async function fetchAndApply(request: Request) {
  const url = new URL(request.url);

  /* Robots.txt and Sitemap */
  if (url.pathname === "/robots.txt") {
    return new Response(`User-agent: *
Allow: /
Sitemap: https://${MY_DOMAIN}/sitemap.xml`);
  }

  url.hostname = "nourman-hajar.super.site";
  url.protocol = "https:";
  url.port = "";

  if (url.pathname === "/sitemap.xml") {
    let response = await fetch(url.toString(), {
      body: request.body,
      headers: request.headers,
      method: request.method,
    });
    response = new Response(response.body, response);
    return new HTMLRewriter()
      .on("*", new XMLRewriter())
      .transform(response);
  }

  let response = await fetch(url.toString(), {
    body: request.body,
    headers: request.headers,
    method: request.method,
  });
  response = new Response(response.body, response);

  if (url.pathname.endsWith(".js")) {
    return response;
  }

  return rewriteHTML(response);
}

addEventListener("fetch", (event: FetchEvent) => {
  event.respondWith(fetchAndApply(event.request));
});
