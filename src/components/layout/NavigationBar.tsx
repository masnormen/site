import { useAtom } from "jotai";
import Link from "next/link";
import { useEffect, useState } from "react";

import { themeAtom } from "@/atoms/theme";
import { THEMES } from "@/constants/themes";
import useWindowSize from "@/hooks/useWindowSize";
import cn from "@/lib/cn";

import GitHubIcon from "../Icons/GitHubIcon";
import LinkedInIcon from "../Icons/LinkedInIcon";

type NavigationItemProps = ({ href: string } | { onClick: () => void }) & {
  children: React.ReactNode;
  className?: string;
  isNewTab?: boolean;
};

function NavigationItem(props: NavigationItemProps) {
  const { className, children, isNewTab } = props;

  if ("onClick" in props) {
    return (
      <button
        type="button"
        onClick={props.onClick}
        className={cn(
          "flex rounded-xl px-4 py-3 text-sm font-semibold uppercase text-stroke duration-500 hover:bg-stroke hover:text-background",
          className
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
        className
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
      className={cn(
        "flex flex-row justify-center rounded-xl border border-stroke drop-shadow-[4px_4px_0px_var(--theme-tertiary)] transition-all duration-200 hover:drop-shadow-[4px_4px_0px_var(--theme-highlight)] md:hover:scale-[1.05]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function NavigationBar() {
  const [isMenuShown, setMenuShown] = useState(false);
  const { width } = useWindowSize();

  const [theme, setTheme] = useAtom(themeAtom);

  const themeNames = Object.keys(THEMES);

  useEffect(() => {
    if (width > 768) {
      setMenuShown(true);
    }
  }, [width]);

  return (
    <nav className="top-0 z-50 flex w-full flex-col items-center justify-center bg-gray-50 bg-opacity-20 backdrop-blur-sm duration-500 md:sticky">
      <button
        type="button"
        onClick={() => setMenuShown(!isMenuShown)}
        className="my-4 flex cursor-pointer flex-row justify-center rounded-2xl border border-stroke bg-blank px-4 py-3 text-sm font-semibold uppercase text-stroke shadow-lg duration-500 hover:bg-stroke hover:text-background hover:shadow-secondary md:hidden"
      >
        Menu {isMenuShown ? "⬆️" : "⬇️"}
      </button>
      {isMenuShown && (
        <div className="flex h-full max-w-screen-md flex-col items-stretch justify-between space-y-2 px-6 py-4 md:w-full md:flex-row md:space-y-0 md:px-0">
          <NavigationSection className="bg-blank">
            <NavigationItem href="/">nourman.com</NavigationItem>
          </NavigationSection>

          <NavigationSection className="bg-secondary md:absolute md:left-1/2 md:-translate-x-1/2">
            <NavigationItem href="/#blog">Blog</NavigationItem>
            <NavigationItem href="/#works">Works</NavigationItem>
            <NavigationItem
              onClick={() => setTheme(themeNames[(themeNames.indexOf(theme) + 1) % themeNames.length] as string)}
            >
              Theme [{THEMES[theme as keyof typeof THEMES]}]
            </NavigationItem>
          </NavigationSection>

          <NavigationSection className="bg-tertiary">
            <NavigationItem isNewTab className="text-sky-700" href="https://linkedin.com/in/nourmanhajar">
              <LinkedInIcon className="h-5" />
            </NavigationItem>
            <NavigationItem isNewTab className="text-black" href="https://github.com/masnormen">
              <GitHubIcon className="h-5" />
            </NavigationItem>
          </NavigationSection>
        </div>
      )}
    </nav>
  );
}

export default NavigationBar;
