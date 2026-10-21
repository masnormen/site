import * as Alchemy from 'alchemy';
import * as Cloudflare from 'alchemy/Cloudflare';
import * as Command from 'alchemy/Command';
import * as Config from 'effect/Config';
import * as Effect from 'effect/Effect';
import * as Option from 'effect/Option';

import wrangler from '../wrangler.json' with { type: 'json' };

const BUILD_ENV_KEYS = ['VITE_APP_ENV', 'VITE_GA_ID', 'VITE_GTM_ID', 'VITE_SENTRY_DSN', 'VITE_BUILD_SHA'];

export default Alchemy.Stack(
  'site',
  { providers: Cloudflare.providers(), state: Cloudflare.state() },
  Effect.gen(function* () {
    const { stage } = yield* Alchemy.Stack;

    if (stage !== 'prod') {
      return yield* Effect.die(`Unknown stage "${stage}". Pass --stage prod.`);
    }

    const env: Record<string, string> = {};
    for (const key of BUILD_ENV_KEYS) {
      const value = yield* Config.String(key).pipe(Config.option);
      if (Option.isSome(value)) env[key] = value.value;
    }

    const build = yield* Command.Build('build', { command: 'pnpm build', cwd: '..', outdir: 'dist', env });

    const site = yield* Cloudflare.Worker('site', {
      main: '../dist/server/index.js',
      bundle: false,
      compatibility: { date: wrangler.compatibility_date, flags: wrangler.compatibility_flags },
      assets: { directory: '../dist/client', hash: build.hash.output },
      domain: 'nourman.com',
      workersDev: false,
    });

    return { url: site.url };
  }),
);
