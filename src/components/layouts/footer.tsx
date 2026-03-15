import { Link, type LinkComponent } from '@tanstack/react-router';
import dayjs from 'dayjs';

const FOOTER_CONTENT = {
  navigate: [
    { label: 'Home', to: '/' },
    { label: 'Blog', to: '/', hash: 'blog' },
    { label: 'Projects', to: '/', hash: 'projects' },
  ],
  connect: [
    {
      label: 'Book a Call ↗',
      href: 'https://cal.com/nourman',
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
    } & Parameters<LinkComponent<'a'>>[0]
  >
>;

const FooterLink = ({
  item: { label, ...rest },
}: {
  item: {
    label: string;
  } & Parameters<LinkComponent<'a'>>[0];
}) =>
  rest.to ? (
    <Link className="link font-semibold" {...rest}>
      {label}
    </Link>
  ) : (
    <a className="link font-semibold" {...rest} target="_blank" rel="noopener noreferrer">
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
    <div className="relative font-title text-2xl leading-[1.15] font-bold">
      <img
        src="/assets/images/x-pink-blue.png"
        className="mr-3 inline-block size-6 rotate-[25deg] transition-transform hover:scale-120 hover:rotate-[-40deg]"
        draggable="false"
        loading="lazy"
        alt=""
      />
      {title}
    </div>
    <div className="mt-4 flex flex-col gap-2 *:w-fit md:mt-8 md:gap-4">{children}</div>
  </div>
);

export function Footer() {
  const deployString = dayjs(__BUILD_TIME__).format('DD MMM YYYY HH:mm:ss Z');
  const todayString = dayjs().format('dddd');

  return (
    <footer className="flex flex-col items-center justify-center overflow-hidden border-t-1 border-dashed border-xline bg-xbg">
      <div className="@container relative mx-auto flex w-[calc(100dvw-64px)] max-w-ixl flex-col items-center pt-12 sm:w-[80dvw] md:h-[532px] md:pt-24">
        <nav className="flex w-full flex-col gap-12 md:grid md:grid-cols-[1fr_1fr_0.55fr] md:gap-6">
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
                href={__BUILD_SHA__ === 'dev' ? '/' : `https://github.com/masnormen/site/commit/${__BUILD_SHA__}`}
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
          className="bottom-0 z-100 mx-auto mt-16 flex w-full justify-center text-center font-serif text-[min(11.9vw,128px)] leading-[0.7] font-medium tracking-tighter text-xghoststroke/40 italic transition-colors duration-400 select-none hover:text-xyellow md:absolute md:mt-0"
        >
          NOURMAN·COM
        </Link>
      </div>
    </footer>
  );
}
