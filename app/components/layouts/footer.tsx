import { Link } from '@tanstack/react-router';
import type { CSSProperties } from 'react';

export function Footer() {
  return (
    <footer className="@container flex flex-col items-center justify-center text-center filter-noisy relative bg-tertiary px-6 py-12 text-stroke md:px-4 border-t-2 border-dashed border-quaternary overflow-hidden">
      <Link
        to="/"
        className="text-center w-full max-w-4xl inline-flex flex-row pb-8 items-center justify-center font-bold font-headline text-[min(16cqw,104px)] [text-shadow:var(--theme-secondary)_4px_4px] hover:[text-shadow:var(--theme-highlight)_8px_8px] transition-[text-shadow] duration-500"
      >
        .n
        <span className="relative -mb-[0.3em] mx-[0.05em]">
          <span className="absolute top-0 left-1/2 translate-y-[-0.5em] -translate-x-1/2 text-transparent [text-shadow:none]">
            o
          </span>
          <svg
            aria-hidden
            viewBox="0 0 100 100"
            style={{ '--spin-speed': '10s' } as CSSProperties}
            className="flex aspect-square h-[1.3ch] animate-spin-clockwise font-mono text-blank [text-shadow:var(--theme-highlight)_1px_1px] select-none"
          >
            <defs>
              <path
                id="circle"
                d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
              />
            </defs>
            <text fill="currentColor">
              <textPath xlinkHref="#circle" className="text-[1rem]">
                NOURMAN·COM·NOURMAN·COM·
              </textPath>
            </text>
          </svg>
          <div
            aria-hidden
            className="absolute top-0 left-0 h-full w-full flex font-mono items-center justify-center text-center text-[0.14em] text-stroke select-none"
          >
            ©{new Date().getFullYear()}
          </div>
        </span>
        urmanhjr
      </Link>
    </footer>
  );
}
