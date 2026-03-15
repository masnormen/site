import tailwindcss from '@tailwindcss/vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import { defineConfig } from 'vite';
import viteRestart from 'vite-plugin-restart';
import viteReact, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { nitro } from 'nitro/vite'

export default defineConfig({
  define: {
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    // biome-ignore lint/style/noProcessEnv: Need to access env var
    __BUILD_SHA__: JSON.stringify(process.env.VITE_BUILD_SHA || 'dev'),
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    viteRestart({
      restart: ['./dist/**/*'],
    }),
    nitro(),
    tanstackStart(),
    viteReact(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
  ],
});
