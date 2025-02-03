import { themeAtom } from '@/atoms/index';
import { GitHubIcon } from '@/components/assets/github';
import { LinkedInIcon } from '@/components/assets/linkedin';
import { THEMES } from '@/constants/themes';
import { cn } from '@/utils/cn';
import { Link, type LinkComponentProps } from '@tanstack/react-router';
import { useWindowScroll } from '@uidotdev/usehooks';
import { useAtom } from 'jotai';
import { toast } from 'sonner';

type NavItemProps =
  | ({
      type: 'button';
    } & React.ButtonHTMLAttributes<HTMLButtonElement>)
  | ({
      type: 'link';
    } & (
      | (Omit<LinkComponentProps, 'href' | 'children'> & {
          children: React.ReactNode;
        })
      | ({ href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>)
    ));

function NavItem({ className: customClassName, ...props }: NavItemProps) {
  const className =
    'flex rounded-md px-3 py-1.5 text-nowrap whitespace-nowrap text-sm font-semibold font-mono uppercase text-blank duration-500 cursor-pointer outline-2 outline-transparent hover:outline-tertiary hover:bg-tertiary hover:text-stroke';

  if (props.type === 'button') {
    return (
      <button
        className={cn(className, customClassName)}
        {...props}
        type="button"
      />
    );
  }

  const Wrapper = 'href' in props ? 'a' : Link;
  return (
    <Wrapper
      className={cn(className, customClassName)}
      target={'href' in props ? '_blank' : undefined}
      rel={'href' in props ? 'noopener noreferrer' : undefined}
      {...props}
    />
  );
}

function NavSection({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={cn(
        'flex px-3 flex-row h-min justify-center rounded-2xl border border-dashed border-highlight drop-shadow-[4px_4px_0px_var(--theme-tertiary)] transition-all duration-200 hover:drop-shadow-[0_0_2px_var(--theme-highlight)]',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function Navbar() {
  const [{ y }] = useWindowScroll();
  const [theme, setTheme] = useAtom(themeAtom);

  return (
    <nav
      className={cn(
        'fixed left-1/2 -translate-x-1/2 pb-8 z-50 flex justify-center h-min w-min flex-row items-stretch bg-transparent transition-all duration-500',
        (y ?? 0) < 64 ? 'opacity-0 invisible blur-md -bottom-10' : 'bottom-0',
      )}
    >
      <NavSection className="bg-stroke">
        <NavItem type="link" to="/">
          Home
        </NavItem>
        <NavItem type="link" to="/" hash="blog" className="hidden md:flex">
          Blog
        </NavItem>
        <NavItem type="link" to="/" hash="projects" className="hidden md:flex">
          Projects
        </NavItem>
        <NavItem type="link" href="https://linkedin.com/in/nourmanhajar">
          <LinkedInIcon className="h-3.5 my-auto" />
        </NavItem>
        <NavItem type="link" href="https://github.com/masnormen">
          <GitHubIcon className="h-3.5 my-auto" />
        </NavItem>
        <NavItem
          type="button"
          onClick={() => {
            const themeNames = Object.keys(THEMES) as (keyof typeof THEMES)[];
            const nextThemeIndex =
              (themeNames.indexOf(theme) + 1) % themeNames.length;
            setTheme(themeNames[nextThemeIndex]!);
            toast('Theme has been changed!', { id: 'theme-change' });
          }}
        >
          🔄🎨
        </NavItem>
      </NavSection>
    </nav>
  );
}
