export function ContactButton({
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { children: React.ReactNode }) {
  return (
    <a
      className="group bg-xbg hover:bg-xarrow rounded-cxl font-title z-10 flex w-full items-center justify-between px-6 py-6 text-sm font-semibold transition-all duration-400 hover:-translate-x-0.5 hover:scale-98 active:scale-95 sm:flex-col sm:items-start sm:whitespace-nowrap lg:aspect-square lg:h-auto xl:size-[150px]"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
    </a>
  );
}
