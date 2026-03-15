import { Link } from '@tanstack/react-router';
import { useHover } from '@uidotdev/usehooks';

import type { ThumbnailProps } from '@/types/post';

import { Chip } from '@/components/posts/chip';
import { ThumbnailDisplay } from '@/components/posts/thumbnail-display';

export interface BlogCardProps {
  Thumbnail: React.FC<ThumbnailProps> | string | null;
  title: string;
  description?: string;
  date?: string;
  tags?: string[];
  slug: string;
  className?: string;
  nth?: number;
}

export function BlogCard({
  Thumbnail,
  title,
  description,
  date,
  tags = [],
  slug,
  ...rest
}: Omit<BlogCardProps, 'nth' | 'className'>) {
  const [ref, isHover] = useHover<HTMLDivElement>();

  return (
    <Link
      to="/$contentType/$slug"
      params={{
        contentType: 'blog',
        slug,
      }}
      className="transition-transform duration-300 active:scale-98"
      aria-label={title}
    >
      <article
        className="group relative
        flex w-full flex-col-reverse items-center justify-center gap-2
        rounded-cxl transition-all duration-400 sm:grid sm:min-h-[198px] sm:grid-cols-[auto_1fr] sm:gap-0 sm:bg-xbg sm:hover:scale-99
        sm:hover:bg-xarrow sm:hover:shadow-2xs lg:grid-cols-[1fr_auto_1fr]"
        ref={ref}
        {...rest}
      >
        <div className="absolute top-0 z-10 flex -translate-y-1/2 flex-row flex-wrap gap-x-2 gap-y-1 sm:left-8 sm:-translate-y-2/5 lg:hidden">
          {tags.map((tag) => (
            <Chip
              label={tag}
              key={tag}
              className="transition-colors duration-400 group-hover:bg-xblue group-hover:text-white"
            />
          ))}
        </div>

        <header className="flex w-full flex-col justify-center gap-2 py-8 sm:gap-3 sm:pr-12 sm:pl-9">
          <h1 className="text-left font-title text-base leading-[1.2] font-semibold text-pretty lg:line-clamp-4 lg:text-xl">
            {title}
          </h1>
          <div className="line-clamp-4 text-sm lg:hidden">{description}</div>
          <time className="block text-xs font-bold sm:font-normal lg:text-sm" dateTime={date}>
            {date}
          </time>
        </header>

        {!!Thumbnail && <ThumbnailDisplay Thumbnail={Thumbnail} isHover={isHover} withOrnaments loading="lazy" />}

        <div className="hidden flex-col justify-center gap-3 p-9 pl-14 lg:flex">
          <div className="line-clamp-4 text-base">{description}</div>
          <div className="flex flex-row flex-wrap gap-x-2 gap-y-1">
            {tags.map((tag) => (
              <Chip
                label={tag}
                key={tag}
                className="transition-colors duration-400 group-hover:bg-xblue group-hover:text-white"
              />
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
}
