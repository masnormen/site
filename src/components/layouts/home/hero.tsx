import { Link } from '@tanstack/react-router';
import { cn } from '@/utils/cn';

export function Hero({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <header
      className={cn(
        '@container relative flex h-[584px] flex-col items-center justify-center transition-transform mx-auto border-x-1 border-b-1 border-dashed border-xline w-[calc(100dvw-64px)] sm:w-[80dvw] max-w-oxl px-5',
        className,
      )}
    >
      {children ?? (
        <>
          <span className="text-lg xl:text-xl text-center text-xghoststroke">
            Hello, I'm
          </span>
          <Link
            to="/"
            className="mt-1 text-7xl xl:text-8xl text-xstroke hover:text-xyellow font-serif italic leading-[1] xl:leading-[1.25] transition-colors"
          >
            <h1 className="text-center">Nourman Hajar</h1>
          </Link>
          <span className="mt-6 text-sm sm:text-lg xl:text-xl max-w-[500px] text-center">
            Dedicated{' '}
            <span className="font-semibold text-xblue/90">
              Software Engineer
            </span>{' '}
            you can count on. I help companies, clients, and founders craft a
            scalable web solution for their brands and products.
          </span>
        </>
      )}

      <img
        src="/assets/images/floral-yellow-blue.png"
        className="absolute size-[80px] sm:size-[18cqw] xl:size-[220px] -translate-y-[220px] sm:left-0 sm:-translate-x-1/2 sm:-translate-y-[100px] rotate-[14deg] hover:rotate-[0deg] hover:scale-80 transition-transform select-none"
        draggable="false"
      />
      <img
        src="/assets/images/x-pink-blue.png"
        className="absolute size-[50px] sm:size-[15cqw] xl:size-[170px] translate-y-[220px] sm:right-0 sm:translate-x-1/2 sm:translate-y-[100px] rotate-[-18deg] hover:rotate-[0deg] hover:scale-80 transition-transform select-none"
        draggable="false"
      />
      <div className="hidden sm:block absolute left-0 -translate-x-1/2 translate-y-[120px] rotate-[-7deg]">
        <div className="filter-gooey mt-2 rotate-[-2deg] drop-shadow-[4px_4px_0px_var(--color-xyellow)] duration-300 hover:rotate-[15deg] hover:drop-shadow-[4px_4px_0px_var(--color-xblue)] text-center">
          <h2 className="inline rounded-2xl bg-xyellow box-decoration-clone px-3 pt-2 pb-3 font-mono text-[2cqw] xl:text-[1.25rem] text-xblue leading-[1.5] drop-shadow-none select-none">
            software_
            <br />
            engineer();
          </h2>
        </div>
      </div>
      <div className="hidden sm:block absolute right-0 translate-x-1/2 -translate-y-[120px] rotate-[-7deg]">
        <div className="filter-gooey hover:rotate-12 mt-2 duration-300 drop-shadow-[4px_4px_0px_var(--color-xyellow)] hover:drop-shadow-[4px_4px_0px_var(--color-xyellow)] text-center">
          <h2 className="inline whitespace-nowrap rounded-2xl bg-xstroke px-4 py-2 text-center font-title font-light text-[2cqw] xl:text-[1.25rem] text-xyellow drop-shadow-none select-none">
            based in{' '}
            <span className="rounded-md tracking-tighter bg-gray-200 px-1 font-mono text-[0.9em] uppercase font-bold text-xblue">
              IDN
            </span>{' '}
            🇮🇩
          </h2>
        </div>
      </div>
    </header>
  );
}
