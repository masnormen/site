import "@/styles/themes.css";
import "@/styles/globals.css";
import "@/styles/notion.css";
import "prism-themes/themes/prism-gruvbox-dark.min.css";
import "@/styles/custom.css";

import { useAtom } from "jotai";
import { AppProps } from "next/app";
import { Cousine } from "next/font/google";
import localFont from "next/font/local";
import Head from "next/head";
import { useEffect } from "react";

import { themeAtom } from "@/atoms/theme";
import SVGFilters from "@/components/SVGFilters";

const headlineFont = localFont({
  src: "../../public/fonts/PPEditorialOld-Regular.otf",
  variable: "--font-headline",
  display: "swap",
});

const mainFont = localFont({
  src: [
    { path: "../../public/fonts/Satoshi-Variable.ttf", style: "normal" },
    { path: "../../public/fonts/Satoshi-VariableItalic.ttf", style: "italic" },
  ],
  variable: "--font-main",
  weight: "200 900",
  display: "swap",
});

const monoFont = Cousine({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "700"],
  display: "swap",
});

const switchTheme = (theme: string) => {
  if (!document.documentElement.classList.contains("theme-transitioning")) {
    document.documentElement.classList.add("theme-transitioning");
    setTimeout(() => {
      document.documentElement.classList.remove("theme-transitioning");
    }, 1000);
  }
  document.documentElement.dataset.theme = theme;
};

const App = ({ Component, pageProps }: AppProps) => {
  const [theme] = useAtom(themeAtom);

  useEffect(() => {
    if (typeof document === "undefined") return;
    switchTheme(theme);
  }, [theme]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="icon" href="https://fav.farm/⚡️" />
      </Head>
      <div
        className={`${mainFont.variable} ${headlineFont.variable} ${monoFont.variable} relative bg-blank font-sans subpixel-antialiased`}
      >
        <Component {...pageProps} />
      </div>
      <SVGFilters />
    </>
  );
};

export default App;
