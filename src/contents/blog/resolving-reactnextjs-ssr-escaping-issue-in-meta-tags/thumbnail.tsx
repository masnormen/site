import type { ThumbnailProps } from '@/types/post';

import { cn } from '@/contents/common/cn';

import { useFollowMouse } from '../../common/use-follow-mouse';

export function Thumbnail({ isHover, className, ...rest }: ThumbnailProps) {
  const ref = useFollowMouse();

  return (
    <div
      ref={ref}
      className={cn('@container flex h-full w-full flex-col items-center justify-center bg-white', className)}
      style={{
        backgroundPosition: `calc(2 * var(--mouse-x,0)) calc(2 * var(--mouse-y,0))`,
        backgroundSize: '35%',
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d9d6a4' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}
      {...rest}
    >
      <div className="mt-[2%] ml-[5%] font-mono text-[6cqw] font-bold text-[#4a3003] drop-shadow-lg">
        <pre>
          <code className="flex flex-col [&_.line]:inline-block">
            <span className="line">
              <span style={{ color: '#666666' }}>&lt;</span>
              <span style={{ color: '#4D9375' }}>meta</span>
            </span>
            <span className="line">
              <span style={{ color: '#BD976A' }}> property</span>
              <span style={{ color: '#666666' }}>=</span>
              <span style={{ color: '#C98A7D77' }}>"</span>
              <span style={{ color: '#C98A7D' }}>og:image</span>
              <span style={{ color: '#C98A7D77' }}>"</span>
            </span>
            <span className="line">
              <span style={{ color: '#BD976A' }}> content</span>
              <span style={{ color: '#666666' }}>=</span>
              <span style={{ color: '#C98A7D77' }}>"</span>
              <span className={isHover ? 'rounded-lg bg-amber-950 transition-all' : 'rounded-lg transition-all'}>
                <span style={{ color: '#666666' }}>&amp;</span>
                <span style={{ color: '#C99076' }}>F&amp;amp;$%!@!</span>
                <span style={{ color: '#666666' }}>;</span>
              </span>
              <span style={{ color: '#C98A7D77' }}>"</span>
            </span>
            <span className="line">
              <span style={{ color: '#666666' }}>&gt;</span>
            </span>
          </code>
        </pre>
      </div>
    </div>
  );
}
