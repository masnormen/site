import * as Sentry from '@sentry/react';
import { StartClient } from '@tanstack/react-start/client';
import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';

import { getRouter } from '@/router';

const router = getRouter();

hydrateRoot(
  document,
  <StrictMode>
    <StartClient />
  </StrictMode>,
);

if (import.meta.env.PROD && !!import.meta.env.VITE_SENTRY_DSN) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    release: '1.0',
    environment: import.meta.env.VITE_APP_ENV,
    integrations: [Sentry.tanstackRouterBrowserTracingIntegration(router)],
    tracesSampleRate: 1.0,
  });
}
