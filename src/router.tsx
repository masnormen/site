import { createRouter as createTanStackRouter } from '@tanstack/react-router';
import { NotFoundComponent } from '@/components/layouts/not-found';
import { routeTree } from '@/routeTree.gen';

export function createRouter() {
  return createTanStackRouter({
    routeTree,
    defaultPreload: 'intent',
    defaultStaleTime: Infinity,
    defaultHashScrollIntoView: true,
    defaultSsr: true,
    scrollRestoration: true,
    scrollRestorationBehavior: 'instant',
    notFoundMode: 'root',
    defaultNotFoundComponent: NotFoundComponent,
  });
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
