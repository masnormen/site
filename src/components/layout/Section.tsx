import cn from "@/lib/cn";

interface SectionProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

function Section({ title, children, description = "", className = "", ...rest }: SectionProps) {
  return (
    <section
      className={cn(
        "relative flex w-full flex-col items-center justify-center bg-blank px-4 py-12 text-stroke md:py-14",
        className,
      )}
      {...rest}
    >
      <div className="z-10 flex h-full w-full max-w-screen-md flex-col items-center justify-center space-y-10">
        <div className="flex w-full flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <h1 className="text-center font-headline text-4xl font-bold">{title}</h1>
          <span className="text-center">{description}</span>
        </div>
        {children}
      </div>
    </section>
  );
}

export default Section;
