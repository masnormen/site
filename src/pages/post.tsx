/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import dayjs from "dayjs";
import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { NotionAPI } from "notion-client";
import type { PageBlock } from "notion-types";
import { getPageProperty, getPageTableOfContents } from "notion-utils";
import { NotionRenderer } from "react-notion-x";

import Footer from "../components/Footer";
import Hero from "../components/Hero";
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
  const block = recordMap.block["4c843dea-4eb6-4baf-ba81-b5942cdfbb9b"]?.value as PageBlock;

  const postMetadata: PostMetadata = {
    title: getPageProperty("Title", block, recordMap),
    date: dayjs.unix((getPageProperty("Date", block, recordMap) as number) / 1000).format("DD/MM/YYYY"),
    summary: "test",
    tags: getPageProperty("Tags", block, recordMap),
    toc: getPageTableOfContents(block, recordMap).map((entry) => ({ ...entry, id: entry.id.replaceAll(/-/g, "") })),
  };

  return {
    props: { recordMap, postMetadata },
    revalidate: 10,
  };
};

const Home = ({ recordMap, postMetadata }: Awaited<ReturnType<typeof getStaticProps>>["props"]): JSX.Element => {
  console.log(recordMap);
  return (
    <>
      <Head>
        <title>{postMetadata.title}</title>
        <meta name="description" content="Nourman Hajar" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavigationBar />

      {/* First Segment - Landing Screen */}
      <Hero postTitle={postMetadata.title} />

      {/* Second Segment - Blog Posts */}

      <section className="relative flex w-full flex-col items-center justify-center bg-notwhite py-28 px-6 text-stroke md:px-0">
        <div className="z-10 flex h-full w-full max-w-screen-lg flex-col items-center justify-center space-y-16">
          <NotionRenderer
            recordMap={recordMap}
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

      <Footer className="bg-background" />
    </>
  );
};

export default Home;
