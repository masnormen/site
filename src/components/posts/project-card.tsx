import { Icon } from '@iconify/react';
import { Link } from '@tanstack/react-router';
import {
  CircleComplete,
  CircleIncomplete,
} from '@/components/assets/shapes/circles';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/utils/cn';
import type { ThumbnailProps } from '@/types/post';

const ProjectButton = ({
  href,
  children,
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a
    href={href}
    className="group flex sm:flex-col items-center sm:items-start justify-center gap-2 sm:gap-1 h-full w-full px-9 py-4 sm:py-0 bg-xghostwhite hover:bg-xarrow hover:scale-98 hover:-translate-x-0.5 rounded-br-cxl rounded-bl-cxl sm:rounded-bl-none sm:rounded-tr-cxl text-sm font-semibold font-title transition-all duration-400 active:scale-95 whitespace-nowrap"
    {...rest}
  >
    {children}
  </a>
);

const TechStack = ({ tag }: { tag: string }) => {
  const TechStackIcon = () => {
    if (tag === 'js') {
      return (
        <Icon
          key={tag}
          icon="proicons:javascript"
          className="text-[#d3be1f] text-xl"
        />
      );
    }
    if (tag === 'ts') {
      return (
        <Icon
          key={tag}
          icon="proicons:typescript"
          className="text-[#3178c6] text-xl"
        />
      );
    }
    if (tag === 'react') {
      return (
        <Icon key={tag} icon="mdi:react" className="text-[#00a9cf] text-xl" />
      );
    }
    if (tag === 'lib') {
      return (
        <Icon
          key={tag}
          icon="material-icon-theme:npm"
          className="text-xred text-xl"
        />
      );
    }
    if (tag === 'app') {
      return (
        <Icon key={tag} icon="tdesign:app" className="text-xred text-lg" />
      );
    }
    if (tag === 'node') {
      return (
        <Icon
          key={tag}
          icon="logos:nodejs-icon"
          className="text-xgreen text-lg"
        />
      );
    }
    return null;
  };

  const tooltipMap = {
    js: 'JavaScript',
    ts: 'TypeScript',
    react: 'React',
    lib: 'Available on NPM',
    app: 'Application/Website',
    node: 'Node.js',
  } as const;

  return (
    <Tooltip>
      <TooltipTrigger className="cursor-pointer" aria-label={tag}>
        <TechStackIcon />
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltipMap[tag as keyof typeof tooltipMap] || '🔥'}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export interface ProjectCardProps {
  Thumbnail: React.FC<ThumbnailProps> | string | null;
  title: string;
  description?: string;
  tags?: string[];
  slug: string;
  className?: string;
  nth?: number;
  links?: string[];
}

export function ProjectCard({
  Thumbnail,
  title,
  description,
  className,
  tags = [],
  slug,
  nth = 0,
  links = [],
  ...rest
}: ProjectCardProps) {
  return (
    <article
      className={cn(
        '@container group/card relative flex flex-col-reverse gap-6 sm:gap-4 lg:gap-6',
        nth % 2 === 0 ? 'lg:flex-row-reverse' : 'lg:flex-row',
      )}
    >
      <div
        className={cn(
          'grid grid-rows-[1fr_auto] sm:grid-rows-1 sm:grid-cols-[2fr_1fr] items-center justify-center',
        )}
      >
        <Link
          to="/$contentType/$slug"
          params={{
            contentType: 'projects',
            slug,
          }}
          className="active:scale-98 transition-transform duration-300"
          aria-label={title}
        >
          <header
            className="group relative
            flex items-center gap-2
            bg-xbg
            sm:min-h-[198px] sm:hover:bg-xarrow sm:hover:scale-99 sm:hover:shadow-2xs
            transition-all duration-400 rounded-tl-cxl rounded-tr-cxl sm:rounded-tr-none sm:rounded-bl-cxl"
            {...rest}
          >
            <div className="flex flex-col h-full p-6 sm:py-8 sm:pl-9 sm:pr-12 justify-center gap-2">
              <div className="flex flex-row gap-1.5">
                {tags.map((tag, idx) => (
                  <TechStack key={idx} tag={tag} />
                ))}
              </div>
              <h1 className="font-title font-semibold text-pretty text-left text-base lg:text-xl leading-[1.2] lg:line-clamp-4">
                {title}
              </h1>
              <div className="text-sm lg:text-base line-clamp-3 leading-[1.25]">
                {description}
              </div>
            </div>
          </header>
        </Link>

        <div className="grid grid-cols-2 sm:grid-cols-1 sm:grid-rows-2 h-full gap-2">
          {links.slice(0, 2).map((link, idx) => {
            const kind = (() => {
              if (link?.includes('https://github.com/')) return 'GitHub';
              if (link?.includes('https://www.npmjs.com/')) return 'npm';
              return 'Visit';
            })();

            return (
              <ProjectButton
                key={idx}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="hidden sm:block relative">
                  {kind === 'GitHub' && (
                    <>
                      <Icon
                        icon="mdi:github"
                        className="absolute top-0 left-0 translate-x-[25%] translate-y-[35%] text-xstroke text-[22px]"
                      />
                      <CircleComplete className="text-xblue group-hover:rotate-180 group-hover:-translate-y-0.5 group-hover:text-xpink transition-all duration-400" />
                    </>
                  )}
                  {kind === 'npm' && (
                    <>
                      <Icon
                        icon="material-icon-theme:npm"
                        className="absolute top-0 left-0 translate-x-[35%] translate-y-[40%] text-xred text-[22px]"
                      />
                      <CircleIncomplete className="text-xpink -rotate-180 group-hover:rotate-0 group-hover:text-xcyan transition-all duration-400" />
                    </>
                  )}
                  {kind === 'Visit' && (
                    <>
                      <Icon
                        icon="lucide:globe"
                        className="absolute top-0 left-0 translate-x-[35%] translate-y-[40%] text-xblue text-[22px]"
                      />
                      <CircleIncomplete className="text-xyellow group-hover:rotate-180 group-hover:text-xred transition-all duration-400" />
                    </>
                  )}
                </div>
                {kind} ↗
              </ProjectButton>
            );
          })}
        </div>
      </div>

      {typeof Thumbnail === 'string' && (
        <Link
          to="/$contentType/$slug"
          params={{
            contentType: 'projects',
            slug,
          }}
          className={cn(
            'group flex justify-between lg:justify-start mx-auto lg:mx-0 left-0 relative z-10 w-full sm:h-[180px] lg:w-auto lg:h-[200px] aspect-16/10',
            nth % 2 === 0 ? 'flex-row' : 'flex-row-reverse',
          )}
          aria-label={title}
        >
          <div className="hidden sm:flex items-center justify-center h-full w-full">
            {nth % 2 === 0 ? (
              <img
                src="/assets/images/floral-pink-blue.png"
                className="block lg:hidden size-[20cqw] rotate-[18deg] group-hover:rotate-[-25deg] transition-transform"
                draggable="false"
                loading="lazy"
                alt=""
              />
            ) : (
              <img
                src="/assets/images/floral-yellow-blue.png"
                className="block lg:hidden size-[20cqw] rotate-[-18deg] group-hover:rotate-[25deg] transition-transform"
                draggable="false"
                loading="lazy"
                alt=""
              />
            )}
          </div>

          <div className="relative aspect-16/10 h-full w-auto">
            <img
              src={Thumbnail}
              className="z-10 block relative aspect-16/10 h-full w-auto object-center object-cover bg-xghostwhite border border-xbg rounded-cxl sm:group-hover:shadow-lg sm:group-hover/card:scale-102 transition-transform duration-400"
              loading="lazy"
              alt={title}
            />
            <div className="absolute inset-0 aspect-16/10 w-auto h-full bg-xbg rounded-cxl rotate-6 sm:group-hover/card:-rotate-12 sm:group-hover/card:bg-xyellow transition-all duration-400" />
            <div className="absolute inset-0 aspect-16/10 w-auto h-full bg-xpink rounded-cxl -rotate-6 sm:group-hover/card:rotate-6 transition-transform duration-400" />
          </div>
        </Link>
      )}
    </article>
  );
}
