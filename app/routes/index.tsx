import { createFileRoute } from '@tanstack/react-router';

import { Footer } from '@/components/layouts/footer';
import { Hero } from '@/components/layouts/hero';
import { Section } from '@/components/layouts/section';
import { ArticleCard } from '@/components/posts/article-card';
import { getPostList } from '@/services/posts';
import { getMDXComponent } from 'mdx-bundler/client';
import { useMemo } from 'react';

export const Route = createFileRoute('/')({
  loader: () => getPostList(),
  component: Home,
});

function Home() {
  const posts = Route.useLoaderData();

  const mdxThumbnails = useMemo(
    () =>
      posts.map((post) =>
        post.thumbnailCode ? getMDXComponent(post.thumbnailCode) : null,
      ),
    [posts],
  );

  return (
    <>
      <Hero />

      <Section
        id="blog"
        title="Blog"
        description="On software engineering, web development, and random tech stuff"
        className="border-tertiary border-t-2 border-dashed bg-blank"
      >
        <div
          data-testid="bloglist"
          className="grid mx-auto w-full max-w-4xl grid-cols-1 gap-8 md:gap-12"
        >
          {posts.map((post, idx) => {
            const Thumbnail = mdxThumbnails[idx];
            return (
              <ArticleCard
                key={idx}
                className="bg-blank"
                href={`/blog/${post.slug}`}
                title={post.metadata.title}
                date={post.metadata.createdAt.toDateString()}
                tags={post.metadata.tags ?? []}
                thumbnail={Thumbnail ? <Thumbnail /> : null}
                dir={idx % 2 === 0 ? 'ltr' : 'rtl'}
              />
            );
          })}
        </div>
      </Section>

      <Section
        id="works"
        title="Projects"
        description="Things and fun projects I&lsquo;ve worked on, mostly open-source"
        className="border-tertiary border-t-2 border-dashed bg-background"
      >
        <div
          data-testid="workslist"
          className="grid mx-auto w-full max-w-4xl grid-cols-1 gap-8 md:gap-12"
        >
          {/* {works.map((item, idx) => (
            <ArticleCard
              key={idx}
              className="bg-blank"
              href={`/blog/${item.href}`}
              title={item.title}
              date={item.date}
              tags={item.tags}
              thumbnail={item.thumbnail + '?random=' + idx}
              dir={idx % 2 === 0 ? 'ltr' : 'rtl'}
            />
          ))} */}
        </div>
      </Section>

      <Footer />
    </>
  );
}
