import { themeAtom } from '@/atoms/index';
import { SVGFilters } from '@/components/filters/svg-filters';
import appCss from '@/styles/app.css?url';
import { env } from '@/utils/env';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  Outlet,
  ScrollRestoration,
  createRootRoute,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Meta, Scripts } from '@tanstack/start';
import { useAtomValue } from 'jotai';
import { type ReactNode, useEffect } from 'react';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        name: 'robots',
        content: 'index,follow',
      },
      {
        rel: 'canonical',
        href: 'https://nourman.com/',
      },
      {
        title: 'Nourman Hajar • Software Engineer',
      },
      {
        name: 'description',
        content:
          'A blog on software engineering, web development, and miscellaneous tech stuff, by Nourman Hajar.',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        property: 'og:title',
        content: 'Nourman Hajar • Software Engineer',
      },
      {
        property: 'og:description',
        content:
          'A blog on software engineering, web development, and miscellaneous tech stuff, by Nourman Hajar.',
      },
      {
        property: 'og:url',
        content: 'https://nourman.com/',
      },
      {
        property: 'og:image',
        content: 'https://nourman.com/api/site.png',
      },
      {
        property: 'og:image:type',
        content: 'image/png',
      },
      {
        property: 'og:image:width',
        content: '1200',
      },
      {
        property: 'og:image:height',
        content: '630',
      },
      {
        property: 'og:site_name',
        content: 'Nourman Hajar • Software Engineer',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss.split('?')[0],
        suppressHydrationWarning: true,
      },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: '' },
      { rel: 'icon', href: '/favicon.png' },
    ],
    scripts: import.meta.env.DEV
      ? [
          {
            type: 'module',
            children: `import RefreshRuntime from "/_build/@react-refresh"; RefreshRuntime.injectIntoGlobalHook(window); window.$RefreshReg$ = () => {}; window.$RefreshSig$ = () => (type) => type`,
          },
        ]
      : [],
  }),
  component: RootComponent,
});

const queryClient = new QueryClient();

function RootComponent() {
  const theme = useAtomValue(themeAtom);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (!document.documentElement.classList.contains('theme-transitioning')) {
      document.documentElement.classList.add('theme-transitioning');
      setTimeout(() => {
        document.documentElement.removeAttribute('class');
      }, 1000);
    }
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <RootDocument>
      <QueryClientProvider client={queryClient}>
        <Outlet />
        <SVGFilters />
        {env.NODE_ENV === 'development' && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
        {env.NODE_ENV === 'development' && (
          <TanStackRouterDevtools initialIsOpen={false} />
        )}
      </QueryClientProvider>
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head>
        <Meta />
      </head>
      <body>
        <div id="_top_" className="w-0 h-0 invisible" />
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
