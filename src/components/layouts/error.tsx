import { Link } from '@tanstack/react-router';
import { Hero } from '@/components/layouts/home/hero';
import { Navbar } from '@/components/layouts/navbar';

export function CustomErrorComponent() {
  return (
    <Hero className="!min-h-screen border-b-0">
      <Navbar />

      <Link to="/">
        <div className="absolute top-[70%] right-1/2 translate-x-1/2 -translate-y-2/3 xs:top-3/4 @3xl:translate-x-72 @3xl:-translate-y-8 z-20 flex flex-col items-center justify-center text-center">
          <div className="mt-2 @3xl:rotate-6 rotate-6 drop-shadow-[4px_4px_0px_var(--color-xblue)] duration-300 hover:drop-shadow-[4px_4px_0px_var(--color-xyellow)]">
            <h2 className="inline whitespace-nowrap rounded-2xl bg-xred px-4 py-2 text-center font-light text-[min(5cqw,1.25rem)] text-xghostwhite">
              ← go 🏠home?
            </h2>
          </div>
        </div>
      </Link>

      <div className="static text-center drop-shadow-md duration-300">
        <h1 className="relative isolate flex flex-col items-center text-center font-bold text-[min(24cqw,7.5rem)] text-stroke tracking-wide">
          <span className="z-20 font-mono inline w-fit rounded-xl px-4 pt-2 pb-1 leading-[1.25] transition-all">
            500
          </span>
          <span className="z-20 inline text-[1rem] font-serif">
            error occurred :(
          </span>
        </h1>
      </div>
    </Hero>
  );
}
