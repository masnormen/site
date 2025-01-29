import path from 'path';
import { defineConfig } from '@tanstack/start/config';
import fg from 'fast-glob';
import rollupPluginCopy from 'rollup-plugin-copy';
import viteRestart from 'vite-plugin-restart';
import viteTsConfigPaths from 'vite-tsconfig-paths';

const CONTENTS_PATH = `${process.cwd()}/app/contents` as const;

const getPostSlugList = async () => {
  return fg
    .globSync(path.resolve(CONTENTS_PATH, '**', 'index.mdx'))
    .map((indexMdxPath) => {
      const postFolder = path.parse(indexMdxPath).dir;
      const slug = postFolder.split('/').pop()!;
      return slug;
    });
};

export default defineConfig({
  server: {
    rollupConfig: {
      plugins: [
        // Needed to copy TypeScript's shipped .d.ts file for Twoslash to work
        rollupPluginCopy({
          targets: [
            {
              src: 'node_modules/typescript/lib',
              dest: '.output/server/node_modules/typescript',
            },
          ],
          hook: 'writeBundle',
        }),
      ],
    },
    preset: 'node-server',
    hooks: {
      'prerender:routes': async (routes) => {
        const postsSlugs = await getPostSlugList();
        for (const slug of postsSlugs) {
          routes.add(`/blog/${slug}`);
        }
      },
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
