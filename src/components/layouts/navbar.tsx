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
    return <button className={cn(className, customClassName)} {...props} type="button" />;
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

function NavSection({ className, children, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    // oxlint-disable-next-line jsx_a11y/click-events-have-key-events jsx_a11y/no-static-element-interactions
    <div
      onClick={(e) => e.stopPropagation()}
      className={cn(
        'flex h-10.5 flex-row justify-center gap-2 rounded-mxl px-3 transition-all duration-200',
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
    <nav className="fixed bottom-15 left-1/2 z-9999 flex h-[42px] w-min -translate-x-1/2 flex-row items-stretch justify-center bg-transparent py-4 transition-all duration-500 sm:top-0 sm:bottom-[initial]">
      <NavSection className="bg-xstroke">
        <NavItem type="link" to="/" aria-label="Home">
          <Icon icon="mingcute:home-6-fill" className="mt-[1px] text-base" />
        </NavItem>
        <NavItem type="link" to="/" hash="blog">
          Blog
        </NavItem>
        <NavItem type="link" to="/" hash="projects">
          Projects
        </NavItem>
        <NavItem type="link" href="https://linkedin.com/in/nourmanhajar" aria-label="LinkedIn">
          <LinkedInIcon className="my-auto h-3.5" />
        </NavItem>
        <NavItem type="link" href="https://github.com/masnormen" aria-label="GitHub">
          <GitHubIcon className="my-auto h-3.5" />
        </NavItem>
      </NavSection>
    </nav>
  );
}
