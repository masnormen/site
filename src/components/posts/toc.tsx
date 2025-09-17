import { Link } from '@tanstack/react-router';
import { Fragment } from 'react/jsx-runtime';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Route } from '@/routes/$contentType.$slug';
import { cn } from '@/utils/cn';
import type { CSSProperties } from 'react';
import type { Post } from '@/types/post';

export function TableOfContents({
  post,
  className,
}: {
  post: Pick<Post, 'title' | 'slug' | 'toc'>;
  className?: string;
}) {
  const params = Route.useParams();

  const isLargeScreen = useMediaQuery('(min-width: 1024px)', {
    defaultValue: true,
  });

  return (
    <div className="sm:sticky top-16 lg:mb-16">
      <details
        className={cn(
          'flex flex-col bg-xbg mt-8 lg:mt-16 px-5 py-4 lg:py-8 rounded-xl lg:rounded-l-none lg:rounded-r-cxl sm:hover:scale-99 sm:hover:shadow-2xs sm:hover:bg-xarrow transition-all duration-200',
          '[&[open]_summary]:mb-2',
          className,
        )}
        open={isLargeScreen ? true : undefined}
      >
        <summary className="lg:hidden text-sm font-bold">
          Table of Contents
        </summary>
        <div className="block space-y-1 leading-tight">
          {post.toc.map((toc) => (
            <Fragment key={toc.id}>
              <span
                style={
                  {
                    '--indent': `${(toc.level - 1) * 1.25}ch`,
                  } as CSSProperties
                }
                className={cn(
                  'inline-flex flex-row text-xpink -mb-1 not-last-of-type:mb-1.5 gap-2',
                  'pl-[var(--indent)]',
                  toc.level === 1 && 'font-semibold',
                )}
              >
                <span className="inline-block select-none">
                  {['▲', '→', '✻', '△', '⬠', '⬡'][toc.level - 1]}
                </span>
                <div>
                  <Link
                    to="/$contentType/$slug"
                    params={{
                      contentType: params.contentType,
                      slug: post.slug,
                    }}
                    hash={toc.id}
                    preload={false}
                    className="link text-sm break-words"
                  >
                    {toc.text}
                  </Link>
                </div>
              </span>
              <br />
            </Fragment>
          ))}
          <Link
            to="/$contentType/$slug"
            params={{ contentType: params.contentType, slug: post.slug }}
            hash="_top_"
            preload={false}
            className="link hidden lg:inline-flex mt-1.5 ml-1 text-sm"
          >
            ↑ Back to top
          </Link>
        </div>
      </details>

      <section className="hidden lg:block p-6 text-sm text-xghoststroke italic">
        {post.title}
      </section>
    </div>
  );
}
