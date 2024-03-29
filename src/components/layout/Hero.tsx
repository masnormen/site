/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */

import Link from "next/link";

import cn from "@/lib/cn";

type HeroProps =
  | Record<string, never>
  | {
      title: string;
      href: string;
    };

function Hero({ title, href }: HeroProps) {
  return (
    <header
      className={cn(
        "relative flex w-full flex-col items-center justify-center overflow-hidden bg-background",
        title ? "h-fit px-4 py-28" : "h-screen",
      )}
    >
      <div
        className={cn(
          "absolute flex h-full w-full items-center justify-center",
          title && title.length > 0 && "bg-background opacity-90 blur-sm",
          !title && "drop-shadow-[5px_5px_1px_var(--theme-highlight)]",
        )}
      >
        {/* Green Rectangle */}
        <div className="animate-slowspin-30 filter-noisy absolute z-0 flex aspect-square h-3/6 max-h-[75vw] bg-tertiary opacity-100 md:h-4/6" />

        {/* Pink Rectangle */}
        <div className="animate-slowspin filter-noisy absolute z-0 flex aspect-square h-3/6 max-h-[75vw] bg-secondary md:h-4/6" />

        {/* Yellowish Rectangle */}
        <div className="animate-slowspin-60 filter-noisy absolute z-0 flex aspect-square h-3/6 max-h-[75vw] bg-quaternary md:h-4/6" />

        {/* Circle */}
        <div className="animate-slowspin-rev bg-pattern-wavy filter-noisy absolute z-0 flex aspect-square h-3/6 max-h-[75vw] items-center justify-center rounded-full bg-background shadow-sm md:h-[70%]">
          <svg
            viewBox="0 0 100 100"
            className="aspect-square h-[80%] cursor-default font-mono text-[0.42rem] font-bold uppercase text-stroke opacity-25"
          >
            <defs>
              <path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
            </defs>
            <text fill="currentColor" fillOpacity={0.9}>
              <textPath xlinkHref="#circle">Lorem ipsum dolor sit amet consectetur adipiscing elit !</textPath>
            </text>
          </svg>
        </div>
      </div>

      {/* Image Portrait */}
      {!title && (
        <picture className="pointer-events-none absolute bottom-0 z-10 flex h-screen w-full select-none items-end justify-center">
          <source
            className="filter-noisier ml-1 h-[63%] w-fit select-none object-contain drop-shadow-2xl md:ml-2 md:h-4/6"
            srcSet="/noindex/portrait.webp"
            type="image/webp"
          />
          <img
            className="filter-noisier ml-1 h-[63%] w-fit select-none object-contain drop-shadow-2xl md:ml-2 md:h-4/6"
            alt="Portrait of Me"
            src="/noindex/portrait.png"
          />
        </picture>
      )}

      {/* Title text */}

      {title ? (
        <Link href={href} className="shadow-xs z-30 max-w-screen-lg py-4 text-center duration-300">
          <h1 className="inline decoration-clone text-center font-headline text-4xl tracking-wide text-stroke drop-shadow-xl sm:text-6xl sm:!leading-[1.3] md:p-4">
            {title}
          </h1>
        </Link>
      ) : (
        <Link href="/" className="z-30 max-w-screen-lg">
          <div className="shadow-xs text-center drop-shadow-md duration-300 md:hover:-rotate-6">
            <h1 className="group flex flex-col items-center text-center font-headline  text-[12vw] !leading-[1.4] tracking-wide text-stroke drop-shadow-[5px_5px_0px_var(--theme-tertiary)] transition-all hover:drop-shadow-[5px_5px_0px_var(--theme-highlight)] sm:text-7xl sm:!leading-[1.25]">
              <div className="filter-gooey z-10 w-fit bg-quaternary px-4 py-1 transition-all group-hover:tracking-[0.1em]">
                Nourman
              </div>
              <div className="filter-gooey z-0 -mt-5 w-fit bg-quaternary px-5 pb-2 pt-2 transition-all group-hover:tracking-[0.1em]">
                Hajar
              </div>
            </h1>
          </div>
        </Link>
      )}

      {!title && (
        <>
          {/* Software Engineer text */}
          <div className="absolute left-1/2 top-1/4 z-20 flex -translate-x-1/2 -translate-y-3/4 flex-col items-center justify-center text-center md:top-[80%] md:-translate-x-64 md:-translate-y-28">
            <div className="mt-2 rotate-[-2deg] drop-shadow-[4px_4px_0px_var(--theme-tertiary)] duration-300 hover:drop-shadow-[4px_4px_0px_var(--theme-highlight)] md:hover:rotate-[5deg]">
              <h2 className="filter-gooey inline cursor-default rounded bg-stroke decoration-clone px-3 pb-3 pt-2 text-center font-mono text-2xl text-highlight md:text-[1.4rem]">
                software_
                <br />
                engineer();
              </h2>
            </div>
          </div>

          {/* Indonesia text */}
          <div className="absolute right-1/2 top-3/4 z-20 flex -translate-y-3/4 translate-x-1/2 flex-col items-center justify-center text-center md:-translate-y-16 md:translate-x-72">
            <div className="mt-2 rotate-6 drop-shadow-[4px_4px_0px_var(--theme-tertiary)] duration-300 hover:drop-shadow-[4px_4px_0px_var(--theme-highlight)] md:rotate-6 md:hover:-rotate-6">
              <h2 className="filter-gooey cursor-default whitespace-nowrap rounded bg-blank px-4 py-2 text-center text-lg text-stroke">
                based in <span className="font-medium">ID</span> 🇮🇩
              </h2>
            </div>
          </div>
        </>
      )}
    </header>
  );
}

export default Hero;
