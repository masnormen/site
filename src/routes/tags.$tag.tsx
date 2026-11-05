import { createFileRoute, notFound } from '@tanstack/react-router';

import { FloralShape } from '@/components/assets/shapes/ornaments';
import { Footer } from '@/components/layouts/footer';
import { PageKawung } from '@/components/layouts/page-kawung';
import { Section } from '@/components/layouts/section';
import { PostList } from '@/components/posts/post-list';
import { ProjectList } from '@/components/posts/project-list';
import { TagList } from '@/components/posts/tag-list';
import { getPostsByTagServerFn, getTagsServerFn } from '@/services/posts';
import { loadThumbnails } from '@/utils/post-modules';

const count = (n: number, noun: string) => `${n} ${noun}${n === 1 ? '' : 's'}`;

const summary = (posts: number, projects: number) =>
  [posts && count(posts, 'post'), projects && count(projects, 'project')].filter(Boolean).join(' and ');

export const Route = createFileRoute('/tags/$tag')({
  component: TagPage,
  loader: async ({ params }) => {
    const [matches, tags] = await Promise.all([
      getPostsByTagServerFn({ data: { tag: params.tag } }),
      getTagsServerFn({ data: {} }),
      loadThumbnails('blog'),
      loadThumbnails('projects'),
    ]);
    if (!matches.blog.length && !matches.projects.length) throw notFound();
    return { ...matches, tags };
  },
  head: ({ params, loaderData }) => {
    const description = `${summary(loaderData?.blog.length ?? 0, loaderData?.projects.length ?? 0)} tagged #${params.tag}, by Nourman Hajar.`;
    const url = `https://nourman.com/tags/${params.tag}`;
    return {
      meta: [
        { title: `#${params.tag} • Nourman Hajar` },
        { name: 'description', content: description },
        { property: 'og:title', content: `#${params.tag} • Nourman Hajar` },
        { property: 'og:description', content: description },
        { property: 'og:url', content: url },
      ],
      links: [{ rel: 'canonical', href: url }],
    };
  },
});

function TagPage() {
  const { tag } = Route.useParams();
  const { blog, projects, tags } = Route.useLoaderData();

  return (
    <>
      <PageKawung />
      <Section
        title={
          <>
            Tagged <span className="text-xblue">#{tag}</span>
          </>
        }
        description={`${summary(blog.length, projects.length)} so far.`}
        icon={
          <FloralShape
            className="h-full w-full rotate-[45deg] text-xpink transition-transform hover:scale-120 hover:rotate-[-20deg]"
            aria-hidden="true"
          />
        }
        className="border-b-0 pt-28 sm:pt-32"
      >
        <TagList tags={tags} current={tag.toLowerCase()} />
        {blog.length > 0 && (
          <section aria-labelledby="tag-posts" className="mb-16">
            <h2 id="tag-posts" className="mb-6 font-serif text-2xl font-light text-xghoststroke">
              Posts
            </h2>
            <PostList posts={blog} />
          </section>
        )}
        {projects.length > 0 && (
          <section aria-labelledby="tag-projects">
            <h2 id="tag-projects" className="mb-6 font-serif text-2xl font-light text-xghoststroke">
              Projects
            </h2>
            <ProjectList projects={projects} />
          </section>
        )}
      </Section>
      <Footer />
    </>
  );
}
