import { getRouteApi, Link } from '@tanstack/react-router';
import { useHover } from '@uidotdev/usehooks';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { useAtom } from 'jotai';
import { useMemo } from 'react';
import { readingTimeMsAtom } from '@/atoms/index';
import { SlimArrow } from '@/components/assets/shapes/lines';
import { Section } from '@/components/layouts/section';
import { Chip } from '@/components/posts/chip';
import { ThumbnailDisplay } from '@/components/posts/thumbnail-display';
import { getMDXExport } from '@/utils/posts';

dayjs.extend(duration);

const postRoute = getRouteApi('/$contentType/$slug');

export function PostHeader() {
  const [ref, isHover] = useHover<HTMLDivElement>();

  const content = postRoute.useLoaderData();

  const Thumbnail = useMemo(
    () => getMDXExport(content.code).Thumbnail ?? null,
    [content],
  );

  const [readingTimeMs] = useAtom(readingTimeMsAtom);

  return (
    <Section
      className="pt-16 sm:pt-32 !pb-0 border-b-0"
      after={
        <div className="hidden lg:block absolute z-0 top-0 right-[calc(64px+198px+16px)] min-[1205px]:right-[calc(71px+198px+16px)] h-full border-l-1 border-dashed border-xline" />
      }
    >
      <div
        className="z-10 relative flex flex-col-reverse md:grid md:grid-cols-2 lg:grid-cols-[1fr_auto] w-full gap-4 md:gap-8"
        ref={ref}
      >
        <Link
          to="/$contentType/$slug"
          params={{
            contentType: 'blog',
            slug: content.slug,
          }}
          className="active:scale-98 transition-transform duration-300 w-full"
        >
          <article
            className="group relative
            flex w-full h-full items-center justify-center gap-2 py-3 sm:py-6 sm:p-6
            sm:bg-xbg sm:hover:bg-xarrow sm:hover:scale-99 sm:hover:shadow-2xs
            transition-all duration-400 rounded-cxl"
          >
            <h1 className="font-title font-semibold text-center text-balance text-xl lg:text-2xl leading-[1.2] md:line-clamp-6 group-hover:text-xred transition-colors duration-400">
              {content.title}
            </h1>
          </article>
        </Link>

        {!!Thumbnail && (
          <div className="relative">
            <SlimArrow className="hidden md:block absolute top-0 left-1/2 -translate-y-[85%] -translate-x-[100%] text-xarrow flip -scale-x-100 rotate-[-60deg] select-none" />
            <span className="hidden md:block absolute whitespace-nowrap top-0 left-1/2 -translate-y-[350%] -translate-x-[100%] text-xghoststroke/50 italic text-xs select-none text-center">
              psshh. try hovering the thumbnail!
            </span>
            <ThumbnailDisplay
              Thumbnail={Thumbnail}
              isHover={isHover}
              className="size-full sm:size-full lg:size-[198px]"
            />
          </div>
        )}

        <div className="absolute left-0 top-0 size-12 sm:size-16 md:size-22 -translate-x-1/2 -translate-y-1/2 select-none">
          <img
            src="/assets/images/floral-yellow-blue.png"
            className="w-full h-full rotate-[12deg] hover:rotate-[-20deg] hover:scale-120 transition-transform"
            draggable="false"
          />
        </div>

        <div className="hidden sm:block absolute right-0 bottom-0 size-12 sm:size-16 md:size-18 translate-x-1/3 translate-y-1/3 select-none">
          <img
            src="/assets/images/x-pink-blue.png"
            className="w-full h-full -rotate-[12deg] hover:rotate-[20deg] hover:scale-120 transition-transform"
            draggable="false"
          />
        </div>
      </div>

      <article
        className="group relative sm:mt-4 md:mt-8
          flex flex-col md:flex-row z-10 w-full h-full items-center justify-between gap-2 md:px-6 sm:pt-4.5 sm:pb-4
          md:bg-xbg md:hover:bg-xarrow md:hover:scale-99 md:hover:shadow-2xs
          transition-all duration-400 rounded-cxl"
      >
        <p className="text-sm sm:text-base font-medium leading-[1]">
          <img
            src="/assets/images/x-yellow-blue.png"
            className="hidden md:inline-flex! size-6 rotate-[20deg] hover:rotate-[-20deg] hover:scale-120 transition-transform mr-4"
            draggable="false"
          />
          <span className="font-semibold">
            {dayjs(content.createdAt).format('DD MMM YYYY')}
          </span>{' '}
          ・ {dayjs.duration(readingTimeMs || 0, 'ms').format('m [mins]')} read
          ・ <span className="hidden lg:inline!">by</span>{' '}
          <img
            src="/assets/images/portrait.webp"
            className="inline-flex size-8 aspect-square relative rounded-full shadow-lg mx-1"
            draggable="false"
          />{' '}
          <span className="hidden lg:inline! font-semibold">Nourman Hajar</span>
        </p>

        <div className="flex flex-row flex-wrap gap-x-2 gap-y-1">
          {content.tags?.map((tag) => (
            <Chip
              label={tag}
              key={tag}
              className="group-hover:bg-xblue group-hover:text-white transition-colors duration-400"
            />
          ))}
        </div>
      </article>
    </Section>
  );
}
