import { cn } from '@/utils/cn';

interface SectionProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export function Section({
  title,
  children,
  description = '',
  className = '',
  ...rest
}: SectionProps) {
  return (
    <section
      className={cn(
        'relative flex w-full flex-col items-center justify-center bg-blank px-4 py-8 md:py-16 gap-8 md:gap-16 text-stroke',
        className,
      )}
      {...rest}
    >
      {!!title && (
        <header className="flex w-full flex-col gap-2">
          <div className="text-center font-bold font-mono text-xl leading-[1.3]">
            {title}
          </div>
          {!!description && (
            <span className="text-center font-mono text-xs leading-[1.3]">
              {description}
            </span>
          )}
        </header>
      )}
      {children}
    </section>
  );
}
