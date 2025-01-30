import { routeTree } from '@/routeTree.gen';
import { createRouter as createTanStackRouter } from '@tanstack/react-router';

export function createRouter() {
  return createTanStackRouter({
    routeTree,
    defaultPreload: 'intent',
    defaultStaleTime: Infinity,
    defaultHashScrollIntoView: true,
    defaultSsr: true,
  });
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
