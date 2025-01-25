import type { Post } from '@/types/post';
import { cn } from '@/utils/cn';
import { Fragment } from 'react/jsx-runtime';

export function TableOfContents({
  post,
}: { post: Pick<Post, 'metadata' | 'toc'> }) {
  return (
    <div className="pointer-events-none top-12 block h-full w-full justify-start duration-500 xl:absolute xl:mt-0! xl:flex xl:px-0">
      <div className="pointer-events-auto sticky top-24 z-40 flex h-fit w-full flex-col space-y-2 rounded-lg xl:p-4 text-sm text-stroke duration-300 xl:max-h-[75vh] xl:w-[calc(((100vw-768px)/2)-4rem)] xl:max-w-xs xl:-translate-x-[calc(100%+2rem)] xl:overflow-y-auto xl:blur-[1px] xl:opacity-50 xl:hover:blur-none xl:hover:opacity-100">
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
  );
}
