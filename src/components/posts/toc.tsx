import { Link } from '@tanstack/react-router';
import { Fragment } from 'react/jsx-runtime';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Route } from '@/routes/$contentType.$slug';
import { cn } from '@/utils/cn';
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
          '[&[open]_summary]:mb-2 [&:not([open])_summary]:text-xghoststroke',
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
                className={cn(
                  'inline-block text-xpink -mb-1 not-last-of-type:mb-1.5',
                  toc.level === 1 && 'ml-5 indent-[-1.25rem] font-semibold',
                  toc.level === 2 && 'ml-8 indent-[-1.4rem]',
                  toc.level === 3 && 'ml-10 indent-[-0.8rem]',
                )}
              >
                <span className="select-none">
                  {toc.level === 1 && '▲ '}
                  {toc.level === 2 && '→ '}
                  {toc.level === 3 && '• '}
                </span>
                <Link
                  to="/$contentType/$slug"
                  params={{ contentType: params.contentType, slug: post.slug }}
                  hash={toc.id}
                  preload={false}
                  className="link ml-1 text-sm"
                >
                  {toc.text}
                </Link>
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
