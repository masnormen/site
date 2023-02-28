import cn from "@/lib/cn";

interface SectionProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

function Section({ title, children, description = "", className = "" }: SectionProps) {
  return (
    <section
      className={cn(
        "relative flex w-full flex-col items-center justify-center bg-notwhite py-28 px-6 text-stroke md:px-0",
        className
      )}
    >
      <div className="z-10 flex h-full w-full max-w-screen-md flex-col items-center justify-center space-y-16">
        <div className="flex w-full flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <h1 className="text-center font-fancy text-4xl font-bold">{title}</h1>
          <span className="text-center">{description}</span>
        </div>
        {children}
      </div>
    </section>
  );
}

export default Section;
