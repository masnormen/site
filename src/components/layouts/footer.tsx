import { Link } from '@tanstack/react-router';

// TODO: Update the footer content

export function Footer() {
  return (
    <footer className="flex flex-col items-center overflow-hidden justify-center bg-xbg border-t-1 border-dashed border-xline">
      <div className="@container relative flex flex-col items-center h-[584px] w-[calc(100%-64px)] sm:w-[calc(100%-128px)] max-w-ixl mx-auto pt-24">
        <nav className="grid grid-cols-[1fr_1fr_0.55fr] w-full gap-6">
          <div className="">
            <div className="font-title font-bold text-2xl leading-[1.15]">
              General
            </div>
            <div className="flex flex-col mt-8 gap-4">
              {['Home', 'Blog', 'Projects', 'Guestbook', 'Attributions'].map(
                (item) => (
                  <Link
                    to="/"
                    className="font-semibold font-title text-base text-xblue hover:underline hover:underline-offset-2"
                    key={item}
                  >
                    {item}
                  </Link>
                ),
              )}
            </div>
          </div>
          <div className="">
            <div className="font-title font-bold text-2xl leading-[1.15]">
              Connect
            </div>
            <div className="flex flex-col mt-8 gap-4">
              {['Book a Call ↗', 'LinkedIn ↗', 'GitHub ↗'].map((item) => (
                <Link
                  to="/"
                  className="font-semibold font-title text-base text-xblue hover:underline hover:underline-offset-2"
                  key={item}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
          <div className="">
            <div className="font-title font-bold text-2xl leading-[1.15]">
              Misc
            </div>
            <div className="flex flex-col mt-8 font-title text-sm gap-4 leading-[1.5]">
              <p>
                Last deployed at{' '}
                <i>
                  {typeof window === 'undefined'
                    ? '-'
                    : /** biome-ignore lint/suspicious/noExplicitAny: it exists at runtime */
                      (window as any).__BUILD_TIME__}
                </i>{' '}
                with commit <b>31f5a1e</b>.
              </p>
              <p>
                Powered by <b>TanStack Start</b>.
              </p>
              <p>
                Have a nice <b>Thursday</b>!
              </p>
            </div>
          </div>
        </nav>

        <div className="mt-16 w-full text-center font-title text-sm text-xghoststroke">
          All Rights Reserved © 2020-{new Date().getFullYear()}
        </div>

        <div className="absolute bottom-0 flex w-full font-serif text-[148px] text-xyellow text-center leading-[0.45]">
          NOURMAN·COM
        </div>
      </div>
    </footer>
  );
}
