import tailwindcss from '@tailwindcss/vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import viteRestart from 'vite-plugin-restart';
import viteTsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  define: {
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    // biome-ignore lint/style/noProcessEnv: Need to access env var
    __BUILD_SHA__: JSON.stringify(process.env.VITE_BUILD_SHA || 'dev'),
  },
  plugins: [
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    viteRestart({
      restart: ['./dist/**/*'],
    }),
    tanstackStart({
      customViteReactPlugin: true,
    }),
    viteReact({
      babel: {
        plugins: [['babel-plugin-react-compiler', {}]],
      },
    }),
    tailwindcss(),
  ],
});
