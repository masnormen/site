import { cn } from '@/utils/cn';
import { Link } from '@tanstack/react-router';

export interface ArticleCardProps {
  Thumbnail: React.FC | null;
  title: string;
  description?: string;
  date?: string;
  tags?: string[];
  href: string;
  className?: string;
  dir: 'ltr' | 'rtl';
}

export function ArticleCard({
  Thumbnail,
  title,
  description,
  date,
  className,
  dir = 'ltr',
  tags = [],
  href,
  ...rest
}: ArticleCardProps) {
  return (
    <article
      className={cn(
        'group/card relative flex w-full flex-col overflow-hidden bg-stroke sm:border-2 sm:border-dashed sm:border-secondary sm:hover:border-highlight sm:rounded-xl duration-200',
        dir === 'ltr' ? 'sm:flex-row' : 'sm:flex-row-reverse',
        className,
      )}
      {...rest}
    >
      {/* {typeof Thumbnail === 'string' && (
        <img
          src={Thumbnail}
          alt={title}
          className={cn(
            'pointer-events-none aspect-3/2 object-cover duration-200 sm:w-55/100',
            dir === 'ltr' ? 'sm:rounded-l-xl' : 'sm:rounded-r-xl',
          )}
          style={{
            transform: 'translateZ(0)',
          }}
        />
      )} */}
      {typeof Thumbnail === 'function' && (
        <div
          className={cn(
            'block relative aspect-3/2! sm:w-55/100! w-full border-2 sm:border-t-0 sm:border-b-0 border-secondary group-hover/card:border-highlight border-dashed rounded-xl duration-200',
            dir === 'ltr'
              ? 'sm:rounded-l-xl sm:border-l-0 sm:rounded-r-none'
              : 'sm:rounded-r-xl sm:border-r-0 sm:rounded-l-none',
          )}
        >
          <Thumbnail />
        </div>
      )}

      <Link
        to={href}
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
            <div className="flex flex-wrap space-x-3">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="h-fit w-fit text-[10px] rounded-md border border-dashed border-stroke bg-tertiary px-2 py-1 font-bold font-mono text-stroke uppercase leading-none duration-200 group-hover:bg-highlight group-hover:text-background transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="font-bold text-xs font-mono uppercase text-highlight">See More &gt;&gt;</div>
          </div>
        )}
      </Link>
    </article>
  );
}
