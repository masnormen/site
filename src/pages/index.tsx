/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */

import { NextSeo } from "next-seo";

import ArticleCard from "@/components/ArticleCard";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import NavigationBar from "@/components/NavigationBar";
import Section from "@/components/Section";
import { env } from "@/env.mjs";
import { getPostsFromCollection } from "@/utils/notion";

export const getStaticProps = async () => {
  const [{ data: posts }, { data: works }] = await Promise.all([
    getPostsFromCollection(env.POSTS_NOTION_ID),
    getPostsFromCollection(env.WORKS_NOTION_ID),
  ]);

  return {
    props: { posts, works },
    revalidate: 60,
  };
};

const SEO_DATA = {
  title: "Nourman Hajar • Software Engineer",
  description: "The website of Nourman Hajar, Software Engineer based in Indonesia.",
  url: "https://nourman.com/",
};

const Home = ({ posts, works }: Awaited<ReturnType<typeof getStaticProps>>["props"]): JSX.Element => {
  return (
    <>
      <NextSeo
        title={SEO_DATA.title}
        titleTemplate="%s"
        description={SEO_DATA.description}
        canonical={SEO_DATA.url}
        openGraph={{
          url: SEO_DATA.url,
          title: SEO_DATA.title,
          description: SEO_DATA.description,
          images: [
            {
              url: "https://nourman.com/api/site.png",
              width: 1200,
              height: 630,
              type: "image/png",
            },
          ],
          siteName: SEO_DATA.title,
        }}
        twitter={{
          cardType: "summary_large_image",
        }}
      />

      {/* First Segment - Landing Screen */}

      <Hero />

      <div className="relative h-full w-full">
        <div className="h-28 bg-blank" />

        {/* Navbar */}

        <NavigationBar />

        {/* Second Segment - Blog Posts */}

        <Section
          id="blog"
          title="Thoughts ✍️"
          description="My articles and stories (sometimes in Indonesian 🇮🇩)"
          className="bg-blank"
        >
          <div className="grid w-full grid-flow-row grid-cols-1 gap-10 md:grid-cols-2">
            {posts.map((item) => (
              <ArticleCard
                key={item.slug}
                className="bg-quaternary"
                href={`/blog/${item.slug}`}
                title={item.title}
                summary={item.summary}
                date={item.date}
                tags={item.tags}
                thumbnail={item.thumbnail}
              />
            ))}
          </div>
        </Section>

        <Section
          id="works"
          title="Projects 🛠️"
          description="Things and fun projects I&lsquo;ve worked on 🧑‍💻"
          className="bg-background"
        >
          <div className="grid w-full grid-flow-row grid-cols-1 gap-10 md:grid-cols-2">
            {works.map((item) => (
              <ArticleCard
                key={item.slug}
                className="bg-blank"
                href={`/works/${item.slug}`}
                title={item.title}
                summary={item.summary}
                date={item.date}
                tags={item.tags}
                thumbnail={item.thumbnail}
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
