import { Icon } from '@iconify/react';
import { Link, type LinkComponentProps } from '@tanstack/react-router';
import { GitHubIcon } from '@/components/assets/github';
import { LinkedInIcon } from '@/components/assets/linkedin';
import { cn } from '@/utils/cn';

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
    'flex rounded-md px-2 items-center text-nowrap whitespace-nowrap text-sm font-semibold font-title text-blank duration-500 cursor-pointer hover:text-xyellow';

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
        'flex px-3 flex-row h-[42px] justify-center rounded-mxl transition-all duration-200 gap-2',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function Navbar() {
  return (
    <nav className="fixed left-1/2 -translate-x-1/2 h-[42px] py-4 z-9999 flex justify-center w-min flex-row items-stretch bg-transparent transition-all duration-500 bottom-15 sm:bottom-[initial] sm:top-0">
      <NavSection className="bg-xstroke">
        <NavItem type="link" to="/" aria-label="Home">
          <Icon icon="mingcute:home-6-fill" className="text-base mt-[1px]" />
        </NavItem>
        <NavItem type="link" to="/" hash="blog">
          Blog
        </NavItem>
        <NavItem type="link" to="/" hash="projects">
          Projects
        </NavItem>
        <NavItem
          type="link"
          href="https://linkedin.com/in/nourmanhajar"
          aria-label="LinkedIn"
        >
          <LinkedInIcon className="h-3.5 my-auto" />
        </NavItem>
        <NavItem
          type="link"
          href="https://github.com/masnormen"
          aria-label="GitHub"
        >
          <GitHubIcon className="h-3.5 my-auto" />
        </NavItem>
      </NavSection>
    </nav>
  );
}
