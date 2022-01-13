import { SUPER_SITE, CUSTOM_SITE } from ".";

export class MetaRewriter {
  element(element: Element) {
    /* Replace Super domain with custom domain */
    if (element.getAttribute("property") === "og:url") {
      const content = element.getAttribute("content") || "";
      element.setAttribute("content", content.replaceAll(SUPER_SITE, CUSTOM_SITE));
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
      { html: true }
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
          .replaceAll(SUPER_SITE, CUSTOM_SITE)
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
      text.replace(this.buffer.replaceAll(SUPER_SITE, CUSTOM_SITE));
      this.buffer = "";
    } else {
      text.remove();
    }
  }
}
