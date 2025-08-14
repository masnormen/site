export function ContactButton(
  props: React.AnchorHTMLAttributes<HTMLAnchorElement>,
) {
  return (
    <a
      className="group flex sm:flex-col items-center sm:items-start justify-between w-full lg:aspect-square lg:h-auto xl:size-[150px] px-6 py-6 bg-xbg hover:bg-xarrow hover:scale-98 hover:-translate-x-0.5 rounded-cxl text-sm font-semibold font-title transition-all duration-400 active:scale-95 sm:whitespace-nowrap"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  );
}
