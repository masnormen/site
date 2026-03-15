import { Link } from '@tanstack/react-router';

import { Hero } from '@/components/layouts/home/hero';
import { Navbar } from '@/components/layouts/navbar';

export function NotFoundComponent() {
  return (
    <Hero className="!min-h-screen border-b-0">
      <Navbar />

      <Link to="/">
        <div className="absolute top-[70%] right-1/2 z-20 flex translate-x-1/2 -translate-y-2/3 flex-col items-center justify-center text-center xs:top-3/4 @3xl:translate-x-72 @3xl:-translate-y-8">
          <div className="mt-2 rotate-6 drop-shadow-[4px_4px_0px_var(--color-xblue)] duration-300 hover:drop-shadow-[4px_4px_0px_var(--color-xyellow)] @3xl:rotate-6">
            <h2 className="inline rounded-2xl bg-xred px-4 py-2 text-center text-[min(5cqw,1.25rem)] font-light whitespace-nowrap text-xghostwhite">
              ← go 🏠home?
            </h2>
          </div>
        </div>
      </Link>

      <div className="static text-center drop-shadow-md duration-300">
        <h1 className="relative isolate flex flex-col items-center text-center text-[min(24cqw,7.5rem)] font-bold tracking-wide text-stroke">
          <span className="z-20 inline w-fit rounded-xl px-4 pt-2 pb-1 font-mono leading-[1.25] transition-all">
            404
          </span>
          <span className="z-20 inline font-serif text-[1rem]">not found :(</span>
        </h1>
      </div>
    </Hero>
  );
}
