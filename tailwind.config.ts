import path from 'node:path';
import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';
import layerCssPlugin from './plugins/cssplugin';

const sansFonts =
  'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", emoji';

export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        headline: ['var(--font-headline)', sansFonts],
        sans: ['var(--font-main)', sansFonts],
        mono: [
          'var(--font-mono)',
          'ui-monospace, SFMono-Regular, Monaco, Consolas, Menlo, "Liberation Mono", "Courier New", monospace, emoji',
        ],
        serif: [...fontFamily.serif, 'emoji'],
      },
      colors: {
        background: 'var(--theme-background)',
        secondary: 'var(--theme-secondary)',
        tertiary: 'var(--theme-tertiary)',
        quaternary: 'var(--theme-quaternary)',
        highlight: 'var(--theme-highlight)',
        stroke: 'var(--theme-stroke)',
        blank: 'var(--theme-blank)',
      },
      screens: {
        xs: '425px',
      },
    },
    supports: {
      dvh: 'height: 100dvh',
    },
  },
  plugins: [layerCssPlugin(path.resolve(__dirname, './app/styles/app.css')), require('@tailwindcss/container-queries')],
} satisfies Config;
