import { defineConfig } from '@tanstack/start/config';
import viteRestart from 'vite-plugin-restart';
import viteTsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  react: {
    babel: {
      plugins: [['babel-plugin-react-compiler', {}]],
    },
  },
  vite: {
    plugins: [
      viteRestart({
        reload: ['./app/contents/**/*'],
      }),
      viteTsConfigPaths({
        projects: ['./tsconfig.json'],
      }),
    ],
  },
});
