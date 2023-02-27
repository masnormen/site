import { CodeBracketIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useSticky } from "react-use-sticky";

import cn from "../lib/cn";

function NavigationBar() {
  const [navRef, isSticky] = useSticky<HTMLDivElement>();

  return (
    <nav
      ref={navRef}
      className={cn(
        "top-0 z-50 flex w-full flex-col items-center justify-center bg-opacity-30 backdrop-blur-[7px] duration-500 md:sticky",
        isSticky ? "bg-background" : "bg-notwhite"
      )}
    >
      <div className="flex h-full w-full max-w-screen-md flex-col items-stretch justify-between space-y-2 px-6 py-4 md:flex-row md:space-y-0 md:px-0">
        <div className="flex flex-row justify-center rounded-2xl border border-stroke bg-notwhite shadow-lg duration-500 hover:shadow-secondary">
          <Link
            href="/"
            className="flex rounded-2xl py-3 px-4 text-sm font-semibold uppercase text-stroke duration-500 hover:bg-stroke hover:text-background"
          >
            nourman.com
          </Link>
        </div>

        <div className="flex flex-row justify-center rounded-2xl border border-stroke bg-secondary shadow-lg duration-500 hover:shadow-secondary md:absolute md:left-1/2 md:-translate-x-1/2">
          <Link
            href="/"
            className="flex rounded-2xl py-3 px-4 text-sm font-semibold uppercase text-stroke duration-500 hover:bg-stroke hover:text-background"
          >
            About
          </Link>
          <Link
            href="/"
            className="flex rounded-2xl py-3 px-4 text-sm font-semibold uppercase text-stroke duration-500 hover:bg-stroke hover:text-background"
          >
            Blog
          </Link>
          <Link
            href="/"
            className="flex rounded-2xl py-3 px-4 text-sm font-semibold uppercase text-stroke duration-500 hover:bg-stroke hover:text-background"
          >
            Works
          </Link>
        </div>

        <div className="flex flex-row justify-center rounded-2xl border border-stroke bg-tertiary shadow-lg duration-500 hover:shadow-secondary">
          <Link
            href="https://github.com/masnormen"
            className="flex items-center justify-center rounded-2xl stroke-stroke py-3 px-4 text-sm font-semibold uppercase text-stroke duration-500 hover:bg-stroke hover:stroke-background hover:text-background"
          >
            GitHub <CodeBracketIcon className="ml-2 h-[1em] stroke-1" />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;
