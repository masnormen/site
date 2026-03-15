import { Link } from '@tanstack/react-router';

import { cn } from '@/utils/cn';

export function Hero({ children, className }: { children?: React.ReactNode; className?: string }) {
  return (
    <header
      className={cn(
        '@container relative mx-auto flex h-[584px] w-[calc(100dvw-64px)] max-w-oxl flex-col items-center justify-center border-x-1 border-b-1 border-dashed border-xline px-5 transition-transform sm:w-[80dvw]',
        className,
      )}
    >
      {children ?? (
        <>
          <span className="text-center text-lg text-xghoststroke xl:text-xl">Hello, I'm</span>
          <Link
            to="/"
            className="mt-1 font-serif text-7xl leading-[1] text-xstroke italic transition-colors hover:text-xyellow xl:text-8xl xl:leading-[1.25]"
          >
            <h1 className="text-center">Nourman Hajar</h1>
          </Link>
          <span className="mt-6 max-w-[500px] text-center text-sm sm:text-lg xl:text-xl">
            Dedicated <span className="font-semibold text-xblue/90">Software Engineer</span> you can count on. I help
            companies, clients, and founders craft a scalable web solution for their brands and products.
          </span>
        </>
      )}

      <img
        src="/assets/images/floral-yellow-blue.png"
        className="absolute size-[80px] -translate-y-[220px] rotate-[14deg] transition-transform select-none hover:scale-80 hover:rotate-[0deg] sm:left-0 sm:size-[18cqw] sm:-translate-x-1/2 sm:-translate-y-[100px] xl:size-[220px]"
        draggable="false"
        alt=""
      />
      <img
        src="/assets/images/x-pink-blue.png"
        className="absolute size-[50px] translate-y-[220px] rotate-[-18deg] transition-transform select-none hover:scale-80 hover:rotate-[0deg] sm:right-0 sm:size-[15cqw] sm:translate-x-1/2 sm:translate-y-[100px] xl:size-[170px]"
        draggable="false"
        alt=""
      />
      <div className="absolute left-0 hidden -translate-x-1/2 translate-y-[120px] rotate-[-7deg] sm:block">
        <div className="filter-gooey mt-2 rotate-[-2deg] text-center drop-shadow-[4px_4px_0px_var(--color-xyellow)] duration-300 hover:rotate-[15deg] hover:drop-shadow-[4px_4px_0px_var(--color-xblue)]">
          <h2 className="inline rounded-2xl bg-xyellow box-decoration-clone px-3 pt-2 pb-3 font-mono text-[2cqw] leading-[1.5] text-xblue drop-shadow-none select-none xl:text-[1.25rem]">
            software_
            <br />
            engineer();
          </h2>
        </div>
      </div>
      <div className="absolute right-0 hidden translate-x-1/2 -translate-y-[120px] rotate-[-7deg] sm:block">
        <div className="filter-gooey mt-2 text-center drop-shadow-[4px_4px_0px_var(--color-xyellow)] duration-300 hover:rotate-12 hover:drop-shadow-[4px_4px_0px_var(--color-xyellow)]">
          <h2 className="inline rounded-2xl bg-xstroke px-4 py-2 text-center font-title text-[2cqw] font-light whitespace-nowrap text-xyellow drop-shadow-none select-none xl:text-[1.25rem]">
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
