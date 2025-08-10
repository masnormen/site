import { cn } from '@/utils/cn';

interface SectionProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export function Section({
  title,
  children,
  description = '',
  icon,
  className = '',
  ...rest
}: SectionProps) {
  return (
    <section
      className={cn(
        '@container relative flex flex-col transition-transform mx-auto border-x-1 border-dashed border-xline w-[calc(100dvw-64px)] sm:w-[80dvw] max-w-oxl px-5 py-24',
        className,
      )}
      {...rest}
    >
      <div className="w-ixl mx-auto">
        <div className="absolute left-0 -translate-x-1/2 -translate-y-0.5 select-none">
          {icon}
        </div>

        <header>
          <h1 className="font-serif text-[40px] leading-[1.25]">{title}</h1>
          <div className="mt-5 font-serif text-xl">{description}</div>
        </header>

        {children}
      </div>
    </section>
  );
}
