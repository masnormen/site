import { cn } from '@/contents/common/cn';
import { useFollowMouse } from '../../common/use-follow-mouse';
import type { ThumbnailProps } from '@/types/post';

export function Thumbnail({ isHover, className, ...rest }: ThumbnailProps) {
  const ref = useFollowMouse();

  return (
    <div
      ref={ref}
      className={cn(
        '@container w-full h-full flex flex-col items-center justify-center bg-white',
        className,
      )}
      style={{
        backgroundPosition: `calc(2 * var(--mouse-x,0)) calc(2 * var(--mouse-y,0))`,
        backgroundSize: '50%',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 56 28' width='56' height='28'%3E%3Cpath fill='%23fce2b5' fill-opacity='0.6' d='M56 26v2h-7.75c2.3-1.27 4.94-2 7.75-2zm-26 2a2 2 0 1 0-4 0h-4.09A25.98 25.98 0 0 0 0 16v-2c.67 0 1.34.02 2 .07V14a2 2 0 0 0-2-2v-2a4 4 0 0 1 3.98 3.6 28.09 28.09 0 0 1 2.8-3.86A8 8 0 0 0 0 6V4a9.99 9.99 0 0 1 8.17 4.23c.94-.95 1.96-1.83 3.03-2.63A13.98 13.98 0 0 0 0 0h7.75c2 1.1 3.73 2.63 5.1 4.45 1.12-.72 2.3-1.37 3.53-1.93A20.1 20.1 0 0 0 14.28 0h2.7c.45.56.88 1.14 1.29 1.74 1.3-.48 2.63-.87 4-1.15-.11-.2-.23-.4-.36-.59H26v.07a28.4 28.4 0 0 1 4 0V0h4.09l-.37.59c1.38.28 2.72.67 4.01 1.15.4-.6.84-1.18 1.3-1.74h2.69a20.1 20.1 0 0 0-2.1 2.52c1.23.56 2.41 1.2 3.54 1.93A16.08 16.08 0 0 1 48.25 0H56c-4.58 0-8.65 2.2-11.2 5.6 1.07.8 2.09 1.68 3.03 2.63A9.99 9.99 0 0 1 56 4v2a8 8 0 0 0-6.77 3.74c1.03 1.2 1.97 2.5 2.79 3.86A4 4 0 0 1 56 10v2a2 2 0 0 0-2 2.07 28.4 28.4 0 0 1 2-.07v2c-9.2 0-17.3 4.78-21.91 12H30zM7.75 28H0v-2c2.81 0 5.46.73 7.75 2zM56 20v2c-5.6 0-10.65 2.3-14.28 6h-2.7c4.04-4.89 10.15-8 16.98-8zm-39.03 8h-2.69C10.65 24.3 5.6 22 0 22v-2c6.83 0 12.94 3.11 16.97 8zm15.01-.4a28.09 28.09 0 0 1 2.8-3.86 8 8 0 0 0-13.55 0c1.03 1.2 1.97 2.5 2.79 3.86a4 4 0 0 1 7.96 0zm14.29-11.86c1.3-.48 2.63-.87 4-1.15a25.99 25.99 0 0 0-44.55 0c1.38.28 2.72.67 4.01 1.15a21.98 21.98 0 0 1 36.54 0zm-5.43 2.71c1.13-.72 2.3-1.37 3.54-1.93a19.98 19.98 0 0 0-32.76 0c1.23.56 2.41 1.2 3.54 1.93a15.98 15.98 0 0 1 25.68 0zm-4.67 3.78c.94-.95 1.96-1.83 3.03-2.63a13.98 13.98 0 0 0-22.4 0c1.07.8 2.09 1.68 3.03 2.63a9.99 9.99 0 0 1 16.34 0z'%3E%3C/path%3E%3C/svg%3E")`,
      }}
      {...rest}
    >
      <div className="font-bold text-[#4a3003] drop-shadow-lg text-[9cqw]">
        <div className="[text-shadow:5px_5px_60px_#DD8F09]">
          ジヨ<span className="ml-3 text-[6cqw]">ziyo</span>
        </div>
      </div>

      <div className="mt-[5%] flex w-8/10 flex-col rounded-md bg-white text-black relative h-fit overflow-visible shadow-md outline outline-[#fce2b5]">
        <div className="border-[#fce2b5] flex items-center rounded-b-md px-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-4 w-4 shrink-0 opacity-50"
          >
            <circle cx={11} cy={11} r={8} />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <div className="flex h-11 w-full rounded-md bg-transparent py-3 outline-none">
            <img
              className={cn('h-[2cqh] my-auto', isHover && 'hue-rotate-90')}
              src="https://typesense.org/docs/images/typesense_logo.svg"
              loading="lazy"
            />
          </div>
        </div>

        <div className="max-h-[400px] overflow-y-auto overflow-x-hidden top-[45px] z-10 w-full rounded-b-md bg-white shadow-lg outline outline-[#fce2b5] transition-all">
          <div>
            <div
              className={cn(
                isHover ? 'bg-[#fdede8]' : 'bg-[#fff8ea]',
                'relative flex select-none items-center rounded-sm px-[1cqw] outline-none border-b border-[#fce2b5] py-0',
              )}
            >
              <div className="flex h-full w-full flex-row items-start px-[3cqw] py-[4.5cqw] gap-[3cqw]">
                <div className="text-[6cqw] text-[#513400]" lang="ja">
                  速
                </div>
                <div className="flex flex-col gap-[1.5cqw] pt-0.5">
                  <div className="flex flex-row flex-nowrap gap-2">
                    <span
                      className="inline-block whitespace-nowrap rounded-full px-[1.5cqw] py-[1.5cqw] text-[3cqw] shadow-sm transition bg-rose-100 font-bold text-gray-900"
                      lang="ja"
                    >
                      ソク
                    </span>
                    <span
                      className="inline-block whitespace-nowrap rounded-full px-[1.5cqw] py-[1.5cqw] text-[3cqw] shadow-sm transition bg-[#fce2b5] font-bold text-gray-900"
                      lang="ja"
                    >
                      はや.い
                    </span>
                    <span
                      className="inline-block whitespace-nowrap rounded-full px-[1.5cqw] py-[1.5cqw] text-[3cqw] font-medium shadow-sm transition bg-purple-100 text-gray-900"
                      lang="zh"
                    >
                      sù
                    </span>
                    <span
                      className="inline-block whitespace-nowrap rounded-full px-[1.5cqw] py-[1.5cqw] text-[3cqw] font-medium shadow-sm transition bg-blue-100 text-gray-900"
                      lang="ko"
                    >
                      속
                    </span>
                  </div>
                  <div className="flex flex-row flex-wrap gap-2 text-[3cqw] font-bold text-amber-900">
                    quick, fast
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
