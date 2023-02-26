import Link from "next/link";

interface ArticleCardProps {
  thumbnail: string;
  title: string;
  summary?: string;
  date?: string;
  tags?: string[];
  href: string;
}

function ArticleCard({ thumbnail, title, summary, date, tags = [], href, ...rest }: ArticleCardProps) {
  return (
    <Link href={href}>
      <article
        className="group relative flex h-72 w-full flex-col overflow-hidden rounded-md border border-stroke shadow-md duration-200 hover:border-highlight hover:shadow-2xl hover:shadow-secondary md:hover:scale-[1.02]"
        {...rest}
      >
        {/* Thumbnail image */}
        <div
          className="filter-noisy absolute h-full w-full rounded-md bg-cover duration-500 group-hover:scale-110 bg-center"
          style={{
            backgroundImage: `url(${thumbnail})`,
          }}
        />

        <div className="z-10 flex flex-1 w-full flex-col justify-end space-y-4 bg-gradient-to-br from-[rgba(30,30,30,0.7)] to-[rgba(184,141,142,0.6)] p-8">
          {/* Title */}
          <h2 className="font-bold text-white line-clamp-2 md:text-2xl">{title}</h2>

          {/* Summary */}
          {summary && summary.length > 0 && (
            <div className="text-xs text-white line-clamp-2 md:text-sm">{summary.substring(0, 150)}</div>
          )}

          {/* Tags & Date */}
          <div className="!mt-6 flex flex-row justify-between">
            {tags.length > 0 && (
              <div className="flex flex-wrap space-x-3 text-xs">
                {tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="h-fit w-fit rounded-md bg-tertiary px-2 py-1 font-bold text-stroke uppercase leading-4"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            {date && <div className="text-sm text-white">{date}</div>}
          </div>
        </div>
      </article>
    </Link>
  );
}

export default ArticleCard;
