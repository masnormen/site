import mdx from '@mdx-js/rollup';
import { defineConfig } from '@tanstack/start/config';
import viteTsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  react: {
    babel: {
      // React Compiler
      plugins: [['babel-plugin-react-compiler', {}]],
    },
  },
  vite: {
    plugins: [
      viteTsConfigPaths({
        projects: ['./tsconfig.json'],
      }),
      {
        enforce: 'pre',
        ...mdx({}),
      },
    ],
  },
});
