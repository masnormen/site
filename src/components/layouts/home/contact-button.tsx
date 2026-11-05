export function ContactButton({
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { children: React.ReactNode }) {
  return (
    <a
      className="group z-10 flex w-full items-center justify-start gap-4 rounded-cxl bg-xbg px-5 py-3 font-title text-base font-semibold whitespace-nowrap transition-[translate,scale,background-color] duration-200 ease-out hover:-translate-x-0.5 hover:scale-98 hover:bg-xarrow active:scale-95 sm:flex-col sm:items-start sm:justify-between sm:px-6 sm:py-6 sm:text-sm lg:aspect-square lg:h-auto xl:size-[150px]"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
    </a>
  );
}
