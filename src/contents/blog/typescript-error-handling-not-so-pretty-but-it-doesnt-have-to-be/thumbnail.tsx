import { cn } from '@/contents/common/cn';
import { Gopher, TSCry } from './assets/image-datauris';
import type { ThumbnailProps } from '@/types/post';

export function Thumbnail({ isHover, className, ...rest }: ThumbnailProps) {
  return (
    <div
      className={cn(
        '@container w-full h-full flex flex-col items-center justify-center relative bg-[#c3cfe0] filter-noisy',
        className,
      )}
      {...rest}
    >
      <div className="absolute h-full top-[5%] left-[3%] w-1/2 flex justify-center items-center">
        <img
          width="70%"
          height="auto"
          src={Gopher}
          className={
            isHover ? 'ml-[32%] mb-[28%] -rotate-30' : 'ml-[24%] mb-[24%]'
          }
        />
      </div>
      <div className="absolute h-full top-[5%] left-[3%] w-1/2 flex justify-center items-center">
        <img
          width="70%"
          height="auto"
          src={TSCry}
          className={cn(isHover && 'rotate-30 -ml-2 -mb-4')}
        />
      </div>

      <div className="absolute h-full w-1/2 right-[3%] flex justify-center items-center font-bold font-mono text-[6cqw]">
        <pre>
          <code>
            {!isHover
              ? `try {🤔}
catch {🤷}`
              : `try {🔥}
catch {🤬}`}
          </code>
        </pre>
      </div>
    </div>
  );
}
