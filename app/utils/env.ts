import { z } from 'zod';

const any = z.object({
  APP_ENV: z.enum(['development', 'production']),
  SENTRY_DSN: z.string().url().optional().catch(undefined),
  VITE_GA_ID: z.string().optional(),
  VITE_GTM_ID: z.string().optional(),
});
const anyVarNames = Object.keys(any.shape) as Array<keyof typeof any.shape>;

const serverOnly = z.object({});
// const serverOnlyVarNames = Object.keys(serverOnly.shape) as Array<
//   keyof typeof serverOnly.shape
// >;

const merged = serverOnly.merge(any);

// biome-ignore lint/nursery/noProcessEnv: needed
let env = process.env as z.infer<typeof merged>;

// biome-ignore lint/nursery/noProcessEnv: needed
if (!!process.env.SKIP_ENV_VALIDATION == false) {
  const isServer = typeof window === 'undefined';

  const parsed = isServer ? merged.safeParse(env) : any.safeParse(env);
  if (parsed.success === false) {
    console.error(
      '❌ Invalid environment variables:',
      parsed.error.flatten().fieldErrors,
    );
    throw new Error('Invalid environment variables');
  }

  env = new Proxy(parsed.data, {
    get(target: z.infer<typeof merged>, prop: keyof typeof merged.shape) {
      if (typeof prop !== 'string') return undefined;
      if (!isServer && !(anyVarNames as string[]).includes(prop))
        throw new Error(
          // biome-ignore lint/nursery/noProcessEnv: needed
          process.env.NODE_ENV === 'production'
            ? '❌ Attempted to access a server-side environment variable on the client'
            : `❌ Attempted to access server-side environment variable '${prop}' on the client`,
        );
      return target[prop];
    },
  }) as z.infer<typeof merged>;
}

export { env };
