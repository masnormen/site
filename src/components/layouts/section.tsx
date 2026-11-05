import type { RefObject } from 'react';

import { cn } from '@/utils/cn';

interface SectionProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  iconStyle?: React.CSSProperties;
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
  iconStyle,
  before,
  after,
  className = '',
  ...rest
}: SectionProps) {
  return (
    <section
      className={cn(
        '@container relative mx-auto flex w-[calc(100dvw-32px)] max-w-oxl flex-col overflow-visible border-x-1 border-b-1 border-dashed border-xline py-12 sm:w-[80dvw] sm:py-24',
        className,
      )}
      {...rest}
    >
      {before}

      <div className="mx-auto w-[calc(100%-32px)] max-w-ixl sm:w-[calc(100%-64px)] md:w-[calc(100%-128px)]">
        {icon && (
          <div
            className="absolute left-0 hidden size-16 -translate-x-1/2 -translate-y-[10%] select-none sm:block"
            style={iconStyle}
          >
            {icon}
          </div>
        )}

        {title && (
          <header className="mb-8">
            <div className="flex items-center gap-3">
              {icon && (
                <div className="size-10 shrink-0 select-none sm:hidden" style={iconStyle}>
                  {icon}
                </div>
              )}
              <h1 className="font-serif text-3xl leading-[1.25] font-light tracking-tight text-xghoststroke sm:text-[36px]">
                {title}
              </h1>
            </div>
            {description && (
              <div className="mt-3 mb-10 text-base leading-[1.4] text-pretty sm:mt-4 sm:mb-10 sm:text-base">
                {description}
              </div>
            )}
          </header>
        )}

        {children}
      </div>

      {after}
    </section>
  );
}
