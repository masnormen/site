import { HourGlassishShape } from '@/components/assets/shapes/misc';
import { cn } from '@/utils/cn';
import type { ThumbnailProps } from '@/types/post';

export function ThumbnailDisplay({
  className,
  isHover = false,
  withOrnaments,
  Thumbnail,
  ...rest
}: Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> & {
  isHover?: boolean;
  withOrnaments?: boolean;
  Thumbnail: React.FC<ThumbnailProps> | string;
}) {
  return (
    <div
      className={cn(
        'isolate relative flex m-auto aspect-square! size-[180px] sm:size-[198px] mx-auto group-hover:scale-105 transition-all duration-400',
        className,
      )}
      {...rest}
    >
      {withOrnaments && (
        <HourGlassishShape className="z-0 absolute translate-y-[3%] rotate-[65deg] w-full h-auto text-xblue pointer-events-none group-hover:rotate-[-25deg] group-hover:text-xyellow transition-all duration-400" />
      )}

      {typeof Thumbnail === 'function' ? (
        <Thumbnail
          isHover={isHover}
          className="z-10 block relative aspect-square! border border-xbg rounded-cxl group-hover:shadow-lg"
        />
      ) : (
        <img
          src={Thumbnail}
          className="z-10 block relative aspect-square! object-center object-contain bg-xghostwhite border border-xbg rounded-cxl group-hover:shadow-lg"
        />
      )}
    </div>
  );
}
