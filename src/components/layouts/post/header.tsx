import { getRouteApi, Link } from '@tanstack/react-router';
import { useHover } from '@uidotdev/usehooks';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { useAtom } from 'jotai';

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
  const Thumbnail = getMDXExport(content.code).Thumbnail ?? null;

  const [readingTimeMs] = useAtom(readingTimeMsAtom);

  return (
    <Section
      className="border-b-0 pt-16 !pb-0 sm:pt-32"
      after={
        <div className="border-xline absolute top-0 right-[calc(64px+198px+16px)] z-0 hidden h-full border-l-1 border-dashed min-[1205px]:right-[calc(71px+198px+16px)] lg:block" />
      }
    >
      <div
        className="relative z-10 flex w-full flex-col-reverse gap-4 md:grid md:grid-cols-2 md:gap-8 lg:grid-cols-[1fr_auto]"
        ref={ref}
      >
        <Link
          to="/$contentType/$slug"
          params={{
            contentType: 'blog',
            slug: content.slug,
          }}
          className="w-full transition-transform duration-300 active:scale-98"
        >
          <article
            className="group sm:bg-xbg
            sm:hover:bg-xarrow rounded-cxl relative flex h-full w-full items-center justify-center gap-2
            py-3 transition-all duration-400 sm:p-6
            sm:py-6 sm:hover:scale-99 sm:hover:shadow-2xs"
          >
            <h1 className="font-title group-hover:text-xred text-center text-xl leading-[1.2] font-semibold text-balance transition-colors duration-400 md:line-clamp-6 lg:text-2xl">
              {content.title}
            </h1>
          </article>
        </Link>

        {!!Thumbnail && (
          <div className="relative">
            <SlimArrow className="text-xarrow flip absolute top-0 left-1/2 hidden -translate-x-[100%] -translate-y-[85%] -scale-x-100 rotate-[-60deg] select-none md:block" />
            <span className="text-xghoststroke/50 absolute top-0 left-1/2 hidden -translate-x-[100%] -translate-y-[350%] text-center text-xs whitespace-nowrap italic select-none md:block">
              psshh. try hovering the thumbnail!
            </span>
            <ThumbnailDisplay
              Thumbnail={Thumbnail}
              isHover={isHover}
              className="size-full sm:size-full lg:size-[198px]"
            />
          </div>
        )}

        <div className="absolute top-0 left-0 size-12 -translate-x-1/2 -translate-y-1/2 select-none sm:size-16 md:size-22">
          <img
            src="/assets/images/floral-yellow-blue.png"
            className="h-full w-full rotate-[12deg] transition-transform hover:scale-120 hover:rotate-[-20deg]"
            draggable="false"
            loading="lazy"
            alt=""
          />
        </div>

        <div className="absolute right-0 bottom-0 hidden size-12 translate-x-1/3 translate-y-1/3 select-none sm:block sm:size-16 md:size-18">
          <img
            src="/assets/images/x-pink-blue.png"
            className="h-full w-full -rotate-[12deg] transition-transform hover:scale-120 hover:rotate-[20deg]"
            draggable="false"
            loading="lazy"
            alt=""
          />
        </div>
      </div>

      <article
        className="group md:bg-xbg md:hover:bg-xarrow rounded-cxl
          relative z-10 flex h-full w-full flex-col items-center justify-between gap-2 transition-all duration-400 sm:mt-4
          sm:pt-4.5 sm:pb-4 md:mt-8 md:flex-row
          md:px-6 md:hover:scale-99 md:hover:shadow-2xs"
      >
        <p className="text-sm leading-[1] font-medium sm:text-base">
          <img
            src="/assets/images/x-yellow-blue.png"
            className="mr-4 hidden size-6 rotate-[20deg] transition-transform hover:scale-120 hover:rotate-[-20deg] md:inline-flex!"
            draggable="false"
            loading="lazy"
            alt=""
          />
          <span className="font-semibold">{dayjs(content.createdAt).format('DD MMM YYYY')}</span> ・{' '}
          {dayjs.duration(readingTimeMs || 0, 'ms').format('m [mins]')} read ・{' '}
          <span className="hidden lg:inline!">by</span>{' '}
          <img
            src="/assets/images/portrait.webp"
            className="relative mx-1 inline-flex aspect-square size-8 rounded-full shadow-lg"
            draggable="false"
            loading="lazy"
            alt="My portrait"
          />{' '}
          <span className="hidden font-semibold lg:inline!">Nourman Hajar</span>
        </p>

        <div className="flex flex-row flex-wrap gap-x-2 gap-y-1">
          {content.tags?.map((tag) => (
            <Chip
              label={tag}
              key={tag}
              className="group-hover:bg-xblue transition-colors duration-400 group-hover:text-white"
            />
          ))}
        </div>
      </article>
    </Section>
  );
}
