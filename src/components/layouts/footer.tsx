import { Link, type LinkComponent } from '@tanstack/react-router';

const FOOTER_CONTENT = {
  navigate: [
    { label: 'Home', to: '/' },
    { label: 'Blog', to: '/', hash: 'blog' },
    { label: 'Projects', to: '/', hash: 'projects' },
    // { type: 'internal', label: 'Guestbook', to: '/guestbook' },
    // { type: 'internal', label: 'Attributions', to: '/attributions' },
  ],
  connect: [
    {
      label: 'Book a Call ↗',
      href: 'https://calendly.com/nourman-hajar/30min',
    },
    {
      label: 'LinkedIn ↗',
      href: 'https://www.linkedin.com/in/nourmanhajar/',
    },
    {
      label: 'GitHub ↗',
      href: 'https://github.com/masnormen',
    },
  ],
} as const satisfies Record<
  string,
  Array<
    {
      label: string;
    } & Parameters<LinkComponent<'a', string>>[0]
  >
>;

const FooterLink = ({
  item: { label, ...rest },
}: {
  item: {
    label: string;
  } & Parameters<LinkComponent<'a', string>>[0];
}) =>
  rest.to ? (
    <Link className="link font-semibold" {...rest}>
      {label}
    </Link>
  ) : (
    <a
      className="link font-semibold"
      {...rest}
      target="_blank"
      rel="noopener noreferrer"
    >
      {label}
    </a>
  );

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
    <div className="relative font-title font-bold text-2xl leading-[1.15]">
      <img
        src="/assets/images/x-pink-blue.png"
        className="inline-block mr-3 size-6 rotate-[25deg] hover:rotate-[-40deg] hover:scale-120 transition-transform"
        draggable="false"
      />
      {title}
    </div>
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
          <FooterSection title="Navigate">
            {FOOTER_CONTENT.navigate.map((item) => (
              <FooterLink item={item} key={item.label} />
            ))}
          </FooterSection>
          <FooterSection title="Connect">
            {FOOTER_CONTENT.connect.map((item) => (
              <FooterLink item={item} key={item.label} />
            ))}
          </FooterSection>
          <FooterSection title="Misc" className="text-sm">
            <p>
              Last deployed at <i>{__BUILD_TIME__}</i> with commit{' '}
              <b>{__BUILD_SHA__.slice(0, 8)}</b>.
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
