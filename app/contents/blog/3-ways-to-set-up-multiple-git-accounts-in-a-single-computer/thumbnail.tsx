import type { ThumbnailProps } from '@/types/post';
import { useFollowMouse } from '../../common/use-follow-mouse';
import { GitLogo, Popcat } from './assets/image-datauris';

export function Thumbnail({ isHover }: ThumbnailProps) {
  const ref = useFollowMouse();

  return (
    <div
      ref={ref}
      className="@container max-w-full max-h-full aspect-3/2! flex flex-col items-center justify-center relative bg-background filter-noisy"
    >
      <div className="absolute h-full top-[5%] left-[3%] w-1/2 flex justify-center items-center translate-x-[calc(-1*var(--mouse-x,0))] translate-y-[calc(-1*var(--mouse-y,0))]">
        <img width="70%" height="auto" src={Popcat} />
      </div>

      <div className="absolute h-full top-[5%] left-[45%] w-1/2 flex justify-center items-center animate-wiggle">
        <img width="70%" height="auto" src={GitLogo} />
      </div>

      <div className="absolute top-[20%] left-[20%] flex justify-center items-center font-bold font-mono text-[3cqw]">
        can has 2 accounts?
      </div>

      {isHover && (
        <div className="absolute top-[70%] left-[70%] flex justify-center items-center font-bold font-mono text-[3cqw]">
          lol not rly
        </div>
      )}
    </div>
  );
}
