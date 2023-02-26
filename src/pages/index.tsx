/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import { type NextPage } from "next";
import Head from "next/head";
import { CodeBracketIcon } from "@heroicons/react/20/solid";
import { getPublicPage } from "../lib/notion-cms";
import Link from "next/link";
import ArticleCard from "../components/ArticleCard";
import Section from "../components/Section";
import ProjectCard from "../components/ProjectCard";

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

      <main className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-notwhite via-quaternary to-notwhite">
        {/* Green Rectangle */}
        <div className="animate-slowspin-30 filter-noisy absolute z-0 flex aspect-square h-3/6 max-h-[100vw] bg-tertiary md:h-4/6" />

        {/* Pink Rectangle */}
        <div className="animate-slowspin filter-noisy absolute z-0 flex aspect-square h-3/6 max-h-[100vw] bg-secondary md:h-4/6" />

        {/* Yellowish Rectangle */}
        <div className="animate-slowspin-60 filter-noisy absolute z-0 flex aspect-square h-3/6 max-h-[100vw] bg-quaternary md:h-4/6" />

        {/* Circle */}
        <div className="animate-slowspin-rev bg-pattern-wavy filter-noisy absolute z-0 flex aspect-square h-3/6 max-h-[100vw] items-center justify-center rounded-full bg-background shadow-sm md:h-[70%]">
          <svg
            viewBox="0 0 100 100"
            className="aspect-square h-[80%] font-mono text-[0.38rem] font-bold uppercase text-stroke opacity-20"
          >
            <defs>
              <path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
            </defs>
            <text fill="currentColor">
              <textPath xlinkHref="#circle">Lorem ipsum dolor sit amet consectetur adipiscing elit !</textPath>
            </text>
          </svg>
        </div>

        {/* Image Portrait */}
        <div className="z-10 flex h-screen w-full items-end justify-center">
          <img
            className="filter-noisier pointer-events-none ml-1 h-4/6 w-fit select-none object-contain drop-shadow-2xl md:ml-2"
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
            <h1 className="filter-gooey inline bg-background decoration-clone p-4 pb-3 text-center font-fancy text-[12vw] leading-[1.3] tracking-wide text-stroke sm:text-7xl">
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
              className="filter-gooey inline rounded bg-stroke decoration-clone p-3 text-center font-mono text-2xl text-highlight md:text-[1.4rem]"
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
            <h2 className="filter-gooey whitespace-nowrap rounded bg-tertiary px-4 py-2 text-center text-lg text-stroke">
              based in Indonesia 🇮🇩
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

        <Section
          title="Thoughts ✍️"
          description="My articles and stories (sometimes in Indonesian)"
          className="bg-notwhite"
        >
          <div className="grid w-full grid-flow-row grid-cols-1 gap-16 md:grid-cols-2">
            {Array(5)
              .fill(0)
              .map((_, idx) => (
                <ArticleCard
                  key={idx}
                  href="/"
                  title="Rust: First Impressions through the Eyes of a JS/Python coder"
                  summary="As a web developer, using 3rd party resources is extremely common. We use 3rd party JavaScripts all the time, either via npm, bundled into our code, or via <script> tag (e.g.: Google Analytics, etc). Embedding 3rd party images/media is also pretty common. Even linking to a 3rd party sites can have security implications! Let's go over some of the more common attack vectors when using 3rd party resources, what problems they may cause, and how to mitigate them"
                  date="13/01/2022"
                  // tags={["Rust", "TypeScript"]}
                  thumbnail="https://nourman.id/_next/image?url=https%3A%2F%2Fsuper-static-assets.s3.amazonaws.com%2F052634f1-a808-4548-8393-b7f38455a1ac%2Fimages%2F16071a0a-0514-4fa9-a6a2-7bd0c71fb6a9.png&w=828&q=80"
                />
              ))}
          </div>
        </Section>

        <Section
          title="Projects 🛠️"
          description="Things and fun projects I&lsquo;ve worked on"
          className="bg-background"
        >
          <div className="grid w-full grid-flow-row grid-cols-1 gap-16 md:grid-cols-2">
            {Array(5)
              .fill(0)
              .map((_, idx) => (
                <ProjectCard
                  key={idx}
                  href="/"
                  title="SIPERAT"
                  tags={["Rust", "TypeScript"]}
                  thumbnail="https://super-static-assets.s3.amazonaws.com/052634f1-a808-4548-8393-b7f38455a1ac/images/c2e71a4d-a8cf-474b-9d40-d92f20499450.png?b=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAQCAIAAAD4YuoOAAAACXBIWXMAAAsTAAALEwEAmpwYAAADAElEQVQ4jZ1Uz0/TUBzvyX9D48WDdy9eFo8mJmqIR28mBsMBE40xDAQuEDNI9EBgovwKI4MxJzCGYQMHhB+DAQtr6+vr2reuNHTrhCC03TA1b2WsHaDG5JOX9+P7vp/vb0IFzH+C/uOxDEJj4N8B/kHmko9lAlCBChhzNaGZ2s3XKuEzbuuNXdhCwECVhhrD6hyvsSkNlsByeC1LqxRQaYCjQQEMHBlwtrdRlmlKBJUH9iBJJuejYGUNrMaY1TVyaUmMrWsMa0rrQqaQyeBVFAuiqPMIH1Eag0fYLGswKwSmdYDROT6f2Fmenc0rStEwioZBbmzQC4say6k0o/NoqaM70twRbXk3/7ptoaF929Udb+6UAqFUzyDs6JEDMzqPKq5U54Bhjyl6bswnZ7M/JYkMh/nYunFyEg2F+MUlDbI6Qt6nr5quO1qvOQbuP+m+9WDycX3vzbtfa2q/3H60+bxFDs5iAgpY/SBOow8YjeXQyprH44nH44ok7aXTWUFIIzQ5PT0/MaHSUOf4pPdz0Nm+3tV3SNEJ99COe+h7nxcOjO6GwsKwX4NsQRSrqu7UA0wAWSm+qeRykiQlIZRkmc1kKAAKhQLc2lYpWoMpORhWgpGDb8uSL7gXDCvhxezMnOgL7vqnc7NRwRPIeCdUktYYFteLLckAajCVia0fqqphGNHejzXElc6HNb+OjgzDALEN/I1NJd92x50u0tVDdbp32rpIlzvR+n43EEr7psTxKX7IL3gncYgshWvJAWQz8a1Qf3/91RsOgrhDEA6CuEcQ3sbGjUjE/AZ7R6B7mBsYAz1D8NNI6oMn1T+m80gXBB2VKkoQqiq1lIOyB/ntxGiDc/BZ3bjzjc/Z6G9qHnnxsr+2LuEP6BxvlpmOENbI83hFCDcNKPVHGbZGq+5kyBZlpZjfL2ZzGLJSVH4U8/s6SuMklVJV0VXeV9e+fVrYOtm05ZikjykLSFqlsXbrOLGNigtHyMWdfN4Wq/S5MXCpXoukfZpe5uyF07Tq8hL53wbxFGfb7E1VAAAAAElFTkSuQmCC?w=1500&f=webp"
                />
              ))}
          </div>
        </Section>

        <main className="relative flex w-full flex-col items-center justify-center bg-notwhite py-32 px-6 text-stroke md:px-0">
          <div className="z-10 flex h-full w-full max-w-screen-lg flex-col items-center justify-between space-y-8 md:flex-row md:space-x-16 md:space-y-0">
            <div className="relative flex h-full w-fit items-center justify-center md:ml-4">
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-lg font-bold leading-tight">
                &copy;{new Date().getFullYear()}
                <br />
                Nourman
                <br />
                Hajar
              </span>
              <svg
                viewBox="0 0 100 100"
                className="animate-fastspin aspect-square h-48 font-mono text-lg font-bold text-stroke"
              >
                <defs>
                  <path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                </defs>
                <text fill="currentColor">
                  <textPath xlinkHref="#circle">🛌 ☕️ 🚚 🔥 🧑‍💻 📦 👀 🪲</textPath>
                </text>
              </svg>
            </div>
            <div className="flex flex-col space-y-6 md:text-right">
              All rights reserved.
              <br />
              Powered by Next.js and Tailwind CSS.
              <br />
              Icons by Heroicons. Colors by Happyhues.
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
