import path from 'path';
import type { Post } from '@/types/post';
import { fetchPost } from '@/utils/posts';
import { createServerFn } from '@tanstack/start';
import fg from 'fast-glob';

const CONTENTS_PATH = `${process.cwd()}/app/contents` as const;

export const getPostBySlug = createServerFn({ method: 'GET' })
  .validator((slug: string) => slug)
  .handler(({ data: slug }) => {
    const indexMdxPath = path.resolve(CONTENTS_PATH, slug, 'index.mdx');
    return fetchPost(indexMdxPath);
  });

export const getPostList = createServerFn({ method: 'GET' }).handler(
  async () => {
    const indexMdxPaths = fg.globSync(
      path.resolve(CONTENTS_PATH, '**', 'index.mdx'),
    );
    const postList = await Promise.all(
      indexMdxPaths.map((indexMdxPath) => fetchPost(indexMdxPath)),
    );
    return postList
      .filter((post): post is Post => !!post)
      .map(({ metadata, toc }) => ({ metadata, toc }));
  },
);
