/// <reference types="vinxi/types/client" />

import { createRouter } from '@/router';
import * as Sentry from '@sentry/react';
import { StartClient } from '@tanstack/start';
import { hydrateRoot } from 'react-dom/client';

const router = createRouter();

hydrateRoot(document, <StartClient router={router} />);

if (import.meta.env.PROD && !!import.meta.env.VITE_SENTRY_DSN) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    release: '1.0',
    environment: import.meta.env.VITE_APP_ENV,
    integrations: [Sentry.tanstackRouterBrowserTracingIntegration(router)],
    tracesSampleRate: 1.0,
  });
}
