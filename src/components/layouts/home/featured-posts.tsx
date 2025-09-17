import { getRouteApi } from '@tanstack/react-router';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { BigArrow, SlimArrow } from '@/components/assets/shapes/lines';
import { Section } from '@/components/layouts/section';
import { BlogCard } from '@/components/posts/blog-card';
import { getMDXExport } from '@/utils/posts';

const indexRoute = getRouteApi('/');

export function FeaturedPosts() {
  const { posts } = indexRoute.useLoaderData();

  const postMdxThumbnails = useMemo(
    () => posts.map((post) => getMDXExport(post.code).Thumbnail ?? null),
    [posts],
  );

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
        data-testid="bloglist"
        className="relative grid mx-auto w-full max-w-4xl grid-cols-1 gap-2 sm:gap-8"
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

        <aside>
          <SlimArrow className="hidden lg:block absolute top-0 left-[72%] -translate-y-[100%] text-xarrow flip rotate-[60deg] select-none" />
          <span className="hidden lg:block absolute whitespace-nowrap top-0 left-4/5 -translate-y-[450%] -translate-x-[60%] text-xghoststroke/50 italic text-xs select-none text-center">
            psshh. try hovering each thumbnail!
          </span>
        </aside>
      </div>
    </Section>
  );
}
