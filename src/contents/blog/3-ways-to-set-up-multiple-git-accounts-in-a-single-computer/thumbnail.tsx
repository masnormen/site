import { cn } from '@/contents/common/cn';
import { useFollowMouse } from '../../common/use-follow-mouse';
import { GitLogo, Popcat } from './assets/image-datauris';
import type { ThumbnailProps } from '@/types/post';

export function Thumbnail({ isHover, className, ...rest }: ThumbnailProps) {
  const ref = useFollowMouse();

  return (
    <div
      ref={ref}
      className={cn(
        '@container max-w-full max-h-full aspect-3/2! flex flex-col items-center justify-center relative bg-background filter-noisy',
        className,
      )}
      {...rest}
    >
      <div className="absolute top-1/2 left-[10%] w-2/5 flex justify-center items-center translate-x-[calc(-0.7*var(--mouse-x,0))] translate-y-[calc(-1*var(--mouse-y,0))]">
        <img width="70%" height="auto" src={Popcat} loading="lazy" />
      </div>

      <div className="absolute top-1/2 left-[45%] w-1/2 flex justify-center items-center animate-wiggle">
        <img width="70%" height="auto" src={GitLogo} loading="lazy" />
      </div>

      <div className="absolute top-[25%] left-[20%] flex justify-center items-center font-bold font-mono text-[5cqw]">
        i can haz 2 accounts?
      </div>

      {isHover && (
        <div className="absolute top-[70%] right-[5%] flex justify-center items-center font-bold font-mono text-[5cqw] whitespace-nowrap">
          not rly (read the post) 😉
        </div>
      )}
    </div>
  );
}
