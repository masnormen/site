import Comments from '@giscus/react';
import { createFileRoute, notFound } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import { Footer } from '@/components/layouts/footer';
import { Contact } from '@/components/layouts/home/contact';
import { PostBody } from '@/components/layouts/post/body';
import { PostHeader } from '@/components/layouts/post/header';
import { Section } from '@/components/layouts/section';
import { useInViewport } from '@/hooks/use-in-viewport';
import { getContentServerFn } from '@/services/posts';

export const Route = createFileRoute('/$contentType/$slug')({
  component: Post,
  params: {
    parse: (params) => {
      if (params.contentType === 'blog' || params.contentType === 'projects') {
        return {
          ...params,
          contentType: params.contentType as 'blog' | 'projects',
        };
      }
      throw notFound();
    },
  },
  loader: async ({ params }) => {
    const content = await getContentServerFn({ data: params });
    if (!content) throw notFound();
    return content;
  },
  head: ({ params, loaderData }) => ({
    meta: [
      {
        title: `${loaderData?.title || (params.contentType === 'blog' ? 'Article' : 'Project')} • Nourman Hajar`,
      },
      {
        name: 'description',
        content:
          loaderData?.description ||
          'A blog on software engineering, web development, and miscellaneous tech stuff, by Nourman Hajar.',
      },
      {
        property: 'og:title',
        content: `${loaderData?.title || (params.contentType === 'blog' ? 'Article' : 'Project')} • Nourman Hajar`,
      },
      {
        property: 'og:description',
        content:
          loaderData?.description ||
          'A blog on software engineering, web development, and miscellaneous tech stuff, by Nourman Hajar.',
      },
      {
        property: 'og:url',
        content: `https://nourman.com/${params.contentType}/${params.slug}`,
      },
      // {
      //   property: 'og:image',
      //   content: `https://nourman.com/opengraph/${params.contentType}/${params.slug}`,
      // },
      {
        rel: 'canonical',
        href: `https://nourman.com/${params.contentType}/${params.slug}`,
      },
    ],
  }),
});

const useLazyLoadComment = () => {
  const commentRef = useRef<HTMLDivElement>(null);
  const isInViewport = useInViewport(commentRef, '1000px');
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    if (!hasScrolled) setHasScrolled(isInViewport);
  }, [isInViewport]);

  return { commentRef, hasScrolled };
};

function Post() {
  const { commentRef, hasScrolled } = useLazyLoadComment();

  return (
    <>
      <PostHeader />
      <PostBody />
      {/* Comments */}
      <Section ref={commentRef} className="py-8 md:py-16">
        {hasScrolled && (
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
            theme="light_protanopia"
            lang="en"
          />
        )}
      </Section>
      <Contact />
      <Footer />
    </>
  );
}
