import { Link, type LinkComponent } from '@tanstack/react-router';
import dayjs from 'dayjs';
import { useMemo } from 'react';

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
  const deployString = useMemo(
    () => dayjs(__BUILD_TIME__).format('DD MMM YYYY HH:mm:ss Z'),
    [],
  );
  const todayString = useMemo(() => dayjs().format('dddd'), []);
  return (
    <footer className="flex flex-col items-center overflow-hidden justify-center bg-xbg border-t-1 border-dashed border-xline">
      <div className="@container relative flex flex-col items-center w-[calc(100dvw-64px)] sm:w-[80dvw] max-w-ixl md:h-[532px] mx-auto pt-12 md:pt-24">
        <nav className="flex flex-col md:grid md:grid-cols-[1fr_1fr_0.55fr] w-full gap-12 md:gap-6">
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
              Last deployed at <i>{deployString}</i> with commit{' '}
              <a
                href={
                  __BUILD_SHA__ === 'dev'
                    ? '/'
                    : `https://github.com/masnormen/site/commit/${__BUILD_SHA__}`
                }
                className="link font-semibold"
              >
                {__BUILD_SHA__.slice(0, 8)}
              </a>
              .
            </p>
            <p>
              Have a nice <b>{todayString}</b>!
            </p>
          </FooterSection>
        </nav>

        <div className="mt-16 w-full text-center font-title text-sm text-xghoststroke">
          All rights reserved © 2020-{new Date().getFullYear()}
        </div>

        <Link
          to="/"
          className="mt-16 md:mt-0 mx-auto md:absolute z-100 bottom-0 flex justify-center w-full font-serif tracking-tighter text-[min(11.9vw,128px)] font-medium italic text-xghoststroke/40 text-center leading-[0.7] transition-colors duration-400 select-none hover:text-xyellow"
        >
          NOURMAN·COM
        </Link>
      </div>
    </footer>
  );
}
