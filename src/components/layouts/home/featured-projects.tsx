import { getRouteApi } from '@tanstack/react-router';
import { useMemo } from 'react';
import { SlimArrow } from '@/components/assets/shapes/lines';
import { Section } from '@/components/layouts/section';
import { ProjectCard } from '@/components/posts/project-card';
import { getMDXExport } from '@/utils/posts';

const indexRoute = getRouteApi('/');

export function FeaturedProjects() {
  const { projects } = indexRoute.useLoaderData();

  const projectMdxThumbnails = useMemo(
    () =>
      projects.map((project) => getMDXExport(project.code).Thumbnail ?? null),
    [projects],
  );

  return (
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
          loading="lazy"
          alt=""
        />
      }
      description="Tiny fraction of things and fun projects I‘ve worked on, mostly open-source."
      // after={
      //   <Button
      //     asChild
      //     className="z-10 absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2"
      //   >
      //     <Link to="/">View All</Link>
      //   </Button>
      // }
    >
      <div
        data-testid="projectlist"
        className="relative grid mx-auto w-full max-w-4xl grid-cols-1 gap-12 sm:gap-8"
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

        <aside>
          <SlimArrow className="hidden xl:block absolute top-[-75px] right-[155px] text-xarrow flip rotate-[60deg] select-none" />
          <span className="hidden xl:block absolute whitespace-nowrap rotate-12 top-[-95px] right-[90px] text-xghoststroke/50 italic text-xs select-none text-center">
            hover on
            <br />
            tech stack icon
          </span>
        </aside>
      </div>
    </Section>
  );
}
