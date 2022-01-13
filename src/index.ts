import { MetaRewriter, SitemapRewriter, StyleRewriter, SuperConfigRewriter } from "./rewriters";

/* Variables */
export const SUPER_SITE = "nourman-hajar.super.site";
export const CUSTOM_SITE = "nourman.id";

/* TODO: Update after every commit that changes CSS */
export const CUSTOM_CSS = "https://cdn.statically.io/gh/masnormen/site/334e7d89ce081cb87c5e581ade2d6cde7ebf5a04/styles/style.min.css";

/* Function for rewriting HTML */
const rewriteHtml = async (res: Response) =>{
  return new HTMLRewriter()
    .on("head", new StyleRewriter())
    .on("meta", new MetaRewriter())
    .on("script#__NEXT_DATA__", new SuperConfigRewriter())
    .transform(res);
};

/* Transform request */
const transformRequest = async (request: Request) => {
  const url = new URL(request.url);

  /* robots.txt */
  if (url.pathname === "/robots.txt") {
    return new Response(`User-agent: *\nDisallow: /api\nDisallow: /_next\nSitemap: https://${CUSTOM_SITE}/sitemap.xml`);
  }

  /* Proxying request to Super site */
  url.hostname = SUPER_SITE;
  url.protocol = "https:";
  url.port = "";

  let response = await fetch(url.toString(), {
    body: request.body,
    headers: request.headers,
    method: request.method,
  });
  
  response = new Response(response.body, response);
  const contentType = response.headers.get("content-type") || "";

  /* sitemap.xml */
  if (url.pathname === "/sitemap.xml") {
    return new HTMLRewriter().on("*", new SitemapRewriter()).transform(response);
  }

  /* .js files */
  if (url.pathname.endsWith(".js")) {
    return response;
  }

  /* .html files */
  if (contentType.startsWith("text/html")) {
    return rewriteHtml(response);
  }

  return response;
};

/* Listen to fetch events */
addEventListener("fetch", (event: FetchEvent) => {
  event.respondWith(transformRequest(event.request));
});
