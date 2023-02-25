/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-jakarta)", ...fontFamily.sans],
        "metana-mono": ["var(--font-metana-mono)", ...fontFamily.mono],
        metana: ["var(--font-metana)", ...fontFamily.sans],
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
