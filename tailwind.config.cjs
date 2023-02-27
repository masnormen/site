/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        fancy: [
          "var(--font-varent)",
          "Apple Color Emoji, Segoe UI Emoji, NotoColorEmoji, Noto Color Emoji, Segoe UI Symbol, Android Emoji, EmojiSymbols",
          ...fontFamily.sans,
        ],
        sans: [
          "var(--font-jakarta)",
          "Apple Color Emoji, Segoe UI Emoji, NotoColorEmoji, Noto Color Emoji, Segoe UI Symbol, Android Emoji, EmojiSymbols",
          ...fontFamily.sans,
        ],
        mono: [
          ...fontFamily.mono,
          "Apple Color Emoji, Segoe UI Emoji, NotoColorEmoji, Noto Color Emoji, Segoe UI Symbol, Android Emoji, EmojiSymbols",
        ],
        serif: [
          "Apple Color Emoji, Segoe UI Emoji, NotoColorEmoji, Noto Color Emoji, Segoe UI Symbol, Android Emoji, EmojiSymbols",
          ...fontFamily.serif,
        ],
      },
      colors: {
        background: "#faeee7",
        highlight: "#ff8ba7",
        secondary: "#ffc6c7",
        tertiary: "#c3f0ca",
        quaternary: "#ffedd5",
        stroke: "#6a595e",
        notwhite: "#fcfcfc",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
