import type { Plugin } from 'vite';

import { runnerImport } from 'vite';

type OgModule = typeof import('../src/og/og-image.tsx');

async function renderOgImages(root: string) {
  const { module } = await runnerImport<OgModule>('/src/og/og-image.tsx', {
    root,
    configFile: false,
    resolve: { tsconfigPaths: true },
    oxc: { jsx: { runtime: 'automatic' } },
  });
  return module.renderOgImages();
}

export function og(): Plugin[] {
  return [
    {
      name: 'og-images:dev',
      apply: 'serve',
      // Must run before the Cloudflare plugin forwards every request to the worker.
      enforce: 'pre',
      configureServer(server) {
        server.middlewares.use('/og/', async (req, res, next) => {
          try {
            const fileName = `og${new URL(req.url ?? '/', 'http://localhost').pathname}`;
            // ponytail: renders every image per request; render one at a time if the post count grows large.
            const image = (await renderOgImages(server.config.root)).find((entry) => entry.fileName === fileName);
            if (!image) return next();
            res.setHeader('Content-Type', 'image/png');
            res.setHeader('Cache-Control', 'no-store');
            res.end(image.source);
          } catch (error) {
            next(error);
          }
        });
      },
    },
    {
      name: 'og-images:build',
      apply: 'build',
      applyToEnvironment: (environment) => environment.name === 'client',
      async generateBundle() {
        for (const { fileName, source } of await renderOgImages(this.environment.config.root)) {
          this.emitFile({ type: 'asset', fileName, source });
        }
      },
    },
  ];
}
