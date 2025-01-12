/// <reference types="vinxi/types/client" />

import { createRouter } from '@/router';
import * as Sentry from '@sentry/react';
import { StartClient } from '@tanstack/start';
import { hydrateRoot } from 'react-dom/client';

const router = createRouter();

hydrateRoot(document, <StartClient router={router} />);

if (!import.meta.env.DEV) {
  Sentry.init({
    dsn: 'https://46616ef0d3464e4a9ff85122afeb3bf4@app.glitchtip.com/9789',
    release: '1.0',
    environment: 'development',
    integrations: [Sentry.tanstackRouterBrowserTracingIntegration(router)],
    tracesSampleRate: 1.0,
  });
}
