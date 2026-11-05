import { Link } from '@tanstack/react-router';

import { KawungShape } from '@/components/assets/shapes/misc';
import { CrossShape, FloralShape } from '@/components/assets/shapes/ornaments';
import { cn } from '@/utils/cn';

export function Hero({ children, className }: { children?: React.ReactNode; className?: string }) {
  return (
    <header
      className={cn(
        '@container relative isolate mx-auto flex h-[584px] w-[calc(100dvw-32px)] max-w-oxl flex-col items-center justify-center border-x-1 border-b-1 border-dashed border-xline px-5 sm:w-[80dvw]',
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none" aria-hidden="true">
        <KawungShape className="absolute top-full left-1/2 size-[min(520px,92cqw)] -translate-x-1/2 -translate-y-2/5 text-xyellow opacity-75 [--kawung-stroke:var(--color-xblue)] motion-safe:animate-[spin-clockwise_30s_linear_infinite]" />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-xblank/0 to-xblank/90 [mask-image:linear-gradient(to_top,black_40%,transparent)] backdrop-blur-[6px] reduced-transparency:to-xblank reduced-transparency:backdrop-blur-none" />
      </div>

      {children ?? (
        <div className="flex flex-col items-center sm:-translate-y-16">
          <span className="text-center text-lg text-xghoststroke xl:text-xl">Hello, I'm</span>
          <Link
            to="/"
            className="mt-1 font-serif text-7xl leading-[1] text-xstroke italic transition-colors hover:text-xyellow xl:text-8xl xl:leading-[1.25]"
          >
            <h1 className="text-center">Nourman Hajar</h1>
          </Link>
          <span className="mt-6 max-w-[520px] text-center text-sm sm:text-lg xl:text-xl">
            Dedicated <span className="font-semibold text-xblue/90">Software Engineer</span> you can count on. I help
            startups, enterprises, and institutions craft scalable, well-designed products that are a joy to use and
            just as good under the hood.
          </span>
        </div>
      )}

      <FloralShape
        className="animate-sticker-in absolute size-[72px] -translate-x-[120px] -translate-y-[215px] rotate-[14deg] text-xyellow transition-transform select-none [--i:0] hover:scale-80 hover:rotate-[0deg] sm:left-0 sm:size-[18cqw] sm:-translate-x-1/2 sm:-translate-y-[100px] xl:size-[220px]"
        aria-hidden="true"
      />
      <CrossShape
        className="animate-sticker-in absolute size-[52px] translate-x-[125px] -translate-y-[200px] rotate-[-18deg] text-xpink transition-transform select-none [--i:3] hover:scale-80 hover:rotate-[0deg] sm:right-0 sm:size-[15cqw] sm:translate-x-1/2 sm:translate-y-[100px] xl:size-[170px]"
        aria-hidden="true"
      />
      <div className="animate-sticker-in absolute left-4 translate-y-[192px] rotate-[-7deg] [--i:1] sm:left-0 sm:-translate-x-1/2 sm:translate-y-[120px]">
        <div className="filter-gooey mt-2 rotate-[-2deg] text-center drop-shadow-[4px_4px_0px_var(--color-xyellow)] duration-300 hover:rotate-[15deg] hover:drop-shadow-[4px_4px_0px_var(--color-xblue)]">
          <h2 className="inline rounded-2xl bg-xyellow box-decoration-clone px-3 pt-2 pb-3 font-mono text-sm leading-[1.5] text-xblue drop-shadow-none select-none sm:text-[2cqw] xl:text-[1.25rem]">
            software_
            <br />
            engineer();
          </h2>
        </div>
      </div>
      <div className="animate-sticker-in absolute right-4 translate-y-[222px] rotate-[-7deg] [--i:2] sm:right-0 sm:translate-x-1/2 sm:-translate-y-[120px]">
        <div className="filter-gooey mt-2 text-center drop-shadow-[4px_4px_0px_var(--color-xyellow)] duration-300 hover:rotate-12 hover:drop-shadow-[4px_4px_0px_var(--color-xyellow)]">
          <h2 className="inline rounded-2xl bg-xstroke px-4 py-2 text-center font-title text-sm font-light whitespace-nowrap text-xyellow drop-shadow-none select-none sm:text-[2cqw] xl:text-[1.25rem]">
            based in{' '}
            <span className="rounded-md bg-gray-200 px-1 font-mono text-[0.9em] font-bold tracking-tighter text-xblue uppercase">
              IDN
            </span>{' '}
            🇮🇩
          </h2>
        </div>
      </div>
    </header>
  );
}
