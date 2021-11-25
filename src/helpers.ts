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

export function generateSitemap() {
  let sitemap = "<urlset xmlns='http://www.sitemaps.org/schemas/sitemap/0.9'>";
  for (const each of slugs) {
    sitemap += `<url><loc>https://${MY_DOMAIN}/${each}</loc></url>`;
  }
  sitemap += "</urlset>";
  return sitemap;
}

export class MetaRewriter {
  element(element: Element) {
    if (PAGE_TITLE !== "") {
      if (element.getAttribute("property") === "og:title" || element.getAttribute("name") === "twitter:title") {
        element.setAttribute("content", PAGE_TITLE);
      }
      if (element.tagName === "title") {
        element.setInnerContent(PAGE_TITLE);
      }
    }
    if (PAGE_DESCRIPTION !== "") {
      if (
        element.getAttribute("name") === "description" ||
        element.getAttribute("property") === "og:description" ||
        element.getAttribute("name") === "twitter:description"
      ) {
        element.setAttribute("content", PAGE_DESCRIPTION);
      }
    }
    if (element.getAttribute("property") === "og:url" || element.getAttribute("name") === "twitter:url") {
      element.setAttribute("content", MY_DOMAIN);
    }
    if (element.getAttribute("name") === "apple-itunes-app") {
      element.remove();
    }
  }
}

export class HeadRewriter {
  element(element: Element) {
    /* Google Font Options */
    if (GOOGLE_FONT !== "") {
      element.append(
        `<link href="https://fonts.googleapis.com/css?family=${GOOGLE_FONT.replace(
          " ",
          "+"
        )}:Regular,Bold,Italic&display=swap" rel="stylesheet">
          <style>* { font-family: "${GOOGLE_FONT}" !important; }</style>`,
        {
          html: true,
        }
      );
    }
    element.append(
      `<style>
        div.notion-topbar > div > div:nth-child(3) { display: none !important; }
        div.notion-topbar > div > div:nth-child(4) { display: none !important; }
        div.notion-topbar > div > div:nth-child(5) { display: none !important; }
        div.notion-topbar > div > div:nth-child(6) { display: none !important; }
        div.notion-topbar-mobile > div:nth-child(3) { display: none !important; }
        div.notion-topbar-mobile > div:nth-child(4) { display: none !important; }
        div.notion-topbar > div > div:nth-child(1n).toggle-mode { display: block !important; }
        div.notion-topbar-mobile > div:nth-child(1n).toggle-mode { display: block !important; }
        </style>`,
      {
        html: true,
      }
    );
  }
}

export class BodyRewriter {
  SLUG_TO_PAGE: Record<string, string>;

  constructor(SLUG_TO_PAGE: Record<string, string>) {
    this.SLUG_TO_PAGE = SLUG_TO_PAGE;
  }

