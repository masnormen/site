/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { CodeBracketIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import { NotionAPI } from "notion-client";
import { NotionRenderer } from "react-notion-x";

import dynamic from "next/dynamic";
import { getPageProperty } from "notion-utils";
import NavigationBar from "../components/NavigationBar";

const Code = dynamic(() =>
  import("react-notion-x/build/third-party/code").then(async (m) => {
    await Promise.all([
      import("prismjs/components/prism-bash.js"),
      import("prismjs/components/prism-js-templates.js"),
      import("prismjs/components/prism-git.js"),
      import("prismjs/components/prism-go.js"),
      import("prismjs/components/prism-graphql.js"),
      import("prismjs/components/prism-markdown.js"),
      import("prismjs/components/prism-ocaml.js"),
      import("prismjs/components/prism-python.js"),
      import("prismjs/components/prism-rust.js"),
      import("prismjs/components/prism-sql.js"),
    ]);
    return m.Code;
  })
);
const Collection = dynamic(() => import("react-notion-x/build/third-party/collection").then((m) => m.Collection));
const Equation = dynamic(() => import("react-notion-x/build/third-party/equation").then((m) => m.Equation));
const Pdf = dynamic(() => import("react-notion-x/build/third-party/pdf").then((m) => m.Pdf), {
  ssr: false,
});

export const getStaticProps = async () => {
  const notion = new NotionAPI();
  const recordMap = await notion.getPage("4c843dea-4eb6-4baf-ba81-b5942cdfbb9b");

  const title = getPageProperty("Tags", recordMap.block["4c843dea-4eb6-4baf-ba81-b5942cdfbb9b"]!.value, recordMap);
  return {
    props: { recordMap, title },
    revalidate: 10,
  };
};

const Home = (props: Awaited<ReturnType<typeof getStaticProps>>["props"]): JSX.Element => {
  console.log(props.title);
  return (
    <>
      <Head>
        <title>Nourman Hajar - Software Engineer</title>
        <meta name="description" content="Nourman Hajar" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavigationBar />

      {/* First Segment - Landing Screen */}

      <main className="relative flex h-[50vh] w-full flex-col items-center justify-center overflow-hidden bg-background">
        {/* Green Rectangle */}
        <div className="animate-slowspin-30 filter-noisy absolute z-0 flex aspect-square h-3/6 max-h-[100vw] bg-tertiary md:h-4/6" />

        {/* Pink Rectangle */}
        <div className="animate-slowspin filter-noisy absolute z-0 flex aspect-square h-3/6 max-h-[100vw] bg-secondary md:h-4/6" />

        {/* Yellowish Rectangle */}
        <div className="animate-slowspin-60 filter-noisy absolute z-0 flex aspect-square h-3/6 max-h-[100vw] bg-quaternary md:h-4/6" />

        {/* Circle */}
        <div className="animate-slowspin-rev bg-pattern-wavy filter-noisy absolute z-0 flex aspect-square h-3/6 max-h-[100vw] items-center justify-center rounded-full bg-background shadow-sm md:h-[70%]">
          <svg
            viewBox="0 0 100 100"
            className="aspect-square h-[80%] font-mono text-[0.38rem] font-bold uppercase text-stroke opacity-25"
          >
            <defs>
              <path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
            </defs>
            <text fill="currentColor">
              <textPath xlinkHref="#circle">Lorem ipsum dolor sit amet consectetur adipiscing elit !</textPath>
            </text>
          </svg>
        </div>

        {/* Site title */}
        <div className="absolute top-1/2 left-1/2 z-30 flex -translate-x-1/2 -translate-y-[50%]  flex-col items-center justify-center text-center">
          <div className="shadow-xs drop-shadow-md">
            <h1 className="filter-gooey inline bg-stroke decoration-clone px-4 py-4 text-center font-fancy text-[12vw] !leading-[1.3] text-notwhite sm:text-5xl">
              3 Ways to Set Up Multiple Git Accounts in a Single Computer
            </h1>
          </div>
        </div>
      </main>

      {/* Second Segment - Blog Posts */}

      <section className="relative flex w-full flex-col items-center justify-center bg-notwhite py-28 px-6 text-stroke md:px-0">
        <div className="z-10 flex h-full w-full max-w-screen-lg flex-col items-center justify-center space-y-16">
          <NotionRenderer
            recordMap={props.recordMap}
            showTableOfContents={true}
            darkMode={false}
            rootDomain={"https://localhost:3000"}
            rootPageId={"b62b357edb4d48f4a4fd0e9f136bf7e3"}
            components={{
              nextImage: Image,
              nextLink: Link,
              Code,
              Collection,
              Equation,
              Pdf,
            }}
          />
        </div>
      </section>

      <footer className="relative flex w-full flex-col items-center justify-center bg-notwhite py-28 px-6 text-stroke md:px-0">
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-semibold leading-tight">
          &copy;
          <br />
          Nourman
          <br />
          Hajar
        </span>
        <svg viewBox="0 0 100 100" className="animate-fastspin aspect-square h-48 font-mono text-lg">
          <defs>
            <path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
          </defs>
          <text fill="currentColor">
            <textPath xlinkHref="#circle">🛌 ☕️ 🚚 🚀 🧑‍💻 📦 👀 🪲</textPath>
          </text>
        </svg>
      </footer>
    </>
  );
};

export default Home;
