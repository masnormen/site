import "@/styles/globals.css";
import "@/styles/notion.css";
import "prism-themes/themes/prism-gruvbox-dark.min.css";
import "@/styles/custom.css";

import { type AppType } from "next/dist/shared/lib/utils";
import { Space_Mono } from "next/font/google";
import localFont from "next/font/local";
import Head from "next/head";

import SVGFilters from "@/components/SVGFilters";

const varentGrotesk = localFont({
  src: "../styles/fonts/VarentGrotesk-Bold.otf",
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
    { path: "../styles/fonts/PlusJakartaSans-Regular.ttf", style: "normal" },
    { path: "../styles/fonts/PlusJakartaSans-Italic.ttf", style: "italic" },
  ],
  variable: "--font-jakarta",
  weight: "200 900",
  display: "swap",
});

const App: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      </Head>
      <div className={`${plusJakarta.variable} ${varentGrotesk.variable} ${spaceMono.variable} font-sans`}>
        <Component {...pageProps} />
      </div>
      <SVGFilters />
    </>
  );
};

export default App;
