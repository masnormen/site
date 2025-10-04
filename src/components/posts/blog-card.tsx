import { Link } from '@tanstack/react-router';
import { useHover } from '@uidotdev/usehooks';
import { Chip } from '@/components/posts/chip';
import { ThumbnailDisplay } from '@/components/posts/thumbnail-display';
import type { ThumbnailProps } from '@/types/post';

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
  className,
  tags = [],
  slug,
  nth = 0,
  ...rest
}: BlogCardProps) {
  const [ref, isHover] = useHover<HTMLDivElement>();

  return (
    <Link
      to="/$contentType/$slug"
      params={{
        contentType: 'blog',
        slug,
      }}
      className="active:scale-98 transition-transform duration-300"
    >
      <article
        className="group relative
        flex flex-col-reverse w-full items-center justify-center gap-2
        sm:gap-0 sm:grid sm:grid-cols-[auto_1fr] lg:grid-cols-[1fr_auto_1fr] sm:min-h-[198px] sm:bg-xbg sm:hover:bg-xarrow sm:hover:scale-99 sm:hover:shadow-2xs
        transition-all duration-400 rounded-cxl"
        ref={ref}
        {...rest}
      >
        <div className="absolute top-0 sm:left-8 z-10 -translate-y-1/2 sm:-translate-y-2/5 flex lg:hidden flex-row flex-wrap gap-x-2 gap-y-1">
          {tags.map((tag) => (
            <Chip
              label={tag}
              key={tag}
              className="group-hover:bg-xblue group-hover:text-white transition-colors duration-400"
            />
          ))}
        </div>

        <header className="flex flex-col w-full py-8 sm:pl-9 sm:pr-12 justify-center gap-2 sm:gap-3">
          <h1 className="font-title font-semibold text-pretty text-left text-base lg:text-xl leading-[1.2] lg:line-clamp-4">
            {title}
          </h1>
          <div className="text-sm line-clamp-4 lg:hidden">{description}</div>
          <time
            className="block font-bold sm:font-normal text-xs lg:text-sm"
            dateTime={date}
          >
            {date}
          </time>
        </header>

        {!!Thumbnail && (
          <ThumbnailDisplay
            Thumbnail={Thumbnail}
            isHover={isHover}
            withOrnaments
            loading="lazy"
          />
        )}

        <div className="hidden lg:flex flex-col justify-center p-9 pl-14 gap-3">
          <div className="text-base line-clamp-4">{description}</div>
          <div className="flex flex-row flex-wrap gap-x-2 gap-y-1">
            {tags.map((tag) => (
              <Chip
                label={tag}
                key={tag}
                className="group-hover:bg-xblue group-hover:text-white transition-colors duration-400"
              />
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
}
