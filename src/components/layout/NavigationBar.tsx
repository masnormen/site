import { useAtom } from "jotai";
import Link from "next/link";
import { useState } from "react";

import { themeAtom } from "@/atoms/theme";
import { THEMES } from "@/constants/themes";
import cn from "@/lib/cn";

import GitHubIcon from "../Icons/GitHubIcon";
import LinkedInIcon from "../Icons/LinkedInIcon";

type NavigationItemProps = { href?: string; onClick?: () => void } & {
  children: React.ReactNode;
  className?: string;
  isNewTab?: boolean;
};

function NavigationItem(props: NavigationItemProps) {
  const { className, children, isNewTab } = props;

  if (!props.href) {
    return (
      <button
        type="button"
        onClick={props.onClick}
        className={cn(
          "flex rounded-xl px-4 py-3 text-sm font-semibold uppercase text-stroke duration-500 hover:bg-stroke hover:text-background",
          className,
        )}
      >
        {children}
      </button>
    );
  }

  return (
    <Link
      href={props.href}
      className={cn(
        "flex rounded-xl px-4 py-3 text-sm font-semibold uppercase text-stroke duration-500 hover:bg-stroke hover:text-background",
        className,
      )}
      target={isNewTab ? "_blank" : "_self"}
      rel="noopener noreferrer"
    >
      {children}
    </Link>
  );
}

function NavigationSection({ className, children, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={cn(
        "flex flex-row justify-center rounded-xl border border-stroke drop-shadow-[4px_4px_0px_var(--theme-tertiary)] transition-all duration-200 hover:drop-shadow-[4px_4px_0px_var(--theme-highlight)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function NavigationBar() {
  const [isMenuShown, setMenuShown] = useState(false);

  const [theme, setTheme] = useAtom(themeAtom);

  const themeNames = Object.keys(THEMES);

  return (
    <>
      <div className="invisible h-20" />
      <nav className="fixed top-0 z-50 flex w-full flex-col items-center justify-center bg-gray-50 bg-opacity-20 backdrop-blur-sm duration-500">
        <button
          type="button"
          onClick={() => setMenuShown(!isMenuShown)}
          className="my-4 flex cursor-pointer flex-row justify-center rounded-2xl border border-stroke bg-blank px-4 py-3 text-sm font-semibold uppercase text-stroke shadow-lg duration-500 hover:bg-stroke hover:text-background hover:shadow-secondary md:hidden"
        >
          {isMenuShown ? "Close" : "Menu"}
        </button>

        <div
          onClick={() => setMenuShown(false)}
          className={cn(
            !isMenuShown ? "hidden md:flex" : "flex",
            "h-[calc(100vh-78px)] w-full flex-col items-center justify-center gap-8 space-y-2 bg-black/20 px-6 py-4 transition md:h-fit md:w-full md:max-w-screen-md md:flex-row md:items-stretch md:justify-between md:gap-0 md:space-y-0 md:bg-transparent md:px-0",
          )}
        >
          <NavigationSection onClick={() => setMenuShown(false)} className="bg-blank">
            <NavigationItem href="/">nourman.com</NavigationItem>
          </NavigationSection>

          <NavigationSection
            onClick={() => setMenuShown(false)}
            className="bg-secondary md:absolute md:left-1/2 md:-translate-x-1/2"
          >
            <NavigationItem href="/#blog">Blog</NavigationItem>
            <NavigationItem href="/#works">Works</NavigationItem>
            <NavigationItem
              onClick={() => setTheme(themeNames[(themeNames.indexOf(theme) + 1) % themeNames.length] as string)}
            >
              ({THEMES[theme as keyof typeof THEMES]})
            </NavigationItem>
          </NavigationSection>

          <NavigationSection onClick={() => setMenuShown(false)} className="bg-tertiary">
            <NavigationItem isNewTab className="text-black" href="https://linkedin.com/in/nourmanhajar">
              <LinkedInIcon className="h-5" />
            </NavigationItem>
            <NavigationItem isNewTab className="text-black" href="https://github.com/masnormen">
              <GitHubIcon className="h-5" />
            </NavigationItem>
          </NavigationSection>
        </div>
      </nav>
    </>
  );
}

export default NavigationBar;
