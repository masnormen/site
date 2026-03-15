import type { CSSProperties } from 'react';

import { Link } from '@tanstack/react-router';
import { Fragment } from 'react/jsx-runtime';

import type { Post } from '@/types/post';

import { useMediaQuery } from '@/hooks/use-media-query';
import { Route } from '@/routes/$contentType.$slug';
import { cn } from '@/utils/cn';

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
    <div className="top-16 sm:sticky lg:mb-16">
      <details
        className={cn(
          'bg-xbg lg:rounded-r-cxl sm:hover:bg-xarrow mt-8 flex flex-col rounded-xl px-5 py-4 transition-all duration-200 sm:hover:scale-99 sm:hover:shadow-2xs lg:mt-16 lg:rounded-l-none lg:py-8',
          '[&[open]_summary]:mb-2',
          className,
        )}
        open={isLargeScreen ? true : undefined}
      >
        <summary className="text-sm font-bold lg:hidden">Table of Contents</summary>
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
                  'text-xpink -mb-1 inline-flex flex-row gap-2 not-last-of-type:mb-1.5',
                  'pl-[var(--indent)]',
                  toc.level === 1 && 'font-semibold',
                )}
              >
                <span className="inline-block select-none">{['▲', '→', '✻', '△', '⬠', '⬡'][toc.level - 1]}</span>
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
            className="link mt-1.5 ml-1 hidden text-sm lg:inline-flex"
          >
            ↑ Back to top
          </Link>
        </div>
      </details>

      <section className="text-xghoststroke hidden p-6 text-sm italic lg:block">{post.title}</section>
    </div>
  );
}
