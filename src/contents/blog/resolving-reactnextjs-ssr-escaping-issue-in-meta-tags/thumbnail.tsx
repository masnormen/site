import type { ThumbnailProps } from '@/types/post';
import { useFollowMouse } from '../../common/use-follow-mouse';

export function Thumbnail({ isHover }: ThumbnailProps) {
  const ref = useFollowMouse();

  return (
    <div
      ref={ref}
      className="@container max-w-full max-h-full aspect-3/2! flex flex-col items-center justify-center rounded-2xl"
      style={{
        backgroundPosition: `calc(2 * var(--mouse-x,0)) calc(2 * var(--mouse-y,0))`,
        backgroundSize: '25%',
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d9d6a4' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}
    >
      <div className="ml-[5%] mt-[2%] font-bold font-mono text-[#4a3003] drop-shadow-lg text-[5cqw]">
        <pre>
          <code className="[&_.line]:inline-block flex flex-col">
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
              <span
                className={
                  isHover
                    ? 'bg-amber-950 rounded-lg transition-all'
                    : 'rounded-lg transition-all'
                }
              >
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
