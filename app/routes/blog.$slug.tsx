import { MDXSubstitution } from '@/components/posts/mdx-substitution';
import { useInViewport } from '@/hooks/use-in-viewport';
import { getPostBySlug } from '@/services/posts';
import { cn } from '@/utils/cn';
import { createFileRoute, notFound } from '@tanstack/react-router';
import { type MDXContentProps, getMDXExport } from 'mdx-bundler/client';
import type React from 'react';
import { Fragment, lazy, useEffect, useMemo, useRef, useState } from 'react';

export const Route = createFileRoute('/blog/$slug')({
  component: Post,
  loader: async ({ params }) => {
    const post = await getPostBySlug({ data: params.slug });
    if (!post) throw notFound();
    return post;
  },
});

const Comments = lazy(() => import('@giscus/react'));

function Post() {
  const post = Route.useLoaderData();

  const mdxExport = getMDXExport(post.code);
  const PostContent: React.FC<MDXContentProps> = useMemo(
    () => mdxExport.default,
    [post.code],
  );
  const Thumbnail: React.FC | undefined = useMemo(
    () => mdxExport.Thumbnail,
    [post.code],
  );

  const commentRef = useRef<HTMLDivElement>(null);
  const isInViewport = useInViewport(commentRef, '1000px');
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    if (!hasScrolled) setHasScrolled(isInViewport);
  }, [isInViewport]);

  return (
    <main className="relative flex w-full flex-col items-center justify-center bg-blank px-4 py-8 text-stroke md:px-0 md:py-14">
      <article className="relative flex h-full w-full max-w-screen-md flex-col items-center justify-center space-y-8">
        {/* Cover image and metadata */}
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
                Tags:&nbsp;&nbsp;
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

        {/* Table of Contents */}
        <div className="pointer-events-none top-0 block h-full w-full justify-start duration-500 xl:absolute xl:!mt-0 xl:flex xl:px-0">
          <div className="pointer-events-auto sticky top-[6.2rem] z-40 flex h-fit w-full flex-col space-y-2 rounded-lg border border-highlight bg-quaternary p-6 text-sm text-stroke drop-shadow-[4px_4px_0px_var(--theme-tertiary)] duration-300 hover:border-highlight hover:drop-shadow-[4px_4px_0px_var(--theme-highlight)] xl:max-h-[75vh] xl:w-[calc(((100vw-768px)/2)-4rem)] xl:max-w-xs xl:-translate-x-[calc(100%+2rem)] xl:overflow-y-auto">
            <span className="hidden font-headline text-lg leading-tight xl:block">
              {post.metadata.title}
            </span>
            <span className="block text-lg font-semibold leading-tight xl:hidden">
              Table of Contents
            </span>
            <div className="block space-y-1 leading-7">
              {post.toc.map((toc) => (
                <Fragment key={toc.id}>
                  <span
                    className={cn(
                      'inline-block text-highlight',
                      toc.level === 1 && 'ml-5 indent-[-1.28rem] font-semibold',
                      toc.level === 2 && 'ml-8 -indent-5',
                      toc.level === 3 && 'ml-10 indent-[-0.9rem]',
                    )}
                  >
                    {toc.level === 1 && '▲ '}
                    {toc.level === 2 && '→ '}
                    {toc.level === 3 && '• '}
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

        {/* Post body */}
        <div className="relative mx-auto flex flex-col items-start w-full">
          <PostContent components={MDXSubstitution} />
        </div>
      </article>

      {/* Comments */}

      <div
        ref={commentRef}
        className="relative mt-14 flex h-full w-full max-w-screen-md"
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
      </div>
    </main>
  );
}
