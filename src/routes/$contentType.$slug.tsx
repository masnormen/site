import Comments from '@giscus/react';
import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { useHover } from '@uidotdev/usehooks';
import dayjs from 'dayjs';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Footer } from '@/components/layouts/footer';
import { Section } from '@/components/layouts/section';
import { MDXSubstitution } from '@/components/posts/mdx-substitution';
import { TableOfContents } from '@/components/posts/toc';
import { useInViewport } from '@/hooks/use-in-viewport';
import { getPostBySlug, getProjectBySlug } from '@/services/posts';
import { getMDXExport } from '@/utils/posts';
import type React from 'react';
import type { ThumbnailProps } from '@/types/post';

const getPostBySlugServerFn = createServerFn({ method: 'GET' })
  .validator((slug: string) => slug)
  .handler(({ data: slug }) => getPostBySlug(slug));

const getProjectBySlugServerFn = createServerFn({ method: 'GET' })
  .validator((slug: string) => slug)
  .handler(({ data: slug }) => getProjectBySlug(slug));

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
    if (params.contentType === 'blog') {
      const post = await getPostBySlugServerFn({ data: params.slug });
      if (!post) throw notFound();
      return post;
    }
    const project = await getProjectBySlugServerFn({ data: params.slug });
    if (!project) throw notFound();
    return project;
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
      {
        rel: 'canonical',
        href: `https://nourman.com/${params.contentType}/${params.slug}`,
      },
    ],
  }),
});

function Post() {
  const params = Route.useParams();
  const content = Route.useLoaderData();

  const [PostContent, Thumbnail]: [
    React.FC<{ components: Record<string, React.FC> }>,
    React.FC<ThumbnailProps> | null,
  ] = useMemo(
    () => [
      getMDXExport(content.code).default,
      getMDXExport(content.code).Thumbnail,
    ],
    [content.code],
  );

  const commentRef = useRef<HTMLDivElement>(null);
  const isInViewport = useInViewport(commentRef, '1000px');
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    if (!hasScrolled) setHasScrolled(isInViewport);
  }, [isInViewport]);

  const [ref, isHover] = useHover<HTMLDivElement>();

  return (
    <>
      <Section>
        <Link to="/" className="link text-lg">
          ← Home
        </Link>
        <div className="w-full h-full flex flex-col mx-auto max-w-4xl gap-8">
          <Link
            to="/$contentType/$slug"
            preload={false}
            params={{
              ...params,
            }}
            className="text-center inline"
          >
            <h1 className="inline flex-col text-center items-center rounded-3xl bg-quaternary decoration-clone px-6 py-0.5 font-headline text-[8vw] !leading-[1.4] tracking-wide text-stroke drop-shadow-[5px_5px_0px_var(--theme-tertiary)] transition-all hover:drop-shadow-[5px_5px_0px_var(--theme-highlight)] sm:text-5xl sm:!leading-[1.38]">
              {content.title}
            </h1>
          </Link>
        </div>
        <div className="text-center">
          Written by <span className="font-bold">Nourman Hajar</span>
        </div>
      </Section>

      <Section>
        <article className="relative w-full h-full flex flex-col mx-auto max-w-4xl gap-8">
          <div className="flex w-full flex-col space-y-12">
            <div className="flex w-full flex-col items-center justify-between space-x-2 space-y-4 text-center md:flex-row md:space-y-0">
              {content.createdAt && (
                <div>
                  📆 Posted on{' '}
                  <span className="font-semibold">
                    {dayjs(content.createdAt).format('MMM DD, YYYY')}
                  </span>
                </div>
              )}
              {content.tags && content.tags.length > 0 && (
                <div className="flex flex-wrap items-center space-x-3">
                  {content.tags.map((tag) => (
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

          {typeof Thumbnail === 'function' && (
            <div
              ref={ref}
              className="flex flex-row justify-center relative aspect-3/2! w-full rounded-xl border-2 border-dashed border-tertiary cursor-default overflow-hidden"
            >
              <Thumbnail isHover={isHover} />
            </div>
          )}

          {/* Table of Contents */}
          <TableOfContents post={content} />

          {/* Post body */}
          <div className="markdown-body relative mx-auto flex flex-col items-start w-full">
            <PostContent components={MDXSubstitution} />
          </div>
        </article>

        {/* Comments */}
        <aside
          ref={commentRef}
          className="w-full h-full flex flex-col mx-auto max-w-4xl"
        >
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
        </aside>
      </Section>

      <Footer />
    </>
  );
}
