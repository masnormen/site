/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */

import { GetStaticPropsContext } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { NextSeo } from "next-seo";
import type { CodeBlock, ExtendedRecordMap } from "notion-types";
import { Fragment, useEffect, useRef, useState } from "react";
import { NotionRenderer } from "react-notion-x";

import Footer from "@/components/layout/Footer";
import Hero from "@/components/layout/Hero";
import NavigationBar from "@/components/layout/NavigationBar";
import { env } from "@/env.mjs";
import useInViewport from "@/hooks/useInViewport";
import cn from "@/lib/cn";
import { PostMetadata } from "@/types/notion";
import { getPost, getPostsFromCollection } from "@/utils/notion";

export const getStaticPaths = async () => {
  const [{ data: posts }, { data: works }] = await Promise.all([
    getPostsFromCollection(env.POSTS_NOTION_ID),
    getPostsFromCollection(env.WORKS_NOTION_ID),
  ]);
  const postPaths = posts.map((item) => ({
    params: {
      type: "blog",
      slug: item.slug,
    },
  }));
  const workPaths = works.map((item) => ({
    params: {
      type: "works",
      slug: item.slug,
    },
  }));

  return {
    paths: [...postPaths, ...workPaths],
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const type = params?.type as "works" | "blog";
  const slug = params?.slug as string;

  let containerId = "";
  if (type === "blog") {
    containerId = env.POSTS_NOTION_ID;
  } else if (type === "works") {
    containerId = env.WORKS_NOTION_ID;
  } else {
    return {
      notFound: true,
    };
  }

  const { data: pages } = await getPostsFromCollection(containerId);

  const pageId = pages.find((page) => page.slug === slug)?.id;
  if (!pageId) {
    return {
      notFound: true,
    };
  }

  const { data, recordMap } = await getPost(pageId);

  return {
    props: { type, data, recordMap },
    revalidate: 60,
  };
};

const Code = dynamic(() =>
  import("react-notion-x/build/third-party/code").then(async (m) => {
    await Promise.all([import("prismjs/components/prism-bash.js"), import("prismjs/components/prism-rust.js")]);
    return m.Code;
  }),
);
const Collection = dynamic(() => import("react-notion-x/build/third-party/collection").then((m) => m.Collection));
// const Pdf = dynamic(() => import("react-notion-x/build/third-party/pdf").then((m) => m.Pdf), {
//   ssr: false,
// });

const Comments = dynamic(() => import("@giscus/react"), { ssr: false });

const NotionItem = ({
  type,
  data,
  recordMap,
}: {
  type: "works" | "blog";
  data: PostMetadata;
  recordMap: ExtendedRecordMap;
}): JSX.Element => {
  const commentRef = useRef<HTMLDivElement>(null);
  const isInViewport = useInViewport(commentRef, "1000px");
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    if (!hasScrolled) setHasScrolled(isInViewport);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInViewport]);

  const seoDescription =
    data.summary.length > 200 ? `${data.summary.replace(/^(.{200}[^\s]*).*/, "$1")}...` : data.summary;

  const seoOpenGraphImage = btoa(
    JSON.stringify({
      title: data.title,
      tags: data.tags,
      type,
    }),
  );

  return (
    <>
      <NextSeo
        title={data.title}
        description={seoDescription}
        canonical={`https://nourman.com/${type}/${data.slug}`}
        openGraph={{
          url: `https://nourman.com/${type}/${data.slug}`,
          title: data.title,
          description: seoDescription,
          siteName: "Nourman Hajar",
          images: [
            {
              url: `https://nourman.com/api/content.png?data=${seoOpenGraphImage}`,
              width: 1200,
              height: 630,
              type: "image/png",
              alt: data.title,
            },
          ],
        }}
        twitter={{
          cardType: "summary_large_image",
        }}
      />

      <NavigationBar />

      {/* First Segment - Landing Screen */}
      <Hero title={data.title} href={`/${type}/${data.slug}`} />

      {/* Second Segment - Blog Posts */}

      <section className="relative flex w-full flex-col items-center justify-center bg-blank px-6 py-28 text-stroke md:px-0">
        <div className="relative flex h-full w-full max-w-screen-md flex-col items-center justify-center space-y-8">
          {/* Cover image and metadata */}
          <div className="flex w-full flex-col space-y-12">
            <div className="flex w-full flex-col items-center justify-between space-x-2 space-y-4 text-center md:flex-row md:space-y-0">
              {data.date !== "" && (
                <div>
                  📆 Posted on <span className="font-semibold">{data.date}</span>
                </div>
              )}
              {data.tags.length > 0 && (
                <div className="flex flex-wrap items-center space-x-3">
                  Tags:&nbsp;&nbsp;
                  {data.tags.map((tag) => (
                    <span
                      key={tag}
                      className="h-fit w-fit rounded-2xl border border-stroke bg-tertiary px-2 pb-1.5 pt-2 font-mono text-xs font-bold uppercase leading-none text-stroke"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Table of Contents */}
          <div className="pointer-events-none top-0 block h-full w-full justify-start duration-500 xl:absolute xl:!mt-0 xl:flex xl:px-0">
            <div className="pointer-events-auto sticky top-[6.2rem] z-40 flex h-fit w-full flex-col space-y-2 rounded-lg border border-highlight bg-quaternary p-6 text-sm text-stroke drop-shadow-[4px_4px_0px_var(--theme-tertiary)] duration-300 hover:border-highlight hover:drop-shadow-[4px_4px_0px_var(--theme-highlight)] xl:max-h-[75vh] xl:w-[calc(((100vw-768px)/2)-4rem)] xl:max-w-xs xl:-translate-x-[calc(100%+2rem)] xl:overflow-y-auto">
              <span className="hidden font-headline text-lg leading-tight xl:block">{data.title}</span>
              <span className="block text-lg font-semibold leading-tight xl:hidden">Table of Contents</span>
              <div className="block space-y-1 leading-7">
                {data.toc.map((toc) => (
                  <Fragment key={toc.id}>
                    <span
                      className={cn(
                        "inline-block text-highlight",
                        toc.indentLevel === 0 && "ml-5 indent-[-1.28rem] font-semibold",
                        toc.indentLevel === 1 && "ml-8 -indent-5",
                        toc.indentLevel === 2 && "ml-10 indent-[-0.9rem]",
                      )}
                    >
                      {toc.indentLevel === 0 && "▲ "}
                      {toc.indentLevel === 1 && "→ "}
                      {toc.indentLevel === 2 && "• "}
                      <a href={`#${toc.id}`} className="link ml-1 text-[15px]">
                        {toc.text}
                      </a>
                    </span>
                    <br />
                  </Fragment>
                ))}
              </div>
            </div>
          </div>

          {data.hasCover && (
            <img className="aspect-video w-full rounded-lg object-cover" alt={data.title} src={data.thumbnail} />
          )}

          {/* Post body */}
          <NotionRenderer
            recordMap={recordMap}
            showTableOfContents={true}
            darkMode={false}
            components={{
              nextImage: Image,
              nextLink: Link,
              Code: (props: { block: CodeBlock; defaultLanguage?: string; className?: string }) => (
                <div className="relative w-full">
                  <Code {...props} />
                </div>
              ),
              Collection,
              // Pdf,
            }}
          />
        </div>

        {/* Comments */}

        <div ref={commentRef} className="relative mt-24 flex h-full w-full max-w-screen-md">
          {isInViewport && (
            <Comments
              id="comments"
              repo="masnormen/site"
              repoId="R_kgDOGb4nwQ"
              category="Comments"
              categoryId="DIC_kwDOGb4nwc4CUigF"
              mapping="pathname"
              strict="0"
              reactionsEnabled="1"
              emitMetadata="0"
              inputPosition="top"
              theme="light"
              lang="en"
            />
          )}
        </div>
      </section>

      <Footer className="bg-background" />
    </>
  );
};

export default NotionItem;
