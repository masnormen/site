import { getRouteApi } from '@tanstack/react-router';

import { SlimArrow } from '@/components/assets/shapes/lines';
import { CrossShape } from '@/components/assets/shapes/ornaments';
import { Section } from '@/components/layouts/section';
import { ProjectList } from '@/components/posts/project-list';
import { useOrnamentTransition } from '@/hooks/use-thumb-transition';

const indexRoute = getRouteApi('/');

export function FeaturedProjects() {
  const { projects } = indexRoute.useLoaderData();
  const iconStyle = useOrnamentTransition('projects');
  return (
    <Section
      id="projects"
      iconStyle={iconStyle}
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
      <ProjectList projects={projects}>
        <aside className="hidden xl:block">
          <SlimArrow className="flip absolute top-[-75px] right-[155px] hidden rotate-[60deg] text-xarrow select-none xl:block" />
          <span className="absolute top-[-95px] right-[90px] hidden rotate-12 text-center text-xs whitespace-nowrap text-xghoststroke/50 italic select-none xl:block">
            hover on
            <br />
            tech stack icon
          </span>
        </aside>
      </ProjectList>
    </Section>
  );
}
