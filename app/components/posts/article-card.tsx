import { cn } from '@/utils/cn';
import { Link } from '@tanstack/react-router';

export interface ArticleCardProps {
  thumbnail: string | React.ReactNode;
  title: string;
  date?: string;
  tags?: string[];
  href: string;
  className?: string;
  dir: 'ltr' | 'rtl';
}

export function ArticleCard({
  thumbnail,
  title,
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
        'relative flex w-full flex-col overflow-hidden bg-stroke sm:border-2 sm:border-dashed sm:border-secondary sm:rounded-xl',
        dir === 'ltr' ? 'sm:flex-row' : 'sm:flex-row-reverse',
        className,
      )}
      {...rest}
    >
      {typeof thumbnail === 'string' ? (
        <img
          src={thumbnail}
          alt={title}
          className={cn(
            'pointer-events-none aspect-[3/2] object-cover duration-500 sm:w-1/2',
            dir === 'ltr' ? 'sm:rounded-l-xl' : 'sm:rounded-r-xl',
          )}
          style={{
            transform: 'translateZ(0)',
          }}
        />
      ) : (
        thumbnail
      )}

      {/* Post metadata */}
      <div
        className={cn(
          'z-10 flex w-full flex-1 flex-col justify-end pt-5 sm:pt-0 sm:pb-6 text-stroke sm:px-6',
          className,
        )}
      >
        {date && <div className="font-bold font-mono text-sm">{date}</div>}

        {/* Title */}
        <h2 className="mt-1 font-bold font-headline text-2xl tracking-wide sm:line-clamp-3 md:line-clamp-none">
          <Link to={href}>{title}</Link>
        </h2>

        {/* Summary */}
        {/* {summary && summary.length > 0 && <div className="line-clamp-3 text-sm">{summary.substring(0, 200)}</div>} */}

        {/* Tags & Date */}
        {tags.length > 0 && (
          <div className="mt-3 flex flex-wrap space-x-3">
            {tags.map((tag) => (
              <span
                key={tag}
                className="h-fit w-fit text-[10px] rounded-lg border border-dashed border-stroke bg-tertiary px-2 py-1 font-bold font-mono text-stroke uppercase leading-none duration-200"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
