import Footer from '@/components/layouts/footer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Outlet, ScrollRestoration, createRootRoute } from '@tanstack/react-router';
import { Meta, Scripts } from '@tanstack/start';
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
        content: 'A blog on software engineering, web development, and miscellaneous tech stuff, by Nourman Hajar.',
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
        content: 'A blog on software engineering, web development, and miscellaneous tech stuff, by Nourman Hajar.',
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
    links: [{ rel: 'icon', href: '/favicon.png' }],
  }),
  component: RootComponent,
});

// Create a client
const queryClient = new QueryClient();

function RootComponent() {
  return (
    <RootDocument>
      <QueryClientProvider client={queryClient}>
        <Outlet />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      <Footer />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head>
        {process.env.NODE_ENV === 'development' && <script src="https://unpkg.com/react-scan/dist/auto.global.js" />}
        <Meta />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
