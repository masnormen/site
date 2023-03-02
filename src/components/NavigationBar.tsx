import Link from "next/link";
import { useEffect, useState } from "react";
import { useSticky } from "react-use-sticky";

import useWindowSize from "@/hooks/useWindowSize";
import cn from "@/lib/cn";

import GitHubIcon from "./Icons/GitHubIcon";
import LinkedInIcon from "./Icons/LinkedInIcon";

interface NavigationItemProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  isNewTab?: boolean;
}

function NavigationItem({ href, className, children, isNewTab }: NavigationItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex rounded-2xl py-3 px-4 text-sm font-semibold uppercase text-stroke duration-500 hover:bg-stroke hover:text-background",
        className
      )}
      target={isNewTab ? "_blank" : "_self"}
      rel="noopener noreferrer"
    >
      {children}
    </Link>
  );
}

function NavigationBar() {
  const [navRef, isSticky] = useSticky<HTMLDivElement>();
  const [isMenuShown, setMenuShown] = useState(false);
  const { width } = useWindowSize();

  useEffect(() => {
    if (width > 768) {
      setMenuShown(true);
    }
  }, [width]);

  return (
    <nav
      ref={navRef}
      className={cn(
        "top-0 z-50 flex w-full flex-col items-center justify-center bg-opacity-30 backdrop-blur-[4px] duration-500 md:sticky",
        isSticky ? "bg-background" : "bg-blank"
      )}
    >
      <button
        type="button"
        onClick={() => setMenuShown(!isMenuShown)}
        className="my-4 flex cursor-pointer flex-row justify-center rounded-2xl border border-stroke bg-blank py-3 px-4 text-sm font-semibold uppercase text-stroke shadow-lg duration-500 hover:bg-stroke hover:text-background hover:shadow-secondary md:hidden"
      >
        Menu {isMenuShown ? "⬆️" : "⬇️"}
      </button>
      {isMenuShown && (
        <div className="flex h-full max-w-screen-md flex-col items-stretch justify-between space-y-2 px-6 py-4 md:w-full md:flex-row md:space-y-0 md:px-0">
          <div className="flex flex-row justify-center rounded-2xl border border-stroke bg-blank shadow-lg duration-500 hover:shadow-secondary">
            <NavigationItem href="/">nourman.com</NavigationItem>
          </div>

          <div className="flex flex-row justify-center rounded-2xl border border-stroke bg-secondary shadow-lg duration-500 hover:shadow-secondary md:absolute md:left-1/2 md:-translate-x-1/2">
            <NavigationItem href="/#blog">Blog</NavigationItem>
            <NavigationItem href="/#works">Works</NavigationItem>
          </div>

          <div className="flex flex-row justify-center rounded-2xl border border-stroke bg-tertiary shadow-lg duration-500 hover:shadow-secondary">
            <NavigationItem isNewTab className="text-blue-600" href="https://linkedin.com/in/nourmanhajar">
              <LinkedInIcon className="h-5" />
            </NavigationItem>
            <NavigationItem isNewTab className="text-black" href="https://github.com/masnormen">
              <GitHubIcon className="h-5" />
            </NavigationItem>
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavigationBar;
