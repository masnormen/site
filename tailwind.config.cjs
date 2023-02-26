/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "var(--font-jakarta)",
          "Apple Color Emoji, Segoe UI Emoji, NotoColorEmoji, Noto Color Emoji, Segoe UI Symbol, Android Emoji, EmojiSymbols",
          ...fontFamily.sans,
        ],
        mono: [
          "var(--font-metana)",
          "Apple Color Emoji, Segoe UI Emoji, NotoColorEmoji, Noto Color Emoji, Segoe UI Symbol, Android Emoji, EmojiSymbols",
          ...fontFamily.mono,
        ],
        fancy: [
          "var(--font-varent)",
          "Apple Color Emoji, Segoe UI Emoji, NotoColorEmoji, Noto Color Emoji, Segoe UI Symbol, Android Emoji, EmojiSymbols",
          ...fontFamily.sans,
        ],
      },
      colors: {
        background: "#faeee7",
        highlight: "#ff8ba7",
        secondary: "#ffc6c7",
        tertiary: "#c3f0ca",
        quaternary: "#ffedd5",
        stroke: "#594a4e",
        notwhite: "#fefefe",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
