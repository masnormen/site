import { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";

const GTM_ID = "G-HJ6G6274PT";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <Script
          id="load-tag"
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`}
          strategy="beforeInteractive"
        />
        <Script id="setup-tag" async strategy="beforeInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.GTM_ID}');
        `}</Script>
      </body>
    </Html>
  );
}
