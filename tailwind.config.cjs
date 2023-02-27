/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        fancy: ["var(--font-varent)", ...fontFamily.sans, "emoji"],
        sans: [...fontFamily.sans, "emoji"],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace",
          "emoji",
        ],
        serif: [...fontFamily.serif, "emoji"],
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
