import { Route } from '@/routes/$contentType.$slug';
import type { Post } from '@/types/post';
import { cn } from '@/utils/cn';
import { Link } from '@tanstack/react-router';
import { Fragment } from 'react/jsx-runtime';

export function TableOfContents({
  post,
}: { post: Pick<Post, 'slug' | 'metadata' | 'toc'> }) {
  const params = Route.useParams();

  return (
    <div
      className={cn(
        'relative flex flex-col',
        '@container 1xxl:absolute 1xxl:top-0 1xxl:left-0 1xxl:-translate-x-full 1xxl:h-full 1xxl:w-[calc(((100vw-896px)/2)-8px)] 1xxl:max-w-xs 1xxl:blur-[1px] 1xxl:opacity-50 1xxl:hover:blur-none 1xxl:hover:opacity-100 duration-200',
      )}
    >
      <div
        className={cn(
          'flex flex-col gap-4 w-full',
          '1xxl:sticky 1xxl:top-[calc(10vh)] 1xxl:pt-14 1xxl:pl-4 1xxl:pr-8',
        )}
      >
        <span className="hidden font-headline text-xl leading-tight 1xxl:block">
          {post.metadata.title}
        </span>
        <span className="block text-lg font-semibold leading-tight 1xxl:hidden">
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
                <Link
                  to="/$contentType/$slug"
                  params={{ contentType: params.contentType, slug: post.slug }}
                  hash={toc.id}
                  reloadDocument
                  preload={false}
                  className="link ml-1 text-sm"
                >
                  {toc.text}
                </Link>
              </span>
              <br />
            </Fragment>
          ))}
          <br className="hidden 1xxl:block" />
          <Link
            to="/$contentType/$slug"
            params={{ contentType: params.contentType, slug: post.slug }}
            hash="_top_"
            reloadDocument
            preload={false}
            className="link hidden 1xxl:inline ml-1 text-sm w-min"
          >
            ↑ Back to top
          </Link>
        </div>
      </div>
    </div>
  );
}
