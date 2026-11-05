import { Link } from '@tanstack/react-router';
import { useHover } from '@uidotdev/usehooks';

import type { ThumbnailProps } from '@/types/post';

import { Chip } from '@/components/posts/chip';
import { ThumbnailDisplay } from '@/components/posts/thumbnail-display';
import { useThumbTransition } from '@/hooks/use-thumb-transition';

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
  const { thumbStyle, markThumb } = useThumbTransition(slug, 'blog');

  return (
    <Link
      to="/$contentType/$slug"
      params={{
        contentType: 'blog',
        slug,
      }}
      className="group/hit transition-[scale] duration-160 ease-out active:scale-98"
      onClick={markThumb}
      aria-label={title}
    >
      <article
        className="group relative
        grid w-full grid-cols-1 gap-y-2
        rounded-cxl bg-xbg p-5 transition-[scale,background-color,box-shadow] duration-200 ease-out sm:grid sm:min-h-[198px] sm:grid-cols-[auto_1fr] sm:gap-0 sm:p-0 sm:group-hover/hit:scale-99
        sm:group-hover/hit:bg-xarrow sm:group-hover/hit:shadow-2xs lg:grid-cols-[1fr_auto_1fr]"
        ref={ref}
        {...rest}
      >
        <div className="absolute top-0 z-10 hidden -translate-y-1/2 flex-row flex-wrap gap-x-2 gap-y-1 sm:left-8 sm:flex sm:-translate-y-2/5 lg:hidden">
          {tags.map((tag) => (
            <Chip
              label={tag}
              key={tag}
              className="transition-colors duration-200 group-hover:bg-xblue group-hover:text-white"
            />
          ))}
        </div>

        <header className="contents sm:flex sm:w-full sm:flex-col sm:justify-center sm:gap-3 sm:py-8 sm:pr-12 sm:pl-9">
          <h1 className="mt-1 text-left font-title text-lg leading-[1.25] font-semibold text-pretty sm:mt-0 sm:text-base sm:leading-[1.2] lg:line-clamp-4 lg:text-xl">
            {title}
          </h1>
          <div className="line-clamp-2 text-sm leading-[1.5] text-xghoststroke sm:line-clamp-4 sm:leading-normal sm:text-inherit lg:hidden">
            {description}
          </div>
          <div className="-order-1 flex flex-row-reverse items-center justify-end gap-2 sm:order-none sm:flex-row sm:justify-start">
            <time className="block text-xs font-bold sm:font-normal lg:text-sm" dateTime={date}>
              {date}
            </time>
            {tags.map((tag) => (
              <Chip label={tag} key={tag} className="sm:hidden" />
            ))}
          </div>
        </header>

        {!!Thumbnail && (
          <div className="relative order-first -mx-5 -mt-5 mb-3 flex justify-center pt-6 before:absolute before:inset-x-0 before:top-0 before:bottom-[66px] before:rounded-t-cxl before:bg-xyellow/25 sm:contents sm:before:hidden">
            <ThumbnailDisplay
              Thumbnail={Thumbnail}
              isHover={isHover}
              withOrnaments
              loading="lazy"
              style={thumbStyle}
              className="m-0 size-[132px] sm:m-auto sm:size-[198px]"
            />
          </div>
        )}

        <div className="hidden flex-col justify-center gap-3 p-9 pl-14 lg:flex">
          <div className="line-clamp-4 text-base">{description}</div>
          <div className="flex flex-row flex-wrap gap-x-2 gap-y-1">
            {tags.map((tag) => (
              <Chip
                label={tag}
                key={tag}
                className="transition-colors duration-200 group-hover:bg-xblue group-hover:text-white"
              />
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
}
