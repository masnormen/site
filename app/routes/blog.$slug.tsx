import { Section } from '@/components/layouts/section';
import { MDXSubstitution } from '@/components/posts/mdx-substitution';
import { TableOfContents } from '@/components/posts/toc';
import { useInViewport } from '@/hooks/use-in-viewport';
import { getPostBySlug } from '@/services/posts';
import gfmCss from '@/styles/gfm.css?url';
import shikiCss from '@/styles/shiki.css?url';
import { Link, createFileRoute, notFound } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/start';
import { type MDXContentProps, getMDXExport } from 'mdx-bundler/client';
import type React from 'react';
import { lazy, useEffect, useMemo, useRef, useState } from 'react';

const getPostBySlugServerFn = createServerFn({ method: 'GET' })
  .validator((slug: string) => slug)
  .handler(({ data: slug }) => getPostBySlug(slug));

export const Route = createFileRoute('/blog/$slug')({
  component: Post,
  loader: async ({ params }) => {
    const post = await getPostBySlugServerFn({ data: params.slug });
    if (!post) throw notFound();
    return post;
  },
  head: () => ({
    links: [
      {
        rel: 'stylesheet',
        href: gfmCss.split('?')[0],
        suppressHydrationWarning: true,
      },
      {
        rel: 'stylesheet',
        href: shikiCss.split('?')[0],
        suppressHydrationWarning: true,
      },
    ],
  }),
});

const Comments = lazy(() => import('@giscus/react'));

function Post() {
  const post = Route.useLoaderData();

  const [PostContent, Thumbnail]: [
    React.FC<MDXContentProps>,
    React.FC<MDXContentProps> | null,
  ] = useMemo(
    () => [getMDXExport(post.code).default, getMDXExport(post.code).Thumbnail],
    [post.code],
  );

  const commentRef = useRef<HTMLDivElement>(null);
  const isInViewport = useInViewport(commentRef, '1000px');
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    if (!hasScrolled) setHasScrolled(isInViewport);
  }, [isInViewport]);

  return (
    <>
      <Section className="border-tertiary border-t-2 border-dashed bg-blank px-8 gap-8 md:gap-10">
        <div className="w-full h-full flex flex-col mx-auto max-w-4xl gap-8">
          <Link to="/" className="text-center inline">
            <h1 className="inline flex-col text-center items-center rounded-3xl bg-quaternary decoration-clone px-6 py-0.5 font-headline text-[8vw] !leading-[1.4] tracking-wide text-stroke drop-shadow-[5px_5px_0px_var(--theme-tertiary)] transition-all hover:drop-shadow-[5px_5px_0px_var(--theme-highlight)] sm:text-5xl sm:!leading-[1.38]">
              {post.metadata.title}
            </h1>
          </Link>
        </div>
        <div className="text-center">
          Written by <span className="font-bold">Nourman Hajar</span>
        </div>
      </Section>

      <Section className="border-tertiary border-t-2 border-dashed bg-blank">
        <article className="relative w-full h-full flex flex-col mx-auto max-w-4xl gap-8">
          <div className="flex w-full flex-col space-y-12">
            <div className="flex w-full flex-col items-center justify-between space-x-2 space-y-4 text-center md:flex-row md:space-y-0">
              {post.metadata.createdAt && (
                <div>
                  📆 Posted on{' '}
                  <span className="font-semibold">
                    {post.metadata.createdAt.toDateString()}
                  </span>
                </div>
              )}
              {post.metadata.tags && post.metadata.tags.length > 0 && (
                <div className="flex flex-wrap items-center space-x-3">
                  {post.metadata.tags.map((tag) => (
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
            <div className="block relative aspect-3/2! w-full rounded-xl border-2 border-dashed border-tertiary cursor-default">
              <Thumbnail />
            </div>
          )}

          {/* Table of Contents */}
          <TableOfContents post={post} />

          {/* Post body */}
          <div className="markdown-body relative mx-auto flex flex-col items-start w-full">
            <PostContent components={MDXSubstitution} />
          </div>
        </article>

        {/* Comments */}
        <aside
          ref={commentRef}
          className="mt-14 w-full h-full flex flex-col mx-auto max-w-4xl"
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
    </>
  );
}
