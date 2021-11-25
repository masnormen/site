import { MY_DOMAIN, SLUG_TO_PAGE, slugs } from "./config";
import { BodyRewriter, generateSitemap, handleOptions, HeadRewriter, MetaRewriter } from "./helpers";

async function appendJavascript(res: Response, SLUG_TO_PAGE: Record<string, string>) {
  return new HTMLRewriter()
    .on("title", new MetaRewriter())
    .on("meta", new MetaRewriter())
    .on("head", new HeadRewriter())
    .on("body", new BodyRewriter(SLUG_TO_PAGE))
    .transform(res);
}

async function fetchAndApply(request: Request) {
  if (request.method === "OPTIONS") {
    return handleOptions(request);
  }
  const url = new URL(request.url);
  url.hostname = "www.notion.so";

  /* Robots.txt and Sitemap */
  if (url.pathname === "/robots.txt") {
    return new Response(`Sitemap: https://${MY_DOMAIN}/sitemap.xml`);
  }
  if (url.pathname === "/sitemap.xml") {
    const response = new Response(generateSitemap());
    response.headers.set("content-type", "application/xml");
    return response;
  }

  /* Main Routes */
  let response;

  /* Serve JS files and apis */
  if (url.pathname.startsWith("/app") && url.pathname.endsWith("js")) {
    response = await fetch(url.toString());
    const body = await response.text();
    response = new Response(body.replace(/www.notion.so/g, MY_DOMAIN).replace(/notion.so/g, MY_DOMAIN), response);
    response.headers.set("Content-Type", "application/x-javascript");
    return response;
  }
  if (url.pathname.startsWith("/api")) {
    // Forward API
    response = await fetch(url.toString(), {
      body: url.pathname.startsWith("/api/v3/getPublicPageData") ? null : request.body,
      headers: {
        "content-type": "application/json;charset=UTF-8",
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36",
      },
      method: "POST",
    });
    response = new Response(response.body, response);
    response.headers.set("Access-Control-Allow-Origin", "*");
    return response;
  }

  /* Serve slugs */
  if (slugs.indexOf(url.pathname.slice(1)) > -1) {
    const pageId = SLUG_TO_PAGE[url.pathname.slice(1)];
    return Response.redirect(`https://${MY_DOMAIN}/${pageId}`, 301);
  }

  response = await fetch(url.toString(), {
    body: request.body,
    headers: request.headers,
    method: request.method,
  });
  response = new Response(response.body, response);
  response.headers.delete("Content-Security-Policy");
  response.headers.delete("X-Content-Security-Policy");
  return appendJavascript(response, SLUG_TO_PAGE);
}

addEventListener("fetch", (event: FetchEvent) => {
  event.respondWith(fetchAndApply(event.request));
});
