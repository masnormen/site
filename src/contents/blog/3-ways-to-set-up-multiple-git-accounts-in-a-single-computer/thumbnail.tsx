import type { ThumbnailProps } from '@/types/post';

import { cn } from '@/contents/common/cn';

import { useFollowMouse } from '../../common/use-follow-mouse';
import { GitLogo, Popcat } from './assets/image-datauris';

export function Thumbnail({ isHover, className, ...rest }: ThumbnailProps) {
  const ref = useFollowMouse();

  return (
    <div
      ref={ref}
      className={cn(
        'bg-background filter-noisy @container relative flex aspect-3/2! max-h-full max-w-full flex-col items-center justify-center',
        className,
      )}
      {...rest}
    >
      <div className="absolute top-1/2 left-[10%] flex w-2/5 translate-x-[calc(-0.7*var(--mouse-x,0))] translate-y-[calc(-1*var(--mouse-y,0))] items-center justify-center">
        <img width="70%" height="auto" src={Popcat} loading="lazy" alt="" />
      </div>

      <div className="animate-wiggle absolute top-1/2 left-[45%] flex w-1/2 items-center justify-center">
        <img width="70%" height="auto" src={GitLogo} loading="lazy" alt="" />
      </div>

      <div className="absolute top-[25%] left-[20%] flex items-center justify-center font-mono text-[5cqw] font-bold">
        i can haz 2 accounts?
      </div>

      {isHover && (
        <div className="absolute top-[70%] right-[5%] flex items-center justify-center font-mono text-[5cqw] font-bold whitespace-nowrap">
          not rly (read the post) 😉
        </div>
      )}
    </div>
  );
}
