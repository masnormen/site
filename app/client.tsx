/// <reference types="vinxi/types/client" />

import { createRouter } from '@/router';
import { env } from '@/utils/env';
import * as Sentry from '@sentry/react';
import { StartClient } from '@tanstack/start';
import { hydrateRoot } from 'react-dom/client';

const router = createRouter();

hydrateRoot(document, <StartClient router={router} />);

if (import.meta.env.PROD && !!env.SENTRY_DSN) {
  Sentry.init({
    dsn: env.SENTRY_DSN,
    release: '1.0',
    environment: env.APP_ENV,
    integrations: [Sentry.tanstackRouterBrowserTracingIntegration(router)],
    tracesSampleRate: 1.0,
  });
}
