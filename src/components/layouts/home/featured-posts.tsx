import { getRouteApi } from '@tanstack/react-router';
import dayjs from 'dayjs';

import { BigArrow, SlimArrow } from '@/components/assets/shapes/lines';
import { Section } from '@/components/layouts/section';
import { BlogCard } from '@/components/posts/blog-card';
import { getMDXExport } from '@/utils/posts';

const indexRoute = getRouteApi('/');

export function FeaturedPosts() {
  const { posts } = indexRoute.useLoaderData();

  const postMdxThumbnails = posts.map((post) => getMDXExport(post.code).Thumbnail ?? null);

  return (
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
          className="h-full w-full rotate-[45deg] transition-transform hover:scale-120 hover:rotate-[-20deg]"
          draggable="false"
          loading="lazy"
          alt=""
        />
      }
      description="On software engineering, web development, and random things I like."
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
      <div data-testid="bloglist" className="relative mx-auto grid w-full max-w-4xl grid-cols-1 gap-2 sm:gap-8">
        {posts.map((post, idx) => {
          const Thumbnail = postMdxThumbnails[idx];
          return (
            <BlogCard
              key={post.slug}
              slug={post.slug}
              title={post.title}
              description={post.description}
              date={dayjs(post.createdAt).format('MMM DD, YYYY')}
              tags={post.tags}
              Thumbnail={Thumbnail}
            />
          );
        })}

        <aside>
          <SlimArrow className="flip absolute top-[-75px] right-[155px] hidden rotate-[60deg] text-xarrow select-none xl:block" />
          <span className="absolute top-[-95px] right-[80px] hidden -rotate-6 text-center text-xs whitespace-nowrap text-xghoststroke/50 italic select-none xl:block">
            psshh. try hovering
            <br />
            on each thumbnail!
          </span>
        </aside>
      </div>
    </Section>
  );
}
