import { Link } from '@tanstack/react-router';
import { Fragment } from 'react/jsx-runtime';
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

  return (
    <div
      className={cn(
        '@container sm:sticky top-16 flex flex-col bg-xbg mt-8 lg:mt-16 lg:mb-8 px-5 py-4 lg:py-8 rounded-xl md:rounded-l-cxl lg:rounded-l-none md:rounded-r-cxl sm:hover:scale-99 sm:hover:shadow-2xs sm:hover:bg-xarrow transition-all duration-200',
        className,
      )}
    >
      <div className="block space-y-1 leading-tight">
        {post.toc.map((toc) => (
          <Fragment key={toc.id}>
            <span
              className={cn(
                'inline-block text-xpink -mb-1 not-last-of-type:mb-1.5',
                toc.level === 1 && 'ml-5 indent-[-1.28rem] font-semibold',
                toc.level === 2 && 'ml-8 -indent-5',
                toc.level === 3 && 'ml-10 indent-[-0.9rem]',
              )}
            >
              {toc.level === 1 && '▲ '}
              {toc.level === 2 && '→ '}
              {toc.level === 3 && '• '}
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
    </div>
  );
}
