import { SUPER_SITE, CUSTOM_SITE, CUSTOM_CSS } from ".";

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
    /* Add custom CSS and Umami script */
    element.append(
      `
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Epilogue:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="${CUSTOM_CSS}"/>
        <script async defer data-website-id="c7b9d008-c286-4153-98f6-b600f7a09cd7" src="https://nourman-analytics.vercel.app/umami.js"></script>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-HKWGXBTVNW"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-HKWGXBTVNW');
        </script>
      `,
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
