/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require("tailwindcss/defaultTheme");

const sansFonts =
  'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        headline: ["var(--font-headline)", sansFonts, "emoji"],
        sans: ["var(--font-main)", sansFonts, "emoji"],
        mono: [
          "var(--font-mono)",
          'ui-monospace, SFMono-Regular, Monaco, Consolas, Menlo, "Liberation Mono", "Courier New", monospace, emoji',
        ],
        serif: [...fontFamily.serif, "emoji"],
      },
      colors: {
        background: "var(--theme-background)",
        secondary: "var(--theme-secondary)",
        tertiary: "var(--theme-tertiary)",
        quaternary: "var(--theme-quaternary)",
        highlight: "var(--theme-highlight)",
        stroke: "var(--theme-stroke)",
        blank: "var(--theme-blank)",
      },
    },
  },
};
