import type { ThumbnailProps } from '@/types/post';
import { Gopher, TSCry } from './assets/image-datauris';

export function Thumbnail({ isHover }: ThumbnailProps) {
  return (
    <div className="@container max-w-full max-h-full aspect-3/2! flex flex-col items-center justify-center relative bg-gradient-to-bl from-quaternary to-secondary filter-noisy">
      <div className="absolute h-full top-[5%] left-[3%] w-1/2 flex justify-center items-center">
        <img
          width="70%"
          height="auto"
          src={Gopher}
          className={isHover ? 'ml-[32%] mb-[28%]' : 'ml-[24%] mb-[24%]'}
        />
      </div>
      <div className="absolute h-full top-[5%] left-[3%] w-1/2 flex justify-center items-center">
        <img width="70%" height="auto" src={TSCry} />
      </div>

      <div className="absolute h-full w-1/2 right-[3%] flex justify-center items-center font-bold font-mono text-[6cqw]">
        <pre>
          <code>
            {`try {🔥}
catch {🤷}`}
          </code>
        </pre>
      </div>
    </div>
  );
}
