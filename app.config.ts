import { defineConfig } from '@tanstack/start/config';
import rollupPluginCopy from 'rollup-plugin-copy';
import viteRestart from 'vite-plugin-restart';
import viteTsConfigPaths from 'vite-tsconfig-paths';
// import path from 'path';
// import fg from 'fast-glob';

// const BLOG_CONTENTS_PATH = `${process.cwd()}/app/contents/blog` as const;
// const PROJECT_CONTENTS_PATH = `${process.cwd()}/app/contents/blog` as const;

// const getPostSlugList = async () => {
//   return fg
//     .globSync(path.resolve(BLOG_CONTENTS_PATH, '**', 'index.mdx'))
//     .map((indexMdxPath) => {
//       const postFolder = path.parse(indexMdxPath).dir;
//       const slug = postFolder.split('/').pop()!;
//       return slug;
//     });
// };

// const getProjectSlugList = async () => {
//   return fg
//     .globSync(path.resolve(PROJECT_CONTENTS_PATH, '**', 'index.mdx'))
//     .map((indexMdxPath) => {
//       const postFolder = path.parse(indexMdxPath).dir;
//       const slug = postFolder.split('/').pop()!;
//       return slug;
//     });
// };

const PRESET = 'vercel' as const;

export default defineConfig({
  server: {
    preset: PRESET,
    rollupConfig: {
      plugins: [
        // Needed to copy TypeScript's shipped .d.ts file for Twoslash to work
        rollupPluginCopy({
          targets: [
            {
              src: 'node_modules/typescript/lib',
              dest:
                PRESET === 'vercel'
                  ? '.vercel/output/functions/__nitro.func/node_modules/typescript'
                  : '.output/server/node_modules/typescript',
            },
            ...(PRESET === 'vercel'
              ? [
                  {
                    src: 'app/contents',
                    dest: '.vercel/output/functions/__nitro.func/app',
                  },
                ]
              : []),
          ],
          hook: 'writeBundle',
        }),
      ],
    },
    // hooks: {
    //   'prerender:routes': async (routes) => {
    //     const postsSlugs = await Promise.all([
    //       getPostSlugList(),
    //       getProjectSlugList(),
    //     ]);
    //     for (const slug of postsSlugs.flat()) {
    //       routes.add(`/blog/${slug}`);
    //     }
    //   },
    // },
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
    plugins: [
      viteTsConfigPaths({
        projects: ['./tsconfig.json'],
      }),
      viteRestart({
        reload: ['./app/**/*'],
      }),
    ],
  },
});
