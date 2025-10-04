import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  CatchBoundary,
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Toaster } from 'sonner';
import { SVGFilters } from '@/components/assets/svg-filters';
import { CustomErrorComponent } from '@/components/layouts/error';
import { Navbar } from '@/components/layouts/navbar';
import { NotFoundComponent } from '@/components/layouts/not-found';
import appCss from '../styles/app.css?inline';
import type { ReactNode } from 'react';

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
      // {
      //   property: 'og:image',
      //   content: 'https://nourman.com/opengraph',
      // },
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
      {
        rel: 'canonical',
        href: 'https://nourman.com/',
      },
    ],
    links: [
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'preconnect',
        href: 'https://api.iconify.design',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'preload',
        href: 'https://fonts.gstatic.com/s/instrumentsans/v3/pxiTypc9vsFDm051Uf6KVwgkfoSxQ0GsQv8ToedPibnr0SZe1ZuWi3g.woff2',
        as: 'font',
        type: 'font/woff2',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'preload',
        href: 'https://fonts.gstatic.com/s/instrumentsans/v3/pxitypc9vsFDm051Uf6KVwgkfoSbSnNPooZAN0lInHGpCWNu15GRqXp6pQ.woff2',
        as: 'font',
        type: 'font/woff2',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'preload',
        href: 'https://fonts.gstatic.com/s/geistmono/v1/or3nQ6H-1_WfwkMZI_qYFrcdmhHkjko.woff2',
        as: 'font',
        type: 'font/woff2',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'preload',
        href: 'https://fonts.gstatic.com/s/fraunces/v38/6NU78FyLNQOQZAnv9bYEvDiIdE9Ea92uemAk_WBq8U_9v0c2Wa0KxC9TeP2Xz5c.woff2',
        as: 'font',
        type: 'font/woff2',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'preload',
        href: 'https://fonts.gstatic.com/s/fraunces/v38/6NU58FyLNQOQZAnv9ZwNjucMHVn85Ni7emAe9lKqZTnbB-gzTK0K1ChjeveQ7ZXk8g.woff2',
        as: 'font',
        type: 'font/woff2',
        crossOrigin: 'anonymous',
      },
      { rel: 'icon', href: '/favicon.png' },
      ...(import.meta.env.VITE_GA_ID || import.meta.env.VITE_GTM_ID
        ? [{ rel: 'preconnect', href: 'https://www.googletagmanager.com' }]
        : []),
    ],
    scripts: [
      ...(import.meta.env.VITE_GA_ID
        ? [
            {
              async: true,
              src: `https://www.googletagmanager.com/gtag/js?id=${import.meta.env.VITE_GA_ID}`,
            },
            {
              children: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${import.meta.env.VITE_GA_ID}');`,
            },
          ]
        : []),

      ...(import.meta.env.VITE_GTM_ID
        ? [
            {
              children: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${import.meta.env.VITE_GTM_ID}');`,
            },
          ]
        : []),
    ],
    styles: [{ children: appCss }],
  }),
  component: RootComponent,
  errorComponent: CustomErrorComponent,
  notFoundComponent: NotFoundComponent,
});

const queryClient = new QueryClient();

function RootComponent() {
  return (
    <RootDocument>
      <CatchBoundary getResetKey={() => 'reset'}>
        <QueryClientProvider client={queryClient}>
          <Navbar />

          <Outlet />

          {/* Top/Bottom fade */}
          <div className="pointer-events-none z-50 fixed top-0 w-screen h-20 bg-gradient-to-t from-xblank/0 to-xblank" />
          <div className="pointer-events-none z-50 fixed bottom-0 w-screen h-20 bg-gradient-to-b from-xblank/0 to-xblank" />

          {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
          {import.meta.env.DEV && (
            <TanStackRouterDevtools initialIsOpen={false} />
          )}
          <Toaster position="top-center" />
          <SVGFilters />
        </QueryClientProvider>
      </CatchBoundary>
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <div id="_top_" className="w-0 h-0 invisible" />
        {children}
        <Scripts />
      </body>
    </html>
  );
}
