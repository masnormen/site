import { Footer } from '@/components/layouts/footer';
import { Hero } from '@/components/layouts/hero';
import { Section } from '@/components/layouts/section';
import { ArticleCard } from '@/components/posts/article-card';
import { getPostList, getProjectList } from '@/services/posts';
import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/start';
import dayjs from 'dayjs';
import { getMDXExport } from 'mdx-bundler/client';
import { useMemo } from 'react';

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
        title="Blog"
        description="On software engineering, web development, and random tech stuff"
        className="border-tertiary border-t-2 border-dashed bg-blank"
      >
        <div
          data-testid="bloglist"
          className="grid mx-auto w-full max-w-4xl grid-cols-1 gap-8"
        >
          {posts.map((post, idx) => {
            const Thumbnail = postMdxThumbnails[idx];
            return (
              <ArticleCard
                key={idx}
                className="bg-blank"
                type="blog"
                slug={post.slug}
                title={post.metadata.title}
                description={post.metadata.description}
                date={dayjs(post.metadata.createdAt).format('MMM DD, YYYY')}
                tags={post.metadata.tags ?? []}
                Thumbnail={Thumbnail}
                dir={idx % 2 === 0 ? 'ltr' : 'rtl'}
              />
            );
          })}
        </div>
      </Section>

      <Section
        id="works"
        title="Projects"
        description="Things and fun projects I&lsquo;ve worked on, mostly open-source"
        className="border-tertiary border-t-2 border-dashed bg-background"
      >
        <div
          data-testid="projectlist"
          className="grid mx-auto w-full max-w-4xl grid-cols-1 gap-8"
        >
          {projects.map((project, idx) => {
            const Thumbnail = projectMdxThumbnails[idx];
            return (
              <ArticleCard
                key={idx}
                className="bg-blank"
                type="projects"
                slug={project.slug}
                title={project.metadata.title}
                description={project.metadata.description}
                date={dayjs(project.metadata.createdAt).format('MMM DD, YYYY')}
                tags={project.metadata.tags ?? []}
                Thumbnail={Thumbnail}
                dir="ltr"
              />
            );
          })}
        </div>
      </Section>

      <Footer />
    </>
  );
}
