import type { ThumbnailProps } from '@/types/post';
import { cn } from '@/utils/cn';
import { Link } from '@tanstack/react-router';
import { useHover } from '@uidotdev/usehooks';

export interface ArticleCardProps {
  type: 'blog' | 'projects';
  Thumbnail: React.FC<ThumbnailProps> | null;
  title: string;
  description?: string;
  date?: string;
  tags?: string[];
  slug: string;
  className?: string;
  dir: 'ltr' | 'rtl';
}

export function ArticleCard({
  type,
  Thumbnail,
  title,
  description,
  date,
  className,
  dir = 'ltr',
  tags = [],
  slug,
  ...rest
}: ArticleCardProps) {
  const [ref, isHover] = useHover<HTMLDivElement>();

  return (
    <article
      ref={ref}
      className={cn(
        'group/card relative flex w-full flex-col overflow-hidden bg-stroke sm:border-2 sm:border-dashed sm:border-secondary sm:hover:border-highlight sm:rounded-xl duration-200',
        dir === 'ltr' ? 'sm:flex-row' : 'sm:flex-row-reverse',
        className,
      )}
      {...rest}
    >
      {typeof Thumbnail === 'function' && (
        <div
          className={cn(
            'block relative aspect-3/2! sm:w-50/100! w-full border-secondary box-content group-hover/card:border-highlight border-dashed duration-200',
            dir === 'ltr' ? 'sm:border-r-2' : 'sm:border-l-2',
          )}
        >
          <Thumbnail isHover={isHover} />
        </div>
      )}

      <Link
        to="/$contentType/$slug"
        reloadDocument
        params={{
          contentType: type,
          slug,
        }}
        className={cn(
          'group z-10 flex w-full flex-1 flex-col justify-end pt-5 sm:pb-8 text-stroke sm:px-6 bg-background hover:bg-quaternary transition-colors duration-200',
          className,
        )}
      >
        {date && <div className="text-sm">{date}</div>}

        <h2 className="mt-2 font-bold font-headline text-2xl tracking-wide sm:line-clamp-2 md:line-clamp-none group-hover:text-highlight transition-colors duration-200">
          {title}
        </h2>

        {description && description.trim().length > 0 && (
          <div className="mt-4 line-clamp-3 text-sm">{description}</div>
        )}

        {tags.length > 0 && (
          <div className="mt-5 flex flex-row items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="h-fit w-fit text-[10px] rounded-md border border-dashed border-stroke bg-tertiary px-2 py-1 font-bold font-mono text-stroke uppercase leading-none duration-200 group-hover:bg-highlight group-hover:text-background transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="font-bold text-xs font-mono uppercase text-highlight">
              See More &gt;&gt;
            </div>
          </div>
        )}
      </Link>
    </article>
  );
}
