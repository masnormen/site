import { getRouteApi, Link } from '@tanstack/react-router';
import { useHover } from '@uidotdev/usehooks';
import dayjs from 'dayjs';
import { useAtom, useSetAtom } from 'jotai';
import { use, useEffect } from 'react';

import portrait from '@/assets/img/portrait.webp';
import { ornamentTransitionTypeAtom, readingTimeMsAtom, thumbTransitionSlugAtom } from '@/atoms/index';
import { SlimArrow } from '@/components/assets/shapes/lines';
import { CrossShape, FloralShape } from '@/components/assets/shapes/ornaments';
import { Section } from '@/components/layouts/section';
import { Chip } from '@/components/posts/chip';
import { ThumbnailDisplay } from '@/components/posts/thumbnail-display';
import { loadPost } from '@/utils/post-modules';
import { postTransitionName } from '@/utils/posts';

const postRoute = getRouteApi('/$contentType/$slug');

export function PostHeader() {
  const [ref, isHover] = useHover<HTMLDivElement>();

  const content = postRoute.useLoaderData();
  const { contentType, slug } = postRoute.useParams();
  const Thumbnail = use(loadPost(contentType, slug))?.Thumbnail ?? null;

  const [readingTimeMs] = useAtom(readingTimeMsAtom);

  const setThumbTransitionSlug = useSetAtom(thumbTransitionSlugAtom);
  useEffect(() => setThumbTransitionSlug(slug), [slug, setThumbTransitionSlug]);
  const setOrnamentType = useSetAtom(ornamentTransitionTypeAtom);
  useEffect(() => setOrnamentType(contentType), [contentType, setOrnamentType]);

  return (
    <Section
      className="border-b-0 pt-16 !pb-0 sm:pt-32"
      after={
        <div className="absolute top-0 right-[calc(64px+198px+16px)] z-0 hidden h-full border-l-1 border-dashed border-xline min-[1205px]:right-[calc(71px+198px+16px)] lg:block" />
      }
    >
      <div
        className="relative z-10 flex w-full flex-col-reverse gap-4 md:grid md:grid-cols-2 md:gap-8 lg:grid-cols-[1fr_auto]"
        ref={ref}
      >
        <Link
          to="/$contentType/$slug"
          params={{ contentType, slug }}
          className="group/hit w-full transition-[scale] duration-160 ease-out active:scale-98"
        >
          <article
            className="group relative
            flex h-full w-full items-center justify-center gap-2 rounded-cxl py-3 transition-[scale,background-color,box-shadow] duration-200 ease-out
            sm:bg-xbg sm:p-6 sm:py-6
            sm:group-hover/hit:scale-99 sm:group-hover/hit:bg-xarrow sm:group-hover/hit:shadow-2xs"
          >
            <h1 className="text-center font-title text-xl leading-[1.2] font-semibold text-balance transition-colors duration-200 group-hover:text-xred md:line-clamp-6 lg:text-2xl">
              {content.title}
            </h1>
          </article>
        </Link>

        {!!Thumbnail && (
          <div className="relative">
            <SlimArrow className="animate-sticker-in flip absolute top-0 left-1/2 hidden -translate-x-[100%] -translate-y-[85%] -scale-x-100 rotate-[-60deg] text-xarrow select-none [--i:2] [animation-name:sticker-fade-in] md:block" />
            <span className="animate-sticker-in absolute top-0 left-1/2 hidden -translate-x-[100%] -translate-y-[350%] text-center text-xs whitespace-nowrap text-xghoststroke/50 italic select-none [--i:3] [animation-name:sticker-fade-in] md:block">
              psshh. try hovering the thumbnail!
            </span>
            <ThumbnailDisplay
              Thumbnail={Thumbnail}
              isHover={isHover}
              className="size-full sm:size-full lg:size-[198px]"
              style={{ viewTransitionName: postTransitionName(slug, 'thumb') }}
            />
          </div>
        )}

        <div
          data-magnet
          className="animate-sticker-in absolute top-0 left-0 size-12 -translate-x-1/2 -translate-y-1/2 select-none [--i:0] sm:size-16 md:size-22"
          style={contentType === 'blog' ? { viewTransitionName: 'ornament-blog' } : undefined}
        >
          <FloralShape
            className="h-full w-full rotate-[12deg] text-xyellow transition-transform hover:scale-120 hover:rotate-[-20deg]"
            aria-hidden="true"
          />
        </div>

        <div
          data-magnet
          className="animate-sticker-in absolute right-0 bottom-0 hidden size-12 translate-x-1/3 translate-y-1/3 select-none [--i:1] sm:block sm:size-16 md:size-18"
          style={contentType === 'projects' ? { viewTransitionName: 'ornament-projects' } : undefined}
        >
          <CrossShape
            className="h-full w-full -rotate-[12deg] text-xpink transition-transform hover:scale-120 hover:rotate-[20deg]"
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="group/hit relative z-10">
        <article
          className="group relative z-10 flex
          h-full w-full flex-col items-center justify-between gap-2 rounded-cxl transition-[scale,background-color,box-shadow] duration-200 ease-out sm:mt-4 sm:pt-4.5 sm:pb-4
          md:mt-8 md:flex-row md:bg-xbg md:px-6
          md:group-hover/hit:scale-99 md:group-hover/hit:bg-xarrow md:group-hover/hit:shadow-2xs"
        >
          <p className="text-sm leading-[1] font-medium sm:text-base">
            <CrossShape
              className="animate-sticker-in mr-4 hidden size-6 rotate-[20deg] text-xyellow transition-transform [--i:4] hover:scale-120 hover:rotate-[-20deg] md:inline-flex!"
              aria-hidden="true"
            />
            <span className="font-semibold">{dayjs(content.createdAt).format('DD MMM YYYY')}</span> ・{' '}
            {dayjs.duration(readingTimeMs || 0, 'ms').format('m [mins]')} read ・{' '}
            <span className="hidden lg:inline!">by</span>{' '}
            <img
              src={portrait}
              className="relative mx-1 inline-flex aspect-square size-8 rounded-full shadow-lg"
              draggable="false"
              loading="lazy"
              alt="My portrait"
            />{' '}
            <span className="hidden font-semibold lg:inline!">Nourman Hajar</span>
          </p>

          <div className="flex flex-row flex-wrap gap-x-2 gap-y-1">
            {content.tags?.map((tag) => (
              <Link
                key={tag}
                to="/tags/$tag"
                params={{ tag: tag.toLowerCase() }}
                className="rounded-[10px] transition-[scale] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105 active:scale-97"
              >
                <Chip label={tag} className="transition-colors duration-300 hover:bg-xblue hover:text-white" />
              </Link>
            ))}
          </div>
        </article>
      </div>
    </Section>
  );
}
