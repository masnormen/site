import type { ThumbnailProps } from '@/types/post';

import { cn } from '@/contents/common/cn';

import { Gopher, TSCry } from './assets/image-datauris';

export function Thumbnail({ isHover, className, ...rest }: ThumbnailProps) {
  return (
    <div
      className={cn(
        'filter-noisy @container relative flex h-full w-full flex-col items-center justify-center bg-[#c3cfe0]',
        className,
      )}
      {...rest}
    >
      <div className="absolute top-[5%] left-[3%] flex h-full w-1/2 items-center justify-center">
        <img
          width="70%"
          height="auto"
          src={Gopher}
          className={isHover ? 'mb-[28%] ml-[32%] -rotate-30' : 'mb-[24%] ml-[24%]'}
          loading="lazy"
          alt=""
        />
      </div>
      <div className="absolute top-[5%] left-[3%] flex h-full w-1/2 items-center justify-center">
        <img
          width="70%"
          height="auto"
          src={TSCry}
          className={cn(isHover && '-mb-4 -ml-2 rotate-30')}
          loading="lazy"
          alt=""
        />
      </div>

      <div className="absolute right-[3%] flex h-full w-1/2 items-center justify-center font-mono text-[6cqw] font-bold">
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
