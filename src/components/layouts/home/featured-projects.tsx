import { getRouteApi } from '@tanstack/react-router';

import { SlimArrow } from '@/components/assets/shapes/lines';
import { Section } from '@/components/layouts/section';
import { ProjectCard } from '@/components/posts/project-card';
import { getMDXExport } from '@/utils/posts';

const indexRoute = getRouteApi('/');

export function FeaturedProjects() {
  const { projects } = indexRoute.useLoaderData();

  const projectMdxThumbnails = projects.map((project) => getMDXExport(project.code).Thumbnail ?? null);

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
          className="h-[70%] w-[70%] translate-x-[10%] translate-y-[20%] rotate-[25deg] transition-transform hover:scale-120 hover:rotate-[-40deg]"
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
      <div data-testid="projectlist" className="relative mx-auto grid w-full max-w-4xl grid-cols-1 gap-12 sm:gap-8">
        {projects.map((project, idx) => {
          const Thumbnail = projectMdxThumbnails[idx];
          return (
            <ProjectCard
              key={project.slug}
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
          <SlimArrow className="flip absolute top-[-75px] right-[155px] hidden rotate-[60deg] text-xarrow select-none xl:block" />
          <span className="absolute top-[-95px] right-[90px] hidden rotate-12 text-center text-xs whitespace-nowrap text-xghoststroke/50 italic select-none xl:block">
            hover on
            <br />
            tech stack icon
          </span>
        </aside>
      </div>
    </Section>
  );
}
