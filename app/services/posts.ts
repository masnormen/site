import path from 'path';
import type { Post } from '@/types/post';
import { fetchPost } from '@/utils/posts.server';
import fg from 'fast-glob';

const BLOG_CONTENTS_PATH = `${process.cwd()}/app/contents/blog` as const;
const PROJECTS_CONTENTS_PATH =
  `${process.cwd()}/app/contents/projects` as const;

export const getPostBySlug = (slug: string) => {
  console.log({ BLOG_CONTENTS_PATH, PROJECTS_CONTENTS_PATH });
  const indexMdxPath = path.resolve(BLOG_CONTENTS_PATH, slug, 'index.mdx');
  return fetchPost(indexMdxPath);
};

export const getPostList = async () => {
  console.log({ BLOG_CONTENTS_PATH, PROJECTS_CONTENTS_PATH });
  const indexMdxPaths = fg.globSync(
    path.resolve(BLOG_CONTENTS_PATH, '**', 'index.mdx'),
  );
  const postList = await Promise.all(
    indexMdxPaths.map((indexMdxPath) => fetchPost(indexMdxPath)),
  );
  return postList
    .filter((post): post is Post => !!post)
    .sort(
      (a, b) => b.metadata.createdAt.getTime() - a.metadata.createdAt.getTime(),
    );
};

export const getProjectBySlug = (slug: string) => {
  const indexMdxPath = path.resolve(PROJECTS_CONTENTS_PATH, slug, 'index.mdx');
  return fetchPost(indexMdxPath);
};

export const getProjectList = async () => {
  const indexMdxPaths = fg.globSync(
    path.resolve(PROJECTS_CONTENTS_PATH, '**', 'index.mdx'),
  );
  const projectList = await Promise.all(
    indexMdxPaths.map((indexMdxPath) => fetchPost(indexMdxPath)),
  );
  return projectList
    .filter((post): post is Post => !!post)
    .sort(
      (a, b) => b.metadata.createdAt.getTime() - a.metadata.createdAt.getTime(),
    );
};
