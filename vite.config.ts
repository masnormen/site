import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact, { reactCompilerPreset } from '@vitejs/plugin-react';
import { nitro } from 'nitro/vite';
import { defineConfig } from 'vite';

import { mdx } from './plugins/vite-plugin-mdx.ts';

export default defineConfig({
  define: {
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    // biome-ignore lint/style/noProcessEnv: Need to access env var
    __BUILD_SHA__: JSON.stringify(process.env.VITE_BUILD_SHA || 'dev'),
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [mdx(), nitro(), tanstackStart(), viteReact(), babel({ presets: [reactCompilerPreset()] }), tailwindcss()],
});
