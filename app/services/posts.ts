import path from 'path';
import type { Post } from '@/types/post';
import { fetchPost } from '@/utils/posts.server';
import fg from 'fast-glob';

const CONTENTS_PATH = `${process.cwd()}/app/contents` as const;

export const getPostBySlug = (slug: string) => {
  const indexMdxPath = path.resolve(CONTENTS_PATH, slug, 'index.mdx');
  return fetchPost(indexMdxPath);
};

export const getPostList = async () => {
  const indexMdxPaths = fg.globSync(
    path.resolve(CONTENTS_PATH, '**', 'index.mdx'),
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
