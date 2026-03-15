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
        <HourGlassishShape className="text-xblue group-hover:text-xyellow pointer-events-none absolute z-0 h-auto w-full translate-y-[3%] rotate-[65deg] transition-all duration-400 group-hover:rotate-[-25deg]" />
      )}

      {typeof Thumbnail === 'function' ? (
        <Thumbnail
          isHover={isHover}
          className="border-xbg rounded-cxl relative z-10 block aspect-square! border group-hover:shadow-lg"
        />
      ) : (
        <img
          src={Thumbnail}
          className="bg-xghostwhite border-xbg rounded-cxl relative z-10 block aspect-square! border object-contain object-center group-hover:shadow-lg"
          loading={loading}
          alt="Post Thumbnail"
        />
      )}
    </div>
  );
}
