import { createRouter } from '@tanstack/react-router';

import { NotFoundComponent } from '@/components/layouts/not-found';
import { routeTree } from '@/routeTree.gen';

export function getRouter() {
  return createRouter({
    routeTree,
    defaultPreload: 'intent',
    defaultStaleTime: Infinity,
    defaultHashScrollIntoView: true,
    scrollRestoration: true,
    scrollRestorationBehavior: 'instant',
    notFoundMode: 'root',
    defaultNotFoundComponent: NotFoundComponent,
    defaultViewTransition: true,
  });
}
