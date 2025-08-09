import { Link } from '@tanstack/react-router';
import { Navbar } from '@/components/layouts/navbar';
import { cn } from '@/utils/cn';
import type { CSSProperties } from 'react';

export function CustomErrorComponent() {
  return (
    <>
      <Navbar alwaysVisible />
      <main className="@container relative flex w-full h-full flex-col items-center justify-center overflow-hidden transition-transform bg-background px-4 supports-dvh:h-dvh min-h-screen supports-[height:100dvh]:min-h-dvh md:px-8">
        <CirclingStars />

        <LoremIpsumText
          style={
            {
              '--spin-speed': '60s',
            } as CSSProperties
          }
          className="h-[460px] aspect-square animate-spin-clockwise text-[3.1px]"
          text="404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404"
        />
        <LoremIpsumText
          className="h-[520px] aspect-square animate-spin-counterclockwise text-[2.9px] opacity-80"
          text="404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404"
        />
        <LoremIpsumText
          className="h-[583px] aspect-square animate-spin-counterclockwise text-[2.6px] opacity-60"
          text="40404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404"
        />
        <LoremIpsumText
          className="h-[640px] aspect-square animate-spin-counterclockwise text-[2.4px] opacity-40"
          text="40404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404"
        />
        <LoremIpsumText
          className="h-[700px] aspect-square animate-spin-counterclockwise text-[2.2px] opacity-25"
          text="40404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404"
        />

        <div className="absolute top-[31%] left-1/2 -translate-x-1/2 -translate-y-3/4 xs:top-1/4 @3xl:top-[50%] @3xl:-translate-x-72 @3xl:-translate-y-64 z-20 flex flex-col items-center justify-center text-center">
          <div className="mt-2 rotate-[-2deg] drop-shadow-[4px_4px_0px_var(--theme-tertiary)] duration-300 @3xl:hover:rotate-[5deg] hover:drop-shadow-[4px_4px_0px_var(--theme-highlight)]">
            <h2 className="filter-gooey inline rounded-2xl bg-secondary box-decoration-clone px-3 pt-2 pb-3 text-center font-headline text-[min(5cqw,1.25rem)] text-stroke leading-[1.5] drop-shadow-none hover:drop-shadow-none">
              bugs everywhere, eh?
            </h2>
          </div>
        </div>

        <Link to="/">
          <div className="absolute top-[70%] right-1/2 translate-x-1/2 -translate-y-2/3 xs:top-3/4 @3xl:translate-x-72 @3xl:-translate-y-8 z-20 flex flex-col items-center justify-center text-center">
            <div className="mt-2 @3xl:rotate-6 rotate-6 drop-shadow-[4px_4px_0px_var(--theme-tertiary)] duration-300 hover:drop-shadow-[4px_4px_0px_var(--theme-highlight)]">
              <h2 className="filter-gooey inline whitespace-nowrap rounded-2xl bg-blank px-4 py-2 text-center font-headline font-light text-[min(5cqw,1.25rem)] text-highlight">
                ← go 🏠home?
              </h2>
            </div>
          </div>
        </Link>

        <div className="static text-center shadow-2xs drop-shadow-md duration-300">
          <h1 className="relative isolate flex flex-col items-center text-center font-mono font-bold text-[min(24cqw,7.5rem)] text-stroke tracking-wide">
            <span className="z-20 inline w-fit rounded-xl px-4 pt-2 pb-1 leading-[1.25] transition-all">
              Error happened
            </span>
            <span className="z-20 inline text-[1rem]">
              Sorry, we got error! :(
            </span>
          </h1>
        </div>
      </main>
    </>
  );
}

const CirclingStars = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 800 800"
      opacity="0.3"
      style={
        {
          '--spin-speed': '30s',
        } as CSSProperties
      }
      className="absolute h-[615px] aspect-square animate-spin-clockwise rounded-full text-stroke"
    >
      <defs>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="vvvortex-grad">
          <stop stopColor="currentColor" stopOpacity={1} offset="0%" />
          <stop stopColor="currentColor" stopOpacity={1} offset="100%" />
        </linearGradient>
      </defs>
      <g stroke="url(#vvvortex-grad)" fill="none" strokeLinecap="round">
        <circle
          r={374}
          cx={400}
          cy={400}
          strokeWidth={4}
          strokeDasharray="52 54"
          strokeDashoffset={25}
          transform="rotate(142, 400, 400)"
          opacity="0.2"
        />
        <circle
          r={357}
          cx={400}
          cy={400}
          strokeWidth={4}
          strokeDasharray="26 27"
          strokeDashoffset={25}
          transform="rotate(213, 400, 400)"
          opacity="0.25"
        />
        <circle
          r={340}
          cx={400}
          cy={400}
          strokeWidth={4}
          strokeDasharray="51 32"
          strokeDashoffset={25}
          transform="rotate(244, 400, 400)"
          opacity="0.3"
        />
        <circle
          r={323}
          cx={400}
          cy={400}
          strokeWidth={4}
          strokeDasharray="16 29"
          strokeDashoffset={25}
          transform="rotate(19, 400, 400)"
          opacity="0.35"
        />
        <circle
          r={306}
          cx={400}
          cy={400}
          strokeWidth={3}
          strokeDasharray="51 41"
          strokeDashoffset={25}
          transform="rotate(299, 400, 400)"
          opacity="0.4"
        />
        <circle
          r={289}
          cx={400}
          cy={400}
          strokeWidth={3}
          strokeDasharray="15 22"
          strokeDashoffset={25}
          transform="rotate(309, 400, 400)"
          opacity="0.45"
        />
        <circle
          r={272}
          cx={400}
          cy={400}
          strokeWidth={3}
          strokeDasharray="24 12"
          strokeDashoffset={25}
          transform="rotate(35, 400, 400)"
          opacity="0.5"
        />
        <circle
          r={255}
          cx={400}
          cy={400}
          strokeWidth={3}
          strokeDasharray="10 17"
          strokeDashoffset={25}
          transform="rotate(182, 400, 400)"
          opacity="0.55"
        />
        <circle
          r={238}
          cx={400}
          cy={400}
          strokeWidth={3}
          strokeDasharray="44 21"
          strokeDashoffset={25}
          transform="rotate(172, 400, 400)"
          opacity="0.6"
        />
        <circle
          r={221}
          cx={400}
          cy={400}
          strokeWidth={3}
          strokeDasharray="41 55"
          strokeDashoffset={25}
          transform="rotate(173, 400, 400)"
          opacity="0.65"
        />
        <circle
          r={204}
          cx={400}
          cy={400}
          strokeWidth={3}
          strokeDasharray="38 13"
          strokeDashoffset={25}
          transform="rotate(192, 400, 400)"
          opacity="0.7"
        />
        <circle
          r={187}
          cx={400}
          cy={400}
          strokeWidth={3}
          strokeDasharray="16 53"
          strokeDashoffset={25}
          transform="rotate(226, 400, 400)"
          opacity="0.75"
        />
        <circle
          r={170}
          cx={400}
          cy={400}
          strokeWidth={3}
          strokeDasharray="40 38"
          strokeDashoffset={25}
          transform="rotate(46, 400, 400)"
          opacity="0.8"
        />
        <circle
          r={153}
          cx={400}
          cy={400}
          strokeWidth={3}
          strokeDasharray="41 50"
          strokeDashoffset={25}
          transform="rotate(176, 400, 400)"
          opacity="0.84"
        />
        <circle
          r={136}
          cx={400}
          cy={400}
          strokeWidth={3}
          strokeDasharray="51 29"
          strokeDashoffset={25}
          transform="rotate(259, 400, 400)"
          opacity="0.86"
        />
        <circle
          r={119}
          cx={400}
          cy={400}
          strokeWidth={3}
          strokeDasharray="25 31"
          strokeDashoffset={25}
          transform="rotate(104, 400, 400)"
          opacity="0.88"
        />
        <circle
          r={102}
          cx={400}
          cy={400}
          strokeWidth={2}
          strokeDasharray="41 46"
          strokeDashoffset={25}
          transform="rotate(35, 400, 400)"
          opacity="0.90"
        />
        <circle
          r={85}
          cx={400}
          cy={400}
          strokeWidth={2}
          strokeDasharray="12 48"
          strokeDashoffset={25}
          transform="rotate(340, 400, 400)"
          opacity="0.92"
        />
        <circle
          r={68}
          cx={400}
          cy={400}
          strokeWidth={2}
          strokeDasharray="19 54"
          strokeDashoffset={25}
          transform="rotate(291, 400, 400)"
          opacity="0.94"
        />
        <circle
          r={51}
          cx={400}
          cy={400}
          strokeWidth={2}
          strokeDasharray="20 42"
          strokeDashoffset={25}
          transform="rotate(299, 400, 400)"
          opacity="0.96"
        />
        <circle
          r={34}
          cx={400}
          cy={400}
          strokeWidth={2}
          strokeDasharray="46 14"
          strokeDashoffset={25}
          transform="rotate(86, 400, 400)"
          opacity="0.98"
        />
        <circle
          r={17}
          cx={400}
          cy={400}
          strokeWidth={2}
          strokeDasharray="17 38"
          strokeDashoffset={25}
          transform="rotate(325, 400, 400)"
          opacity={1.0}
        />
      </g>
    </svg>
  );
};

const LoremIpsumText = ({
  text,
  className,
  ...props
}: { text: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        'absolute aspect-square cursor-text font-bold font-mono text-stroke uppercase leading-none',
        className,
      )}
      {...props}
    >
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 100 100"
        className="h-full w-full text-[1em]"
      >
        <defs>
          <path
            id="circle"
            d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
          />
        </defs>
        <text fill="currentColor" fillOpacity="1">
          <textPath xlinkHref="#circle">{text}</textPath>
        </text>
      </svg>
    </div>
  );
};
