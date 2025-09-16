import { Link } from '@tanstack/react-router';

// TODO: Update the footer content

const FooterSection = ({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={className}>
    <div className="font-title font-bold text-2xl leading-[1.15]">{title}</div>
    <div className="flex flex-col mt-4 md:mt-8 gap-2 md:gap-4 *:w-fit">
      {children}
    </div>
  </div>
);

export function Footer() {
  return (
    <footer className="flex flex-col items-center overflow-hidden justify-center bg-xbg border-t-1 border-dashed border-xline">
      <div className="@container relative flex flex-col items-center w-[calc(100dvw-64px)] sm:w-[80dvw] max-w-ixl md:h-[584px] mx-auto pt-12 md:pt-24">
        <nav className="flex flex-col md:grid md:grid-cols-[1fr_1fr_0.55fr] w-full gap-6">
          <FooterSection title="General">
            {['Home', 'Blog', 'Projects', 'Guestbook', 'Attributions'].map(
              (item) => (
                <Link
                  to="/"
                  className="link font-semibold font-title text-base"
                  key={item}
                >
                  {item}
                </Link>
              ),
            )}
          </FooterSection>
          <FooterSection title="Connect">
            {['Book a Call ↗', 'LinkedIn ↗', 'GitHub ↗'].map((item) => (
              <Link
                to="/"
                className="link font-semibold font-title text-base"
                key={item}
              >
                {item}
              </Link>
            ))}
          </FooterSection>
          <FooterSection title="Misc" className="text-sm">
            <p>
              Last deployed at <i>{__BUILD_TIME__}</i> with commit{' '}
              <b>31f5a1e</b>.
            </p>
            <p>
              Powered by <b>TanStack Start</b>.
            </p>
            <p>
              Have a nice <b>Thursday</b>!
            </p>
          </FooterSection>
        </nav>

        <div className="mt-8 md:mt-16 w-full text-center font-title text-sm text-xghoststroke">
          All Rights Reserved © 2020-{new Date().getFullYear()}
        </div>

        <div className="mt-16 md:mt-0 md:absolute z-100 bottom-0 flex w-full font-serif text-[min(14.5vw,148px)] dmd:text-[148px] text-xyellow text-center leading-[0.45]">
          NOURMAN·COM
        </div>
      </div>
    </footer>
  );
}
