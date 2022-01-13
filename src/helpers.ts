import { MY_DOMAIN, CUSTOM_SCRIPT, GOOGLE_FONT, PAGE_DESCRIPTION, PAGE_TITLE, slugs } from "./config";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, HEAD, POST, PUT, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export function handleOptions(request: Request) {
  if (
    request.headers.get("Origin") !== null &&
    request.headers.get("Access-Control-Request-Method") !== null &&
    request.headers.get("Access-Control-Request-Headers") !== null
  ) {
    // Handle CORS pre-flight request.
    return new Response(null, {
      headers: corsHeaders,
    });
  }
  // Handle standard OPTIONS request.
  return new Response(null, {
    headers: {
      Allow: "GET, HEAD, POST, PUT, OPTIONS",
    },
  });
}

export async function generateSitemap(url: string, request: Request) {
  console.log("URLLLL:", url);
  const sitemap = await fetch(url, {
    body: request.body,
    headers: request.headers,
    method: request.method,
  });

  const response = await sitemap.text;
  return response.replace("nourman-hajar.super.site", MY_DOMAIN);
}

export class MetaRewriter {
  element(element: Element) {
    if (element.getAttribute("property") === "og:url") {
      element.setAttribute("content", MY_DOMAIN);
    }
  }
}

export class HeadRewriter {
  element(element: Element) {
    element.append(
      `<style>.super-badge { display: none !important; visibility: hidden !important; pointer-events: none !important; }</style>`,
      {
        html: true,
      }
    );
  }
}

export class DataRewriter {
  buffer = "";
  text(text: Text) {
    this.buffer += text.text;

    if (text.lastInTextNode) {
      // We're done with this text node -- search and replace and reset.
      text.replace(this.buffer.replaceAll("nourman-hajar.super.site", MY_DOMAIN));
      this.buffer = "";
    } else {
      // This wasn't the last text chunk, and we don't know if this chunk
      // will participate in a match. We must remove it so the client
      // doesn't see it.
      text.remove();
    }
  }
}

export class XMLRewriter {
  buffer = "";
  text(text: Text) {
    this.buffer += text.text;

    if (text.lastInTextNode) {
      // We're done with this text node -- search and replace and reset.
      text.replace(this.buffer.replaceAll("nourman-hajar.super.site", MY_DOMAIN));
      this.buffer = "";
    } else {
      // This wasn't the last text chunk, and we don't know if this chunk
      // will participate in a match. We must remove it so the client
      // doesn't see it.
      text.remove();
    }
  }
}
