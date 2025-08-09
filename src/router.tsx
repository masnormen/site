import { createRouter as createTanStackRouter } from '@tanstack/react-router';
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
  });
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
