import "@/styles/themes.css";
import "@/styles/globals.css";
import "@/styles/notion.css";
import "prism-themes/themes/prism-gruvbox-dark.min.css";
import "@/styles/custom.css";

import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { AppProps } from "next/app";
import { JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import Head from "next/head";
import { useEffect, useMemo } from "react";

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

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "700"],
  display: "swap",
});

const App = ({ Component, pageProps, router }: AppProps) => {
  const [theme] = useAtom(themeAtom);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const comp = useMemo(
    () => (
      <>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
          <link rel="icon" href="https://fav.farm/⚡️" />
        </Head>
        <motion.div
          key={router.pathname}
          initial="initial"
          animate="animate"
          variants={{
            initial: {
              opacity: 0,
            },
            animate: {
              opacity: 1,
            },
          }}
          className={`${mainFont.variable} ${headlineFont.variable} ${monoFont.variable} bg-blank font-sans subpixel-antialiased`}
        >
          <Component {...pageProps} />
        </motion.div>
        <SVGFilters />
      </>
    ),
    [Component, pageProps, router.pathname],
  );

  return comp;
};

export default App;
