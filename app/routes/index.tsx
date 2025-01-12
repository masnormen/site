import { createFileRoute } from '@tanstack/react-router';

import { Footer } from '@/components/layouts/footer';
import { Hero } from '@/components/layouts/hero';
import { Section } from '@/components/layouts/section';
import {
  ArticleCard,
  type ArticleCardProps,
} from '@/components/posts/article-card';
import { getPostList } from '@/services/posts';

export const Route = createFileRoute('/')({
  loader: () => getPostList(),
  component: Home,
});

const works = [
  {
    title: 'Resolving React/Next.js SSR Escaping Issue in Meta Tags',
    href: '/google.com',
    thumbnail: 'https://picsum.photos/800/450',
    date: 'Dec 12, 2024',
    tags: ['Life', 'SVG'],
  },
  {
    title:
      'Resolving React/Next.js SSR Escaping Issue in Meta Tags t, hendrerit quis mauris. In hac habitasse t, hendrerit quis mauris. In hac habitasse ',
    href: '/google.com',
    thumbnail: 'https://picsum.photos/800/450',
    date: 'Dec 12, 2024',
    tags: ['Life', 'SVG'],
  },
  {
    title: 'Resolving React/Next.js SSR Escaping Issue in Meta Tags',
    href: '/google.com',
    thumbnail: 'https://picsum.photos/800/450',
    date: 'Dec 12, 2024',
    tags: ['Life', 'SVG'],
  },
  {
    title: 'Resolving React/Next.js SSR Escaping Issue in Meta Tags',
    href: '/google.com',
    thumbnail: 'https://picsum.photos/800/450',
    date: 'Dec 12, 2024',
    tags: ['Life', 'SVG'],
  },
  {
    title:
      'How I Improved a Kanji Search Engine Performance by >20x with Typesense',
    href: '/google.com',
    thumbnail: 'https://picsum.photos/800/450',
    date: 'Dec 12, 2024',
    tags: ['Life', 'SVG'],
  },
  {
    title: 'Resolving React/Next.js SSR Escaping Issue in Meta Tags',
    href: '/google.com',
    thumbnail: 'https://picsum.photos/800/450',
    date: 'Dec 12, 2024',
    tags: ['Life', 'SVG'],
  },
] satisfies Omit<ArticleCardProps, 'dir'>[];

function Home() {
  const posts = Route.useLoaderData();

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
          {posts.map((post, idx) => (
            <ArticleCard
              key={idx}
              className="bg-blank"
              href={'post.href'}
              title={post.metadata.title}
              date={post.metadata.publishedAt.toDateString()}
              tags={post.metadata.tags ?? []}
              thumbnail={'https://picsum.photos/800/450' + '?random=' + idx}
              dir={idx % 2 === 0 ? 'ltr' : 'rtl'}
            />
          ))}
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
          {works.map((item, idx) => (
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
          ))}
        </div>
      </Section>

      <Footer />
    </>
  );
}
