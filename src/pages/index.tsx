/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */

import dayjs from "dayjs";
import Head from "next/head";
import { NotionAPI } from "notion-client";
import type { Decoration, PageBlock } from "notion-types";
import { getPageProperty, getTextContent, normalizeTitle } from "notion-utils";

import ArticleCard from "../components/ArticleCard";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import NavigationBar from "../components/NavigationBar";
import Section from "../components/Section";

export const getStaticProps = async () => {
  const pageId = "4194be47cc474c4288e861b6da07ca33";

  const notion = new NotionAPI();
  const recordMap = await notion.getPage(pageId);
  const blocks = Object.values(recordMap.block);

  const posts: Required<Omit<PostMetadata, "toc">>[] = blocks
    .filter(({ value: page }) => page.parent_table === "collection")
    .map(({ value: page }) => {
      const pageBlock = recordMap.block[page.id]?.value as PageBlock;

      const imageRaw = (page.format as Record<string, string>).page_cover ?? "";
      const image = imageRaw.includes("secure.notion-static.com")
        ? `https://www.notion.so/image/${encodeURIComponent(imageRaw)}?table=block&id=${
            pageBlock.id
          }&cache=v2&width=600&q=75`
        : imageRaw;

      const summaryRaw: Decoration[] =
        blocks.find(({ value: block }) => block.parent_id === page.id && block.type === "text")?.value.properties
          .title ?? [];

      return {
        title: getPageProperty("Title", pageBlock, recordMap),
        slug: normalizeTitle(getPageProperty("Title", pageBlock, recordMap)),
        summary: getTextContent(summaryRaw),
        cover: image,
        date: dayjs.unix((getPageProperty("Date", pageBlock, recordMap) as number) / 1000).format("DD/MM/YYYY"),
        tags: (getPageProperty("Tags", pageBlock, recordMap) as string[]).filter((tag) => tag.length > 0),
      };
    });

  return {
    props: { posts, recordMap },
    revalidate: 10,
  };
};

const Home = ({ posts, recordMap }: Awaited<ReturnType<typeof getStaticProps>>["props"]): JSX.Element => {
  console.log(posts);
  return (
    <>
      <Head>
        <title>Nourman Hajar - Software Engineer</title>
        <meta name="description" content="Nourman Hajar" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* First Segment - Landing Screen */}

      <Hero />

      <div className="relative h-full w-full">
        <div className="h-28" />

        {/* Navbar */}

        <NavigationBar />

        {/* Second Segment - Blog Posts */}

        <Section
          title="Thoughts ✍️"
          description="My articles and stories (sometimes in Indonesian 🇮🇩)"
          className="bg-notwhite"
        >
          <div className="grid w-full grid-flow-row grid-cols-1 gap-16 md:grid-cols-2">
            {posts.map((post, idx) => (
              <ArticleCard
                key={idx}
                index={idx}
                href={`/${post.slug}`}
                title={post.title}
                summary={post.summary}
                date={post.date}
                tags={post.tags}
                thumbnail={post.cover}
              />
            ))}
          </div>
        </Section>

        <Section
          title="Projects 🛠️"
          description="Things and fun projects I&lsquo;ve worked on 🧑‍💻"
          className="bg-background"
        >
          <div className="grid w-full grid-flow-row grid-cols-1 gap-16 md:grid-cols-2">
            {Array(5)
              .fill(0)
              .map((_, idx) => (
                <ArticleCard
                  key={idx}
                  index={idx}
                  href="/post"
                  title="SIPERAT"
                  tags={["Rust", "TypeScript"]}
                  summary="Apps for managing correspondency and budget documents."
                  thumbnail="https://super-static-assets.s3.amazonaws.com/052634f1-a808-4548-8393-b7f38455a1ac/images/c2e71a4d-a8cf-474b-9d40-d92f20499450.png?b=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAQCAIAAAD4YuoOAAAACXBIWXMAAAsTAAALEwEAmpwYAAADAElEQVQ4jZ1Uz0/TUBzvyX9D48WDdy9eFo8mJmqIR28mBsMBE40xDAQuEDNI9EBgovwKI4MxJzCGYQMHhB+DAQtr6+vr2reuNHTrhCC03TA1b2WsHaDG5JOX9+P7vp/vb0IFzH+C/uOxDEJj4N8B/kHmko9lAlCBChhzNaGZ2s3XKuEzbuuNXdhCwECVhhrD6hyvsSkNlsByeC1LqxRQaYCjQQEMHBlwtrdRlmlKBJUH9iBJJuejYGUNrMaY1TVyaUmMrWsMa0rrQqaQyeBVFAuiqPMIH1Eag0fYLGswKwSmdYDROT6f2Fmenc0rStEwioZBbmzQC4say6k0o/NoqaM70twRbXk3/7ptoaF929Udb+6UAqFUzyDs6JEDMzqPKq5U54Bhjyl6bswnZ7M/JYkMh/nYunFyEg2F+MUlDbI6Qt6nr5quO1qvOQbuP+m+9WDycX3vzbtfa2q/3H60+bxFDs5iAgpY/SBOow8YjeXQyprH44nH44ok7aXTWUFIIzQ5PT0/MaHSUOf4pPdz0Nm+3tV3SNEJ99COe+h7nxcOjO6GwsKwX4NsQRSrqu7UA0wAWSm+qeRykiQlIZRkmc1kKAAKhQLc2lYpWoMpORhWgpGDb8uSL7gXDCvhxezMnOgL7vqnc7NRwRPIeCdUktYYFteLLckAajCVia0fqqphGNHejzXElc6HNb+OjgzDALEN/I1NJd92x50u0tVDdbp32rpIlzvR+n43EEr7psTxKX7IL3gncYgshWvJAWQz8a1Qf3/91RsOgrhDEA6CuEcQ3sbGjUjE/AZ7R6B7mBsYAz1D8NNI6oMn1T+m80gXBB2VKkoQqiq1lIOyB/ntxGiDc/BZ3bjzjc/Z6G9qHnnxsr+2LuEP6BxvlpmOENbI83hFCDcNKPVHGbZGq+5kyBZlpZjfL2ZzGLJSVH4U8/s6SuMklVJV0VXeV9e+fVrYOtm05ZikjykLSFqlsXbrOLGNigtHyMWdfN4Wq/S5MXCpXoukfZpe5uyF07Tq8hL53wbxFGfb7E1VAAAAAElFTkSuQmCC?w=1500&f=webp"
                />
              ))}
          </div>
        </Section>

        <Footer />
      </div>
    </>
  );
};

export default Home;
