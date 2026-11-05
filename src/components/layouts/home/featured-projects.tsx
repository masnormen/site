import { getRouteApi } from '@tanstack/react-router';
import { use, useEffect, useRef, useState } from 'react';

import { SlimArrow } from '@/components/assets/shapes/lines';
import { CrossShape } from '@/components/assets/shapes/ornaments';
import { Section } from '@/components/layouts/section';
import { ProjectCard } from '@/components/posts/project-card';
import { cn } from '@/utils/cn';
import { loadThumbnails } from '@/utils/post-modules';

const indexRoute = getRouteApi('/');

const EDGE_FADE =
  'pointer-events-none absolute inset-y-0 z-10 w-16 from-xblank/0 to-xblank/90 opacity-0 backdrop-blur-[6px] transition-opacity duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] data-[visible=true]:opacity-100 sm:hidden reduced-transparency:to-xblank reduced-transparency:backdrop-blur-none';

export function FeaturedProjects() {
  const { projects } = indexRoute.useLoaderData();
  const thumbnails = use(loadThumbnails('projects'));
  const listRef = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: false, end: false });

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const update = () =>
      setEdges({
        start: list.scrollLeft > 1,
        end: list.scrollLeft + list.clientWidth < list.scrollWidth - 1,
      });
    update();
    list.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      list.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <Section
      id="projects"
      title={
        <>
          <span className="text-xblue">Projects</span> to Explore
        </>
      }
      icon={
        <CrossShape
          className="h-[70%] w-[70%] translate-x-[10%] translate-y-[20%] rotate-[25deg] text-xpink transition-transform hover:scale-120 hover:rotate-[-40deg]"
          aria-hidden="true"
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
      <div className="relative -mx-8 sm:mx-0">
        <div
          aria-hidden="true"
          data-visible={edges.start}
          className={cn(
            EDGE_FADE,
            'left-0 bg-gradient-to-l [mask-image:linear-gradient(to_left,transparent,black_75%)]',
          )}
        />
        <div
          aria-hidden="true"
          data-visible={edges.end}
          className={cn(
            EDGE_FADE,
            'right-0 bg-gradient-to-r [mask-image:linear-gradient(to_right,transparent,black_75%)]',
          )}
        />
        <div
          ref={listRef}
          data-testid="projectlist"
          className="relative isolate flex snap-x snap-mandatory scroll-px-8 [scrollbar-width:none] gap-4 overflow-x-auto px-8 py-6 sm:mx-auto sm:grid sm:w-full sm:max-w-4xl sm:grid-cols-1 sm:gap-8 sm:overflow-visible sm:p-0"
        >
          {projects.map((project, idx) => (
            <ProjectCard
              key={project.slug}
              slug={project.slug}
              title={project.title}
              description={project.description}
              tags={project.tags}
              Thumbnail={thumbnails[project.slug] ?? null}
              links={project.links}
              nth={idx}
              className="w-[80vw] max-w-sm shrink-0 snap-start sm:w-auto sm:max-w-none"
            />
          ))}

          <aside className="hidden xl:block">
            <SlimArrow className="flip absolute top-[-75px] right-[155px] hidden rotate-[60deg] text-xarrow select-none xl:block" />
            <span className="absolute top-[-95px] right-[90px] hidden rotate-12 text-center text-xs whitespace-nowrap text-xghoststroke/50 italic select-none xl:block">
              hover on
              <br />
              tech stack icon
            </span>
          </aside>
        </div>
      </div>
    </Section>
  );
}
