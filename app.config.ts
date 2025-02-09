import { defineConfig } from '@tanstack/start/config';
// import rollupPluginCopy from 'rollup-plugin-copy';
import viteRestart from 'vite-plugin-restart';
import viteTsConfigPaths from 'vite-tsconfig-paths';

const PRESET = 'node-server' as string;

export default defineConfig({
  server: {
    preset: PRESET,
    routeRules: {
      '/sitemap.xml': { proxy: { to: '/api/sitemap' } },
    },
    rollupConfig: {
      plugins: [
        // Needed to copy TypeScript's shipped .d.ts file for Twoslash to work
        // rollupPluginCopy({
        //   targets: [
        //     {
        //       src: 'node_modules/typescript/lib',
        //       dest:
        //         PRESET === 'vercel'
        //           ? '.vercel/output/functions/__nitro.func/node_modules/typescript'
        //           : '.output/server/node_modules/typescript',
        //     },
        //   ],
        //   hook: 'writeBundle',
        // }),
      ],
    },
    prerender: {
      routes: ['/'],
      crawlLinks: true,
    },
  },
  react: {
    babel: {
      plugins: [['babel-plugin-react-compiler', {}]],
    },
  },
  vite: {
    define: {
      __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    },
    plugins: [
      viteTsConfigPaths({
        projects: ['./tsconfig.json'],
      }),
      viteRestart({
        reload: ['./dist/**/*'],
      }),
    ],
  },
});
