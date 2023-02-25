/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import { type NextPage } from "next";
import Head from "next/head";
import { CodeBracketIcon } from "@heroicons/react/20/solid";
import { getPublicPage } from "../lib/notion-cms";
import Link from "next/link";

// export const getStaticProps = async () => {
//   const page = await getPublicPage({
//     pageId: "b62b357edb4d48f4a4fd0e9f136bf7e3",
//     apiKey: "b58a1d1bc6304018973889896243eadb",
//   });

//   const list = page.internal_page_ids;

//   return {
//     props: {
//       page,
//     },
//     revalidate: 7200, // In seconds
//   };
// };

// type HomeProps = Awaited<ReturnType<typeof getStaticProps>>["props"];

const Home = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Nourman Hajar - Software Engineer</title>
        <meta name="description" content="Nourman Hajar" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* First Segment - Landing Screen */}

      <main className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-notwhite via-quaternary to-notwhite text-stroke">
        {/* Green Rectangle */}
        <div className="animate-slowspin-30 filter-noisy absolute z-0 flex aspect-square h-3/6 max-h-[100vw] bg-tertiary md:h-4/6" />

        {/* Pink Rectangle */}
        <div className="animate-slowspin filter-noisy absolute z-0 flex aspect-square h-3/6 max-h-[100vw] bg-secondary md:h-4/6" />

        {/* Yellowish Rectangle */}
        <div className="animate-slowspin-60 filter-noisy absolute z-0 flex aspect-square h-3/6 max-h-[100vw] bg-quaternary md:h-4/6" />

        {/* Circle */}
        <div className="animate-slowspin-rev bg-pattern-wavy filter-noisy absolute z-0 flex aspect-square h-3/6 max-h-[100vw] rounded-full bg-background shadow-sm md:h-[70%]" />

        {/* Image Portrait */}
        <div className="z-10 flex h-screen w-full items-end justify-center">
          <img
            className="filter-noisier pointer-events-none h-4/6 w-fit select-none object-contain drop-shadow-2xl"
            alt="Portrait of Me"
            src="/portrait.png"
          />
        </div>

        {/* Site title */}
        <a
          href="/"
          className="absolute top-1/2 left-1/2 z-30 flex -translate-x-1/2 -translate-y-[55%]  flex-col items-center justify-center text-center"
        >
          <div className="shadow-xs drop-shadow-md duration-300 hover:-rotate-6">
            <h1 className="filter-gooey inline bg-background decoration-clone p-4 pb-3 text-center font-metana text-[12vw] leading-[1.3] text-stroke sm:text-7xl">
              Nourman
              <br />
              Hajar
            </h1>
          </div>
        </a>

        {/* Software Engineer text */}
        <div className="absolute left-1/2 top-1/4 z-20 flex -translate-x-1/2 -translate-y-3/4 flex-col items-center justify-center text-center md:top-[80%] md:-translate-y-28 md:-translate-x-64">
          <div className="mt-2 rotate-[-2deg] drop-shadow-lg duration-300 hover:rotate-[5deg]">
            <h2
              className="filter-gooey inline rounded bg-stroke decoration-clone p-3 text-center font-metana-mono text-2xl text-highlight md:text-[1.4rem]"
              aria-label="Software Engineer"
            >
              software_
              <br />
              engineer();
            </h2>
          </div>
        </div>

        {/* Indonesia text */}
        <div className="absolute right-1/2 top-3/4 z-20 flex translate-x-1/2 -translate-y-3/4 flex-col items-center justify-center text-center md:translate-x-72 md:-translate-y-16">
          <div className="mt-2 rotate-6 drop-shadow-lg duration-300 hover:-rotate-6 md:rotate-6">
            <h2 className="filter-gooey rounded bg-tertiary px-4 py-2 text-center text-lg text-stroke md:text-xl">
              from Indonesia🇮🇩
            </h2>
          </div>
        </div>
      </main>

      <div className="relative h-full w-full">
        {/* Navbar */}

        <nav className="sticky -top-28 z-50 flex w-full flex-col items-center justify-center bg-notwhite bg-opacity-10 backdrop-blur-[7px]">
          <div className="flex h-full w-full max-w-screen-lg flex-col items-stretch justify-between space-y-2 px-6 pt-32 pb-4 md:flex-row md:space-y-0 md:px-0">
            <div className="flex flex-row justify-center rounded-2xl border border-stroke bg-notwhite shadow-lg duration-500 hover:shadow-secondary">
              <Link
                href="/"
                className="flex rounded-2xl py-3 px-4 text-sm font-semibold uppercase text-stroke duration-500 hover:bg-stroke hover:text-background"
              >
                nourman.com
              </Link>
            </div>

            <div className="flex flex-row justify-center rounded-2xl border border-stroke bg-secondary shadow-lg duration-500 hover:shadow-secondary md:absolute md:left-1/2 md:-translate-x-1/2">
              <Link
                href="/"
                className="flex rounded-2xl py-3 px-4 text-sm font-semibold uppercase text-stroke duration-500 hover:bg-stroke hover:text-background"
              >
                About
              </Link>
              <Link
                href="/"
                className="flex rounded-2xl py-3 px-4 text-sm font-semibold uppercase text-stroke duration-500 hover:bg-stroke hover:text-background"
              >
                Blog
              </Link>
              <Link
                href="/"
                className="flex rounded-2xl py-3 px-4 text-sm font-semibold uppercase text-stroke duration-500 hover:bg-stroke hover:text-background"
              >
                Works
              </Link>
            </div>

            <div className="flex flex-row justify-center rounded-2xl border border-stroke bg-tertiary shadow-lg duration-500 hover:shadow-secondary">
              <Link
                href="https://github.com/masnormen"
                className="flex items-center justify-center rounded-2xl stroke-stroke py-3 px-4 text-sm font-semibold uppercase text-stroke duration-500 hover:bg-stroke hover:stroke-background hover:text-background"
              >
                GitHub <CodeBracketIcon className="ml-2 h-[1em] stroke-1" />
              </Link>
            </div>
          </div>
        </nav>

        {/* Second Segment - Blog Posts */}

        <main className="relative flex w-full flex-col items-center justify-center bg-notwhite py-28 px-6 text-stroke md:px-0">
          <div className="z-10 flex h-full w-full max-w-screen-lg flex-col items-center justify-center space-y-16">
            <div className="flex w-full flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
              <h1 className="text-center font-metana text-4xl font-bold">Thoughts ✍️</h1>
              <span className="text-center">My articles and stories (sometimes in Indonesian)</span>
            </div>

            <div className="grid grid-flow-row grid-cols-1 gap-12 md:grid-cols-2">
              {Array(5)
                .fill(0)
                .map((_, idx) => (
                  <Link href="/works/carakanjs" key={idx}>
                    <div className="group relative flex h-72 w-full transform flex-col overflow-hidden rounded-md border border-stroke bg-background text-background shadow-md duration-200 hover:shadow-2xl hover:shadow-secondary md:hover:scale-[1.02]">
                      <div
                        className="filter-noisier absolute h-full w-full rounded-md bg-cover duration-500 group-hover:scale-110"
                        style={{
                          backgroundImage:
                            "url(https://nourman.id/_next/image?url=https%3A%2F%2Fsuper-static-assets.s3.amazonaws.com%2F052634f1-a808-4548-8393-b7f38455a1ac%2Fimages%2F16071a0a-0514-4fa9-a6a2-7bd0c71fb6a9.png&w=828&q=80)",
                        }}
                      />
                      <div className="z-10 flex flex-1 flex-col justify-end space-y-2 bg-gradient-to-tr from-stroke to-[rgba(20,20,20,0.25)] p-8">
                        {/* Post Date */}
                        <div className="text-notwhite">January 13th, 2022</div>

                        {/* Title */}
                        <h2 className="text-2xl font-bold text-notwhite line-clamp-2">
                          Rust: First Impressions through the Eyes of a JS/Python coder
                        </h2>

                        {/* Tags */}
                        <div className="!mt-4 flex flex-wrap space-x-3 text-xs">
                          <span className="rounded-md bg-tertiary px-2 py-1 font-bold uppercase leading-4 text-stroke">
                            Rust
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </main>

        <main className="relative flex w-full flex-col items-center justify-center bg-background py-28 px-6 text-stroke md:px-0">
          <div className="z-10 flex h-full w-full max-w-screen-lg flex-col items-center justify-center space-y-16">
            <div className="flex w-full flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
              <h1 className="text-center font-metana text-4xl font-bold">Works 🛠️</h1>
              <span className="text-center">Things and fun projects I&lsquo;ve worked on</span>
            </div>
            {/* map... */}
          </div>
        </main>

        <main className="relative flex w-full flex-col items-center justify-center bg-notwhite py-32 px-6 text-stroke md:px-0">
          <div className="z-10 flex h-full w-full max-w-screen-lg flex-col items-center justify-between space-y-8 md:flex-row md:space-x-16 md:space-y-0">
            <div className="flex flex-col space-y-6">
              <h1 className="whitespace-nowrap font-metana text-3xl font-bold">&copy; Nourman Hajar</h1>
              <span>All rights reserved. Powered by Vercel, Next.js, Tailwind CSS, Heroicons</span>
            </div>

            <div className="rounded bg-stroke"></div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
