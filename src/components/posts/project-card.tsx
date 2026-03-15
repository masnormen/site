import { Icon } from '@iconify/react';
import { Link } from '@tanstack/react-router';

import type { ThumbnailProps } from '@/types/post';

import { CircleComplete, CircleIncomplete } from '@/components/assets/shapes/circles';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/utils/cn';

const ProjectButton = ({ href, children, ...rest }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a
    href={href}
    className="group bg-xghostwhite hover:bg-xarrow rounded-br-cxl rounded-bl-cxl sm:rounded-tr-cxl font-title flex h-full w-full items-center justify-center gap-2 px-9 py-4 text-sm font-semibold whitespace-nowrap transition-all duration-400 hover:-translate-x-0.5 hover:scale-98 active:scale-95 sm:flex-col sm:items-start sm:gap-1 sm:rounded-bl-none sm:py-0"
    {...rest}
  >
    {children}
  </a>
);

const TechStack = ({ tag }: { tag: string }) => {
  const TechStackIcon = () => {
    if (tag === 'js') {
      return <Icon key={tag} icon="proicons:javascript" className="text-xl text-[#d3be1f]" />;
    }
    if (tag === 'ts') {
      return <Icon key={tag} icon="proicons:typescript" className="text-xl text-[#3178c6]" />;
    }
    if (tag === 'react') {
      return <Icon key={tag} icon="mdi:react" className="text-xl text-[#00a9cf]" />;
    }
    if (tag === 'lib') {
      return <Icon key={tag} icon="material-icon-theme:npm" className="text-xred text-xl" />;
    }
    if (tag === 'app') {
      return <Icon key={tag} icon="tdesign:app" className="text-xred text-lg" />;
    }
    if (tag === 'node') {
      return <Icon key={tag} icon="logos:nodejs-icon" className="text-xgreen text-lg" />;
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
        'group/card @container relative flex flex-col-reverse gap-6 sm:gap-4 lg:gap-6',
        nth % 2 === 0 ? 'lg:flex-row-reverse' : 'lg:flex-row',
        className,
      )}
    >
      <div
        className={cn('grid grid-rows-[1fr_auto] items-center justify-center sm:grid-cols-[2fr_1fr] sm:grid-rows-1')}
      >
        <Link
          to="/$contentType/$slug"
          params={{
            contentType: 'projects',
            slug,
          }}
          className="transition-transform duration-300 active:scale-98"
          aria-label={title}
        >
          <header
            className="group bg-xbg
            sm:hover:bg-xarrow rounded-tl-cxl rounded-tr-cxl
            sm:rounded-bl-cxl
            relative flex items-center gap-2
            transition-all duration-400 sm:min-h-[198px] sm:rounded-tr-none sm:hover:scale-99 sm:hover:shadow-2xs"
            {...rest}
          >
            <div className="flex h-full flex-col justify-center gap-2 p-6 sm:py-8 sm:pr-12 sm:pl-9">
              <div className="flex flex-row gap-1.5">
                {tags.map((tag, idx) => (
                  <TechStack key={idx} tag={tag} />
                ))}
              </div>
              <h1 className="font-title text-left text-base leading-[1.2] font-semibold text-pretty lg:line-clamp-4 lg:text-xl">
                {title}
              </h1>
              <div className="line-clamp-3 text-sm leading-[1.25] lg:text-base">{description}</div>
            </div>
          </header>
        </Link>

        <div className="grid h-full grid-cols-2 gap-2 sm:grid-cols-1 sm:grid-rows-2">
          {links.slice(0, 2).map((link, idx) => {
            const kind = (() => {
              if (link?.includes('https://github.com/')) return 'GitHub';
              if (link?.includes('https://www.npmjs.com/')) return 'npm';
              return 'Visit';
            })();

            return (
              <ProjectButton key={idx} href={link} target="_blank" rel="noopener noreferrer">
                <div className="relative hidden sm:block">
                  {kind === 'GitHub' && (
                    <>
                      <Icon
                        icon="mdi:github"
                        className="text-xstroke absolute top-0 left-0 translate-x-[25%] translate-y-[35%] text-[22px]"
                      />
                      <CircleComplete className="text-xblue group-hover:text-xpink transition-all duration-400 group-hover:-translate-y-0.5 group-hover:rotate-180" />
                    </>
                  )}
                  {kind === 'npm' && (
                    <>
                      <Icon
                        icon="material-icon-theme:npm"
                        className="text-xred absolute top-0 left-0 translate-x-[35%] translate-y-[40%] text-[22px]"
                      />
                      <CircleIncomplete className="text-xpink group-hover:text-xcyan -rotate-180 transition-all duration-400 group-hover:rotate-0" />
                    </>
                  )}
                  {kind === 'Visit' && (
                    <>
                      <Icon
                        icon="lucide:globe"
                        className="text-xblue absolute top-0 left-0 translate-x-[35%] translate-y-[40%] text-[22px]"
                      />
                      <CircleIncomplete className="text-xyellow group-hover:text-xred transition-all duration-400 group-hover:rotate-180" />
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
            'group relative left-0 z-10 mx-auto flex aspect-16/10 w-full justify-between sm:h-[180px] lg:mx-0 lg:h-[200px] lg:w-auto lg:justify-start',
            nth % 2 === 0 ? 'flex-row' : 'flex-row-reverse',
          )}
          aria-label={title}
        >
          <div className="hidden h-full w-full items-center justify-center sm:flex">
            {nth % 2 === 0 ? (
              <img
                src="/assets/images/floral-pink-blue.png"
                className="block size-[20cqw] rotate-[18deg] transition-transform group-hover:rotate-[-25deg] lg:hidden"
                draggable="false"
                loading="lazy"
                alt=""
              />
            ) : (
              <img
                src="/assets/images/floral-yellow-blue.png"
                className="block size-[20cqw] rotate-[-18deg] transition-transform group-hover:rotate-[25deg] lg:hidden"
                draggable="false"
                loading="lazy"
                alt=""
              />
            )}
          </div>

          <div className="relative aspect-16/10 h-full w-auto">
            <img
              src={Thumbnail}
              className="bg-xghostwhite border-xbg rounded-cxl relative z-10 block aspect-16/10 h-full w-auto border object-cover object-center transition-transform duration-400 sm:group-hover:shadow-lg sm:group-hover/card:scale-102"
              loading="lazy"
              alt={title}
            />
            <div className="bg-xbg rounded-cxl sm:group-hover/card:bg-xyellow absolute inset-0 aspect-16/10 h-full w-auto rotate-6 transition-all duration-400 sm:group-hover/card:-rotate-12" />
            <div className="bg-xpink rounded-cxl absolute inset-0 aspect-16/10 h-full w-auto -rotate-6 transition-transform duration-400 sm:group-hover/card:rotate-6" />
          </div>
        </Link>
      )}
    </article>
  );
}
