import type { ThumbnailProps } from '@/types/post';

import { HourGlassishShape } from '@/components/assets/shapes/misc';
import { cn } from '@/utils/cn';

export function ThumbnailDisplay({
  className,
  isHover = false,
  withOrnaments,
  Thumbnail,
  loading,
  ...rest
}: Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> & {
  isHover?: boolean;
  withOrnaments?: boolean;
  Thumbnail: React.FC<ThumbnailProps> | string;
  loading?: 'eager' | 'lazy';
}) {
  return (
    <div
      className={cn(
        'relative isolate m-auto mx-auto flex aspect-square! size-[180px] transition-all duration-400 group-hover:scale-105 sm:size-[198px]',
        className,
      )}
      {...rest}
    >
      {withOrnaments && (
        <HourGlassishShape className="pointer-events-none absolute z-0 h-auto w-full translate-y-[3%] rotate-[65deg] text-xblue transition-all duration-400 group-hover:rotate-[-25deg] group-hover:text-xyellow" />
      )}

      {typeof Thumbnail === 'function' ? (
        <Thumbnail
          isHover={isHover}
          className="relative z-10 block aspect-square! rounded-cxl border border-xbg group-hover:shadow-lg"
        />
      ) : (
        <img
          src={Thumbnail}
          className="relative z-10 block aspect-square! rounded-cxl border border-xbg bg-xghostwhite object-contain object-center group-hover:shadow-lg"
          loading={loading}
          alt="Post Thumbnail"
        />
      )}
    </div>
  );
}
