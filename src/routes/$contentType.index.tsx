import { createFileRoute, notFound } from '@tanstack/react-router';

import { CrossShape, FloralShape } from '@/components/assets/shapes/ornaments';
import { Footer } from '@/components/layouts/footer';
import { PageKawung } from '@/components/layouts/page-kawung';
import { Section } from '@/components/layouts/section';
import { PostList } from '@/components/posts/post-list';
import { ProjectList } from '@/components/posts/project-list';
import { TagList } from '@/components/posts/tag-list';
import { useOrnamentTransition } from '@/hooks/use-thumb-transition';
import { getContentListServerFn, getTagsServerFn } from '@/services/posts';
import { loadThumbnails } from '@/utils/post-modules';

const COPY = {
  blog: {
    name: 'Blog',
    title: (
      <>
        All <span className="text-xblue">Posts</span>
      </>
    ),
    description: 'On software engineering, building with AI, and random things I like.',
  },
  projects: {
    name: 'Projects',
    title: (
      <>
        <span className="text-xblue">Projects</span> to Explore
      </>
    ),
    description: 'Things and fun projects I‘ve worked on, mostly open-source.',
  },
} as const;

export const Route = createFileRoute('/$contentType/')({
  component: ContentIndex,
  params: {
    parse: (params) => {
      if (params.contentType === 'blog' || params.contentType === 'projects') {
        return params as { contentType: 'blog' | 'projects' };
      }
      throw notFound();
    },
  },
  loader: async ({ params }) => {
    const [items, tags] = await Promise.all([
      getContentListServerFn({ data: { contentType: params.contentType } }),
      getTagsServerFn({ data: { contentType: params.contentType } }),
      loadThumbnails(params.contentType),
    ]);
    return { items, tags };
  },
  head: ({ params }) => {
    const { name, description } = COPY[params.contentType];
    const url = `https://nourman.com/${params.contentType}`;
    return {
      meta: [
        { title: `${name} • Nourman Hajar` },
        { name: 'description', content: description },
        { property: 'og:title', content: `${name} • Nourman Hajar` },
        { property: 'og:description', content: description },
        { property: 'og:url', content: url },
      ],
      links: [{ rel: 'canonical', href: url }],
    };
  },
});

function ContentIndex() {
  const { contentType } = Route.useParams();
  const { items, tags } = Route.useLoaderData();
  const { title, description } = COPY[contentType];
  const iconStyle = useOrnamentTransition(contentType);

  return (
    <>
      <PageKawung />
      <Section
        id={contentType}
        iconStyle={iconStyle}
        title={title}
        description={description}
        icon={
          contentType === 'blog' ? (
            <FloralShape
              className="h-full w-full rotate-[45deg] text-xyellow transition-transform hover:scale-120 hover:rotate-[-20deg]"
              aria-hidden="true"
            />
          ) : (
            <CrossShape
              className="h-[70%] w-[70%] translate-x-[10%] translate-y-[20%] rotate-[25deg] text-xpink transition-transform hover:scale-120 hover:rotate-[-40deg]"
              aria-hidden="true"
            />
          )
        }
        className="border-b-0 pt-28 sm:pt-32"
      >
        <TagList tags={tags} />
        {contentType === 'blog' ? <PostList posts={items} /> : <ProjectList projects={items} />}
      </Section>
      <Footer />
    </>
  );
}
