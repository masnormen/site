import "@/styles/themes.css";
import "@/styles/globals.css";
import "@/styles/notion.css";
import "prism-themes/themes/prism-gruvbox-dark.min.css";
import "@/styles/custom.css";

import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { AppProps } from "next/app";
import { Space_Mono } from "next/font/google";
import localFont from "next/font/local";
import Head from "next/head";
import { memo, useEffect, useMemo } from "react";

import { themeAtom } from "@/atoms/theme";
import SVGFilters from "@/components/SVGFilters";

const varentGrotesk = localFont({
  src: "../../public/fonts/VarentGrotesk-Bold.otf",
  variable: "--font-varent",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space",
  weight: ["400", "700"],
  display: "swap",
});

const plusJakarta = localFont({
  src: [
    { path: "../../public/fonts/PlusJakartaSans-Regular.ttf", style: "normal" },
    { path: "../../public/fonts/PlusJakartaSans-Italic.ttf", style: "italic" },
  ],
  variable: "--font-jakarta",
  weight: "200 900",
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
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
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
          className={`${plusJakarta.variable} ${varentGrotesk.variable} ${spaceMono.variable} bg-blank font-sans`}
        >
          <Component {...pageProps} />
        </motion.div>
        <SVGFilters />
      </>
    ),
    [Component, pageProps, router.pathname]
  );

  return comp;
};

export default App;
