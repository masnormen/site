import { getRouteApi } from '@tanstack/react-router';

import { BigArrow, SlimArrow } from '@/components/assets/shapes/lines';
import { FloralShape } from '@/components/assets/shapes/ornaments';
import { Section } from '@/components/layouts/section';
import { PostList } from '@/components/posts/post-list';
import { useOrnamentTransition } from '@/hooks/use-thumb-transition';

const indexRoute = getRouteApi('/');

export function FeaturedPosts() {
  const { posts } = indexRoute.useLoaderData();
  const iconStyle = useOrnamentTransition('blog');

  return (
    <Section
      id="blog"
      iconStyle={iconStyle}
      title={
        <>
          Featured <span className="text-xblue">Posts</span>
        </>
      }
      icon={
        <FloralShape
          className="h-full w-full rotate-[45deg] text-xyellow transition-transform hover:scale-120 hover:rotate-[-20deg]"
          aria-hidden="true"
        />
      }
      description="On software engineering, building with AI, and random things I like."
      before={
        <>
          <BigArrow className="absolute -top-2 left-1/2 w-[50px] -translate-x-1/2 rotate-90 text-xarrow select-none sm:w-[105px]" />
          <span className="absolute -top-2.5 left-1/2 hidden -translate-x-1/2 text-center text-xs text-xghoststroke italic select-none sm:block xl:-top-3.5 xl:text-base">
            come into my digital corner! 🏡
          </span>
        </>
      }
      // after={
      //   <Button
      //     asChild
      //     className="z-10 absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2"
      //   >
      //     <Link to="/">View All</Link>
      //   </Button>
      // }
    >
      <PostList posts={posts}>
        <aside>
          <SlimArrow className="flip absolute top-[-75px] right-[155px] hidden rotate-[60deg] text-xarrow select-none xl:block" />
          <span className="absolute top-[-95px] right-[80px] hidden -rotate-6 text-center text-xs whitespace-nowrap text-xghoststroke/50 italic select-none xl:block">
            psshh. try hovering
            <br />
            on each thumbnail!
          </span>
        </aside>
      </PostList>
    </Section>
  );
}
