import { createFileRoute, Link } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { BigArrow } from '@/components/assets/big-arrow';
import { Footer } from '@/components/layouts/footer';
import { Hero } from '@/components/layouts/hero';
import { Section } from '@/components/layouts/section';
import { BlogCard } from '@/components/posts/blog-card';
import { ProjectCard } from '@/components/posts/project-card';
import { Button } from '@/components/ui/button';
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

      <Footer />
    </>
  );
}