  element(element: Element) {
    element.append(
      `<script>
        window.CONFIG.domainBaseUrl = 'https://${MY_DOMAIN}';
  
        const SLUG_TO_PAGE = ${JSON.stringify(this.SLUG_TO_PAGE)};
        const PAGE_TO_SLUG = {};
        const slugs = [];
        const pages = [];
        const el = document.createElement('div');
        let redirected = false;
  
        Object.keys(SLUG_TO_PAGE).forEach(slug => {
          const page = SLUG_TO_PAGE[slug];
          slugs.push(slug);
          pages.push(page);
          PAGE_TO_SLUG[page] = slug;
        });
        
        function makeOpenFullPage() {
          const cl = document.querySelectorAll('.notion-collection-item');
          if (cl.length > 0) {
            for (const element of cl) {
                element.addEventListener('click', (e) => { e.stopPropagation(); });
            }
          }
          const cla = document.querySelectorAll('.notion-collection-item a');
          if (cla.length > 0) {
            for (const element of cla) {
                element.addEventListener('click', (e) => { e.stopPropagation(); });
            }
          }
        }
        function getPage() {
          return location.pathname.slice(-32);
        }
        function getSlug() {
          return location.pathname.slice(1);
        }
        function updateSlug() {
          const slug = PAGE_TO_SLUG[getPage()];
          if (slug != null) {
            history.replaceState(history.state, '', '/' + slug);
          }
        }
        function onDark() {
          el.innerHTML = '<div title="Change to Light Mode" style="margin-left: auto; margin-right: 14px; min-width: 0px;"><div role="button" tabindex="0" style="user-select: none; transition: background 120ms ease-in 0s; cursor: pointer; border-radius: 44px;"><div style="display: flex; flex-shrink: 0; height: 14px; width: 26px; border-radius: 44px; padding: 2px; box-sizing: content-box; background: rgb(46, 170, 220); transition: background 200ms ease 0s, box-shadow 200ms ease 0s;"><div style="width: 14px; height: 14px; border-radius: 44px; background: white; transition: transform 200ms ease-out 0s, background 200ms ease-out 0s; transform: translateX(12px) translateY(0px);"></div></div></div></div>';
          document.body.classList.add('dark');
          __console.environment.ThemeStore.setState({ mode: 'dark' });
        };
        function onLight() {
          el.innerHTML = '<div title="Change to Dark Mode" style="margin-left: auto; margin-right: 14px; min-width: 0px;"><div role="button" tabindex="0" style="user-select: none; transition: background 120ms ease-in 0s; cursor: pointer; border-radius: 44px;"><div style="display: flex; flex-shrink: 0; height: 14px; width: 26px; border-radius: 44px; padding: 2px; box-sizing: content-box; background: rgba(135, 131, 120, 0.3); transition: background 200ms ease 0s, box-shadow 200ms ease 0s;"><div style="width: 14px; height: 14px; border-radius: 44px; background: white; transition: transform 200ms ease-out 0s, background 200ms ease-out 0s; transform: translateX(0px) translateY(0px);"></div></div></div></div>';
          document.body.classList.remove('dark');
          __console.environment.ThemeStore.setState({ mode: 'light' });
        }
        function toggle() {
          if (document.body.classList.contains('dark')) {
            onLight();
          } else {
            onDark();
          }
        }
        function addDarkModeButton(device) {
          const nav = device === 'web' ? document.querySelector('.notion-topbar').firstChild : document.querySelector('.notion-topbar-mobile');
          el.className = 'toggle-mode';
          el.addEventListener('click', toggle);
          nav.appendChild(el);
          onLight();
        }
  
        const observer = new MutationObserver(function() {
          makeOpenFullPage();
          if (redirected) return;
          const nav = document.querySelector('.notion-topbar');
          const mobileNav = document.querySelector('.notion-topbar-mobile');
          if (nav && nav.firstChild && nav.firstChild.firstChild
            || mobileNav && mobileNav.firstChild) {
            redirected = true;
            updateSlug();
            addDarkModeButton(nav ? 'web' : 'mobile');
            const onpopstate = window.onpopstate;
            window.onpopstate = function() {
              if (slugs.includes(getSlug())) {
                const page = SLUG_TO_PAGE[getSlug()];
                if (page) {
                  history.replaceState(history.state, 'bypass', '/' + page);
                }
              }
              onpopstate.apply(this, [].slice.call(arguments));
              updateSlug();
            };
          }
        });
        observer.observe(document.querySelector('#notion-app'), {
          childList: true,
          subtree: true,
        });
  
        const replaceState = window.history.replaceState;
        window.history.replaceState = function(state) {
          if (arguments[1] !== 'bypass' && slugs.includes(getSlug())) return;
          return replaceState.apply(window.history, arguments);
        };
  
        const pushState = window.history.pushState;
        window.history.pushState = function(state) {
          const dest = new URL(location.protocol + location.host + arguments[2]);
          const id = dest.pathname.slice(-32);
          if (pages.includes(id)) {
            arguments[2] = '/' + PAGE_TO_SLUG[id];
          }
          return pushState.apply(window.history, arguments);
        };
  
        const open = window.XMLHttpRequest.prototype.open;
        window.XMLHttpRequest.prototype.open = function() {
          arguments[1] = arguments[1].replace('${MY_DOMAIN}', 'www.notion.so');
          return open.apply(this, [].slice.call(arguments));
        };
      </script>${CUSTOM_SCRIPT}`,
      {
        html: true,
      }
    );
  }
}
