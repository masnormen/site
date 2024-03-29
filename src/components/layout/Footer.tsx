import cn from "@/lib/cn";

interface FooterProps {
  className?: string;
}

function Footer({ className }: FooterProps) {
  return (
    <footer
      className={cn(
        "relative flex w-full flex-col items-center justify-center px-6 py-28 text-stroke md:px-0",
        className ?? "bg-blank",
      )}
    >
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-semibold leading-tight">
        &copy;
        <br />
        Nourman
        <br />
        Hajar
      </span>
      <svg viewBox="0 0 100 100" className="animate-fastspin aspect-square h-48 font-mono text-[1rem] text-highlight">
        <defs>
          <path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
        </defs>
        <text fill="currentColor">
          <textPath xlinkHref="#circle">NOURMAN·COM·NOURMAN·COM·</textPath>
        </text>
      </svg>
    </footer>
  );
}

export default Footer;
