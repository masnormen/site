import { type AppType } from "next/dist/shared/lib/utils";

import localFont from "@next/font/local";

import "../styles/globals.css";
// import "../styles/notion.css";
import "../styles/custom.css";
import Head from "next/head";

const neueMetanaNext = localFont({
  src: "../styles/fonts/MeshedDisplay-ExtraBold.otf",
  variable: "--font-metana",
  display: "swap",
});

const neueMetanaMono = localFont({
  src: [
    { path: "../styles/fonts/NeueMetanaMono-SemiBold.otf", weight: "700" },
    { path: "../styles/fonts/NeueMetanaMono-Light.otf", weight: "400" },
  ],
  variable: "--font-metana-mono",
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
        className={`${plusJakarta.variable} ${neueMetanaNext.variable} ${neueMetanaMono.variable} h-full w-full font-sans`}
      >
        <Component {...pageProps} />
        <svg className="invisible hidden">
          <filter id="noise">
            <feTurbulence baseFrequency="0.50" result="colorNoise" />
            <feColorMatrix
              in="colorNoise"
              type="matrix"
              values=".66 .66 .66 0.4 0 .66 .66 .66 0.4 0 .66 .66 .66 0.4 0 0 0 0 1 0"
            />
            <feComposite operator="in" in2="SourceGraphic" result="monoNoise" />
            <feBlend in="SourceGraphic" in2="monoNoise" mode="multiply" />
          </filter>
        </svg>
        <svg className="invisible hidden">
          <filter id="extremenoise">
            <feTurbulence baseFrequency="0.50" result="colorNoise" />
            <feColorMatrix
              in="colorNoise"
              type="matrix"
              values=".3 .3 .3 0.4 0 .3 .3 .3 0.4 0 .3 .3 .3 0.4 0 0 0 0 1.2 0"
            />
            <feComposite operator="in" in2="SourceGraphic" result="monoNoise" />
            <feBlend in="SourceGraphic" in2="monoNoise" mode="multiply" />
          </filter>
        </svg>
        <svg className="invisible hidden">
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 17 -9" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </svg>
      </main>
    </>
  );
};

export default MyApp;
