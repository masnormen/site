import { SITE_DOMAIN } from ".";
export class MetaRewriter {
  element(element: Element) {
    /* Replace Super domain with custom domain */
    if (element.getAttribute("property") === "og:url") {
      element.setAttribute("content", SITE_DOMAIN);
    }
    /* Make site indexable by search engines */
    if (element.getAttribute("name") === "robots" || element.getAttribute("name") === "googlebot") {
      element.setAttribute("content", "index,follow");
    }
  }
}

export class StyleRewriter {
  element(element: Element) {
    /* Hide Super.so branding */
    element.append(
      `<style>.super-badge { display: none !important; visibility: hidden !important; pointer-events: none !important; }</style>`,
      {
        html: true,
      }
    );
  }
}

export class SuperConfigRewriter {
  buffer = "";

  text(text: Text) {
    this.buffer += text.text;

    if (text.lastInTextNode) {
      text.replace(
        this.buffer
          /* Replace Super domain with custom domain */
          .replaceAll("nourman-hajar.super.site", SITE_DOMAIN)
          /* Make site indexable by search engines */
          .replaceAll(`"noIndex":true`, `"noIndex":false`)
      );
      this.buffer = "";
    } else {
      text.remove();
    }
  }
}

export class SitemapRewriter {
  buffer = "";

  text(text: Text) {
    this.buffer += text.text;

    if (text.lastInTextNode) {
      /* Replace Super domain with custom domain */
      text.replace(this.buffer.replaceAll("nourman-hajar.super.site", SITE_DOMAIN));
      this.buffer = "";
    } else {
      text.remove();
    }
  }
}
