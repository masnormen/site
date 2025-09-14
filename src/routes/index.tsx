import { Icon } from '@iconify/react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { CircleComplete, CircleIncomplete } from '@/components/assets/circles';
import { BigArrow, SpringyArrow, WavyGrass } from '@/components/assets/lines';
import { KiteishShape, WingishShape } from '@/components/assets/random-shape';
import { ContactButton } from '@/components/homepage/contact-button';
import { Footer } from '@/components/layouts/footer';
import { Hero } from '@/components/layouts/hero';
import { Section } from '@/components/layouts/section';
import { BlogCard } from '@/components/posts/blog-card';
import { ProjectCard } from '@/components/posts/project-card';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { getPostList, getProjectList } from '@/services/posts';
import { getMDXExport } from '@/utils/posts';

const getPostListServerFn = createServerFn({ method: 'GET' }).handler(() =>
  getPostList(),
);

const getProjectListServerFn = createServerFn({ method: 'GET' }).handler(() =>
  getProjectList(),
);

export const Route = createFileRoute('/')({
  loader: async () => {
    const [posts, projects] = await Promise.all([
      getPostListServerFn(),
      getProjectListServerFn(),
    ]);
    return { posts, projects };
  },
  component: Home,
});

function Home() {
  const { posts, projects } = Route.useLoaderData();

  const postMdxThumbnails = useMemo(
    () => posts.map((post) => getMDXExport(post.code).Thumbnail ?? null),
    [posts],
  );

  const projectMdxThumbnails = useMemo(
    () =>
      projects.map((project) => getMDXExport(project.code).Thumbnail ?? null),
    [projects],
  );

  return (
    <>
      <Hero />

      <Section
        id="blog"
        title={
          <>
            Featured <span className="text-xblue">Posts</span>
          </>
        }
        icon={
          <img
            src="/assets/images/floral-yellow-blue.png"
            className="w-full h-full rotate-[45deg] hover:rotate-[-20deg] hover:scale-120 transition-transform"
            draggable="false"
          />
        }
        description="On software engineering, web development, and random things I like."
        before={
          <>
            <BigArrow className="absolute -top-2 left-1/2 -translate-x-1/2 text-xarrow w-[50px] sm:w-[105px] rotate-90 select-none" />
            <span className="hidden sm:block absolute -top-2.5 xl:-top-3.5 left-1/2 -translate-x-1/2 text-xghoststroke italic text-xs xl:text-base select-none text-center">
              come into my digital corner! 🏡
            </span>
          </>
        }
        after={
          <Button
            asChild
            className="z-10 absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2"
          >
            <Link to="/">View All</Link>
          </Button>
        }
      >
        <div
          data-testid="bloglist"
          className="grid mx-auto w-full max-w-4xl grid-cols-1 gap-2 sm:gap-8"
        >
          {posts.map((post, idx) => {
            const Thumbnail = postMdxThumbnails[idx];
            return (
              <BlogCard
                key={idx}
                slug={post.slug}
                title={post.title}
                description={post.description}
                date={dayjs(post.createdAt).format('MMM DD, YYYY')}
                tags={post.tags}
                Thumbnail={Thumbnail}
                nth={idx}
              />
            );
          })}
        </div>
      </Section>

      <Section
        id="projects"
        title={
          <>
            <span className="text-xblue">Projects</span> to Explore
          </>
        }
        icon={
          <img
            src="/assets/images/x-pink-blue.png"
            className="w-[70%] h-[70%] rotate-[25deg] hover:rotate-[-40deg] translate-x-[10%] translate-y-[20%] hover:scale-120 transition-transform"
            draggable="false"
          />
        }
        description="Tiny fraction of things and fun projects I‘ve worked on, mostly open-source."
        after={
          <Button
            asChild
            className="z-10 absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2"
          >
            <Link to="/">View All</Link>
          </Button>
        }
      >
        <div
          data-testid="projectlist"
          className="grid mx-auto w-full max-w-4xl grid-cols-1 gap-8"
        >
          {projects.map((project, idx) => {
            const Thumbnail = projectMdxThumbnails[idx];
            return (
              <ProjectCard
                key={idx}
                slug={project.slug}
                title={project.title}
                description={project.description}
                tags={project.tags}
                Thumbnail={Thumbnail}
                links={project.links}
                nth={idx}
              />
            );
          })}
        </div>
      </Section>

      <Section
        id="about"
        title={
          <>
            Behind the <span className="text-xblue">Code</span>
          </>
        }
        icon={
          <img
            src="/assets/images/x-yellow-blue.png"
            className="w-[70%] h-[70%] rotate-[25deg] hover:rotate-[-40deg] translate-x-[10%] translate-y-[20%] hover:scale-120 transition-transform"
            draggable="false"
          />
        }
      >
        <div className="space-y-5 text-sm lg:text-base">
          <div className="group relative size-[220px] md:size-[250px] aspect-square isolate mx-auto sm:mx-0 sm:-mt-16 sm:float-right sm:ml-6 sm:mb-6 md:ml-15">
            <img
              src="/assets/images/portrait.webp"
              className="h-full w-full aspect-square relative z-10 rounded-full border-2 border-xbg shadow-lg group-hover:scale-98 group-hover:rotate-6 group-hover:shadow-2xl transition-all duration-400 "
              draggable="false"
            />
            <WingishShape className="absolute w-full h-full inline-block top-[1%] -left-[5%] scale-104 z-0 text-xyellow -rotate-24 group-hover:-rotate-45 group-hover:-top-[1%] group-hover:text-xbg transition-all duration-400" />
            <WingishShape className="absolute w-full h-full inline-block top-[1%] -left-[5%] scale-104 z-0 text-xyellow -rotate-24 group-hover:rotate-0 group-hover:-top-[1%] group-hover:text-xblue transition-all duration-400" />
          </div>
          <p className="first-letter:font-serif first-letter:font-bold first-letter:text-[48px] first-letter:leading-[1] first-letter:float-left first-letter:mr-3">
            I <b>grew up</b> surrounded by computers. I wrote my first blog at 9
            years old, installed Arch Linux (yes, the manual way) on my laptop
            at 11, and shipped my first real code at 13. Basically, I've carried
            the love for programming with me all my life, and became a Software
            Engineer.
          </p>
          <p>
            Alongside my work, I'm currently pursuing a Master's in
            Cybersecurity at Monash University on weekends. (
            <strong>Fun fact</strong>: this was made possible by a scholarship
            from a literal 😼 cat meme{' '}
            <Tooltip>
              <TooltipTrigger className="cursor-pointer">
                <a
                  className="text-xblue underline decoration-1 underline-offset-2"
                  href="https://www.instagram.com/ecommurz/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  account
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>@ecommurz on Instagram ↗</p>
              </TooltipContent>
            </Tooltip>
            ).
          </p>

          <div className="relative hidden sm:flex items-center justify-center float-left w-[30%] h-[clamp(150px,calc(200px+(1000px-100vw)*0.05),400px)] mr-6 clear-both">
            <img
              src="/assets/images/floral-red-blue.png"
              className="size-[128px] rotate-[-27deg] hover:rotate-[28deg] transition-transform"
              draggable="false"
            />
          </div>

          <p className="clear-right">
            My go-to tools for work are TypeScript and React, but I'm a
            pragmatic engineer at heart. I'm comfortable moving between
            frameworks and languages, like Svelte, Go, Python, Rust, PHP, or
            whatever tool is best suited to solve the problem at hand. Also, new
            tools are a welcome fun challenge!
          </p>
          <p>
            I'm currently based in <strong>Jakarta, Indonesia</strong>. Having
            been raised multilingually in Indonesian and Javanese, I’m also a
            fluent English speaker and have picked up some conversational
            Japanese (still practicing!).
          </p>
        </div>
      </Section>

      <Section
        id="contact"
        title={
          <>
            Like the <span className="text-xblue">Vibes</span>?
          </>
        }
        icon={
          <img
            src="/assets/images/floral-pink-blue.png"
            className="w-full h-full rotate-[45deg] hover:rotate-[-20deg] hover:scale-120 transition-transform"
            draggable="false"
          />
        }
        className="border-b-0"
      >
        <div className="grid grid-flow-row grid-rows-[auto_1fr_1fr] grid-cols-2 lg:grid-rows-[auto_1fr] lg:grid-cols-4 xl:grid-flow-col xl:grid-cols-[auto_1fr_1fr] xl:grid-rows-2 gap-2 sm:gap-4">
          <div className="group/card relative col-span-2 lg:col-span-4 xl:col-span-1 xl:row-span-2">
            <div className="flex flex-col justify-between rounded-cxl bg-xbg p-8 text-center h-full w-full z-10 relative">
              <div className="font-title text-lg lg:text-2xl text-left">
                Wanna{' '}
                <span className="text-xblue group-hover/card:font-semibold transition-all duration-400">
                  work together
                </span>{' '}
                or have{' '}
                <span className="text-xblue group-hover/card:font-semibold transition-all duration-400">
                  an idea
                </span>{' '}
                you'd like to{' '}
                <span className="text-xblue group-hover/card:font-semibold transition-all duration-400">
                  discuss
                </span>
                ?
                <SpringyArrow className="inline-flex w-[28px] h-auto md:w-[53px] align-top mt-3 ml-3 text-xred" />
              </div>

              <div className="flex flex-row items-center justify-between gap-4">
                <WavyGrass className="block min-w-1/3 text-xyellow w-[150px] group-hover/card:text-xcyan transition-all duration-400" />
                <div className="w-min text-[max(1.5rem,8cqw)] md:text-[52px] font-title font-bold leading-[1.15] text-left text-xblue uppercase group-hover/card:text-xred transition-all duration-400">
                  Let's Connect
                </div>
              </div>
            </div>

            <KiteishShape className="hidden lg:block absolute z-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xred group-hover/card:text-xarrow group-hover/card:rotate-6 transition-all duration-400" />
            <KiteishShape className="hidden lg:block absolute z-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xred group-hover/card:text-xyellow group-hover/card:-rotate-12 transition-all duration-400" />
          </div>

          <ContactButton href="https://cal.com/nourman">
            <div className="hidden sm:block relative size-16">
              <Icon
                icon="mingcute:calendar-2-fill"
                className="absolute top-0 left-0 translate-x-[35%] translate-y-[35%] text-xpink group-hover:text-xred text-4xl transition-colors duration-400"
              />
              <Icon
                icon="mdi:video"
                className="absolute top-0 left-0 translate-x-[170%] translate-y-[170%] text-xblue group-hover:text-xyellow text-xl transition-colors duration-400"
              />
              <CircleIncomplete className="text-xstroke group-hover:rotate-180 group-hover:text-xblue w-full h-full transition-all duration-400" />
            </div>
            Book a Call ↗
          </ContactButton>

          <ContactButton href="https://www.linkedin.com/in/nourmanhajar">
            <div className="hidden sm:block relative size-18">
              <Icon
                icon="mdi:linkedin"
                className="absolute top-0 left-0 translate-x-[40%] translate-y-[35%] text-xblue group-hover:text-xstroke text-[39px] transition-colors duration-400"
              />
              <CircleComplete className="text-xyellow rotate-180 group-hover:rotate-0 group-hover:text-xpink -translate-y-1 w-full h-full transition-all duration-400" />
            </div>
            LinkedIn ↗
          </ContactButton>

          <ContactButton href="https://github.com/masnormen">
            <div className="hidden sm:block relative size-18">
              <Icon
                icon="mdi:github"
                className="absolute top-0 left-0 translate-x-[40%] translate-y-[35%] text-xstroke group-hover:text-xblue text-[39px] transition-colors duration-400"
              />
              <CircleComplete className="text-xblue group-hover:rotate-180 group-hover:text-xyellow group-hover:-translate-y-1 w-full h-full transition-all duration-400" />
            </div>
            GitHub ↗
          </ContactButton>

          <ContactButton href="/">
            <div className="hidden sm:block relative size-18">
              <Icon
                icon="noto:eyes"
                className="absolute top-0 left-0 translate-x-[47%] translate-y-[45%] text-4xl"
              />
              <CircleComplete className="text-xcyan group-hover:rotate-180 group-hover:text-xred group-hover:-translate-y-1 w-full h-full transition-all duration-400" />
            </div>
            What's more?
          </ContactButton>
        </div>
      </Section>

      <Footer />
    </>
  );
}
