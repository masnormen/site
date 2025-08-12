import { cn } from '@/utils/cn';

interface SectionProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  before?: React.ReactNode;
  after?: React.ReactNode;
  className?: string;
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
        '@container relative flex flex-col transition-transform mx-auto border-x-1 border-b-1 border-dashed border-xline w-[calc(100dvw-64px)] sm:w-[80dvw] max-w-oxl py-12 sm:py-24',
        className,
      )}
      {...rest}
    >
      {before}

      <div className="w-[calc(100%-64px)] sm:w-[calc(100%-128px)] max-w-ixl mx-auto">
        <div className="absolute left-0 size-8 sm:size-16 -translate-x-1/2 sm:-translate-y-[10%] select-none">
          {icon}
        </div>

        <header className="mb-12 sm:mb-16">
          <h1 className="font-serif text-2xl sm:text-[40px] leading-[1.25]">{title}</h1>
          <div className="mt-2 sm:mt-5 font-serif text-sm sm:text-xl leading-[1.25]">
            {description}
          </div>
        </header>

        {children}
      </div>

      {after}
    </section>
  );
}
