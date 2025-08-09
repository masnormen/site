import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const sansFonts =
  'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", emoji';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        headline: ['var(--font-headline)', sansFonts],
        sans: ['var(--font-main)', sansFonts],
        mono: [
          'var(--font-mono)',
          'ui-monospace, SFMono-Regular, Monaco, Consolas, Menlo, "Liberation Mono", "Courier New", monospace, emoji',
        ],
        serif: [...defaultTheme.fontFamily.serif, 'emoji'],
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
} satisfies Config;
