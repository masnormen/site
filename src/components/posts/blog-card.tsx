import { Link } from '@tanstack/react-router';
import { useHover } from '@uidotdev/usehooks';
import { HourGlassishShape } from '@/components/assets/random-shape';
import { Chip } from '@/components/posts/chip';
import type { ThumbnailProps } from '@/types/post';

export interface BlogCardProps {
  type: 'blog' | 'projects';
  Thumbnail: React.FC<ThumbnailProps> | null;
  title: string;
  description?: string;
  date?: string;
  tags?: string[];
  slug: string;
  className?: string;
  nth?: number;
}

export function BlogCard({
  type,
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
        contentType: type,
        slug,
      }}
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

        <header className="flex flex-col py-8 sm:pl-9 sm:pr-12 justify-center gap-2 sm:gap-3">
          <h1 className="font-title font-semibold text-left text-base lg:text-xl leading-[1.2] lg:line-clamp-4">
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

        {typeof Thumbnail === 'function' && (
          <div className="isolate relative flex m-auto aspect-square! w-[158px] h-[158px] sm:w-[198px] sm:h-[198px] mx-auto group-hover:scale-105 transition-all duration-400">
            <HourGlassishShape className="z-0 absolute translate-y-[3%] rotate-[65deg] w-full h-auto text-xblue pointer-events-none group-hover:rotate-[-25deg] group-hover:text-xyellow transition-all duration-400" />
            <Thumbnail
              isHover={isHover}
              className="z-10 block relative aspect-square! border border-xbg rounded-cxl group-hover:shadow-lg"
            />
          </div>
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
