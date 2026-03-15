import type { RefObject } from 'react';

import { cn } from '@/utils/cn';

interface SectionProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  before?: React.ReactNode;
  after?: React.ReactNode;
  className?: string;
  ref?: RefObject<HTMLDivElement | null>;
}

export function Section({
  title,
  children,
  description = '',
  icon,
  before,
  after,
  className = '',
  ...rest
}: SectionProps) {
  return (
    <section
      className={cn(
        '@container relative mx-auto flex w-[calc(100dvw-64px)] max-w-oxl flex-col overflow-visible border-x-1 border-b-1 border-dashed border-xline py-12 transition-transform sm:w-[80dvw] sm:py-24',
        className,
      )}
      {...rest}
    >
      {before}

      <div className="mx-auto w-[calc(100%-64px)] max-w-ixl md:w-[calc(100%-128px)]">
        {icon && (
          <div className="absolute left-0 size-8 -translate-x-1/2 select-none sm:size-16 sm:-translate-y-[10%]">
            {icon}
          </div>
        )}

        {title && (
          <header className="mb-8">
            <h1 className="font-serif text-3xl leading-[1.25] font-light tracking-tight text-xghoststroke sm:text-[36px]">
              {title}
            </h1>
            {description && (
              <div className="mt-2 mb-12 text-sm leading-[1.25] sm:mt-4 sm:mb-10 sm:text-base">{description}</div>
            )}
          </header>
        )}

        {children}
      </div>

      {after}
    </section>
  );
}
