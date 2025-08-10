import { Link } from '@tanstack/react-router';

export function Hero() {
  return (
    <header className="@container relative flex h-[584px] flex-col items-center justify-center transition-transform mx-auto border-x-1 border-b-1 border-dashed border-xline w-[calc(100dvw-64px)] sm:w-[80dvw] max-w-oxl px-5">
      <span className="text-lg xl:text-xl text-center">Hello, I'm</span>
      <Link
        to="/"
        className="mt-2 text-7xl xl:text-8xl text-xblue hover:text-xyellow hover:text-shadow-xblue font-serif leading-[1] xl:leading-[1.25] transition-colors"
      >
        <h1 className="text-center">Nourman Hajar</h1>
      </Link>
      <span className="mt-5 xl:mt-3 text-sm sm:text-lg xl:text-xl max-w-[500px] text-center">
        Dedicated <b>Software Engineer</b> you can count on. I help companies,
        clients, and founders craft a scalable web solution for their brands and
        products.
      </span>

      <img
        src="/assets/images/floral-yellow-blue.png"
        className="absolute size-[80px] sm:size-[18cqw] xl:size-[220px] -translate-y-[220px] sm:left-0 sm:-translate-x-1/2 sm:-translate-y-[100px] rotate-[14deg] hover:rotate-[340deg] transition-transform select-none"
        draggable="false"
        alt="Floral decoration"
      />
      <img
        src="/assets/images/x-pink-blue.png"
        className="absolute size-[50px] sm:size-[15cqw] xl:size-[190px] translate-y-[220px] sm:right-0 sm:translate-x-1/2 sm:translate-y-[100px] rotate-[-18deg] hover:rotate-[-345deg] transition-transform select-none"
        draggable="false"
        alt="Floral decoration"
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
        <div className="filter-gooey hover:rotate-12 mt-2 duration-300 drop-shadow-[4px_4px_0px_var(--color-xyellow)] hover:drop-shadow-[4px_4px_0px_var(--color-xblue)] text-center">
          <h2 className="inline whitespace-nowrap rounded-2xl bg-xghostwhite px-4 py-2 text-center font-title font-light text-[2cqw] xl:text-[1.25rem] text-xyellow drop-shadow-none select-none">
            based in{' '}
            <span className="rounded-lg bg-gray-200 px-1 py-0.5 font-medium font-mono text-[90%] text-stroke">
              IDN
            </span>{' '}
            🇮🇩
          </h2>
        </div>
      </div>
    </header>
  );
}
