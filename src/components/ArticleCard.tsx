/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";

import cn from "@/lib/cn";

interface ArticleCardProps {
  thumbnail: string;
  title: string;
  summary?: string;
  date?: string;
  tags?: string[];
  href: string;
  className?: string;
}

function ArticleCard({ thumbnail, title, summary, date, className, tags = [], href, ...rest }: ArticleCardProps) {
  return (
    <Link href={href}>
      <article
        className="group relative flex w-full flex-col overflow-hidden rounded-xl border border-stroke bg-stroke drop-shadow-[4px_4px_0px_var(--theme-tertiary)] transition-all duration-200 hover:border-highlight hover:shadow-secondary hover:drop-shadow-[4px_4px_0px_var(--theme-highlight)] md:border md:hover:scale-[1.05]"
        {...rest}
      >
        {/* Thumbnail image */}
        {thumbnail.includes("www.notion.so") ? (
          <Image
            src={thumbnail}
            width={400}
            height={225}
            alt={title}
            className="pointer-events-none aspect-video w-full rounded-t-xl object-cover duration-500 md:group-hover:!scale-[1.05]"
            style={{
              transform: "translateZ(0)",
            }}
          />
        ) : (
          <img
            src={thumbnail}
            alt={title}
            className="pointer-events-none aspect-video w-full rounded-t-xl object-cover duration-500 md:group-hover:!scale-110"
            style={{
              transform: "translateZ(0)",
            }}
          />
        )}

        {/* Post metadata */}
        <div
          className={cn(
            "z-10 flex w-full flex-1 flex-col justify-end space-y-3 border-t border-stroke p-5 text-stroke duration-500 group-hover:border-highlight",
            className
          )}
        >
          {/* Title */}
          <h2 className="line-clamp-2 font-mono font-bold tracking-[-0.08em] md:text-lg">{title}</h2>

          {/* Summary */}
          {summary && summary.length > 0 && <div className="line-clamp-3 text-sm">{summary.substring(0, 200)}</div>}

          {/* Tags & Date */}
          <div className="flex h-8 flex-row items-center">
            {tags.length > 0 && (
              <div className="flex flex-wrap space-x-3 text-xs">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="h-fit w-fit rounded-2xl border border-stroke bg-tertiary px-2 pb-1.5 pt-2 font-mono font-bold uppercase leading-none text-stroke duration-200 group-hover:bg-stroke group-hover:text-background"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            {date && <div className="ml-auto font-mono text-sm font-bold">{date}</div>}
          </div>
        </div>
      </article>
    </Link>
  );
}

export default ArticleCard;
