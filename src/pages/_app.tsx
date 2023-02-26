import { type AppType } from "next/dist/shared/lib/utils";

import localFont from "next/font/local";

import "../styles/globals.css";

// core styles shared by all of react-notion-x (required)
// import "react-notion-x/src/styles.css";

// used for code syntax highlighting (optional)
// import "prismjs/themes/prism-tomorrow.css";

// used for rendering equations (optional)
import "katex/dist/katex.min.css";

import "../styles/notion.css";
import "../styles/custom.css";
import Head from "next/head";
import SVGFilters from "../components/SVGFilters";

const varentGrotesk = localFont({
  src: "../styles/fonts/VarentGrotesk-Bold.otf",
  variable: "--font-varent",
  display: "swap",
});

const neueMetanaMono = localFont({
  src: [
    { path: "../styles/fonts/NeueMetanaMono-SemiBold.otf", weight: "700" },
    { path: "../styles/fonts/NeueMetanaMono-Light.otf", weight: "400" },
  ],
  variable: "--font-metana",
  display: "swap",
});

const plusJakarta = localFont({
  src: "../styles/fonts/PlusJakartaSans-VariableFont_wght.ttf",
  variable: "--font-jakarta",
  weight: "200 900",
  display: "swap",
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      </Head>
      <main
        className={`${plusJakarta.variable} ${varentGrotesk.variable} ${neueMetanaMono.variable} h-full w-full font-sans`}
      >
        <Component {...pageProps} />
      </main>
      <SVGFilters />
    </>
  );
};

export default MyApp;
