import type { Post } from '@/types/post';
import { cn } from '@/utils/cn';
import { Link } from '@tanstack/react-router';
import { Fragment } from 'react/jsx-runtime';

export function TableOfContents({
  post,
}: { post: Pick<Post, 'slug' | 'metadata' | 'toc'> }) {
  return (
    // <div className="pointer-events-none top-134 block h-full w-full justify-start duration-500 xl:absolute xl:mt-0! xl:flex xl:px-0">
    // {/* <div className="pointer-events-auto justify-center sticky top-0 xl:h-dvh z-40 flex w-full flex-col space-y-2 rounded-lg xl:p-6 text-sm text-stroke duration-300 xl:w-[calc(((100vw-768px)/2)-5rem)] xl:max-w-xs xl:-translate-x-[calc(100%+1rem)] xl:overflow-y-auto xl:blur-[1px] xl:opacity-50 xl:hover:blur-none xl:hover:opacity-100"> */}
    <div
      className={cn(
        'relative flex flex-col',
        'contain-inline-size 1xxl:absolute 1xxl:top-0 1xxl:left-0 1xxl:-translate-x-full 1xxl:h-full 1xxl:w-[calc(((100vw-896px)/2)-8px)] 1xxl:max-w-xs 1xxl:blur-[2px] 1xxl:opacity-50 1xxl:hover:blur-none 1xxl:hover:opacity-100 duration-200',
      )}
    >
      <div
        className={cn(
          'flex flex-col gap-4 w-full',
          '1xxl:sticky 1xxl:top-[calc(10vh)] 1xxl:pt-14 1xxl:pl-4 1xxl:pr-8',
        )}
      >
        <span className="hidden font-headline text-lg leading-tight 1xxl:block">
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
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  hash={toc.id}
                  preload={false}
                  resetScroll={false}
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
            to="/blog/$slug"
            params={{ slug: post.slug }}
            hash="_top_"
            preload={false}
            resetScroll={false}
            className="link hidden 1xxl:inline ml-1 text-sm w-min"
          >
            ↑ Back to top
          </Link>
        </div>
      </div>
    </div>
  );
}
