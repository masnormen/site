import path from 'node:path';
import dayjs from 'dayjs';
import pMemoize from 'p-memoize';
import type { Post } from '@/types/post';

const _fetchPost = async (
  contentType: 'blog' | 'projects',
  slug: string,
): Promise<Post | null> => {
  const { default: mdxCode } = await import(
    `../../dist/${contentType}/${slug}/index.js?raw`
  );
  const { default: metadata } = await import(
    `../../dist/${contentType}/${slug}/index.json`
  );

  return {
    ...(metadata as Omit<Post, 'code' | 'slug'>),
    slug,
    code: mdxCode as string,
  };
};

export const fetchPost = import.meta.env.DEV
  ? _fetchPost
  : pMemoize(_fetchPost, {
      cacheKey: ([contentType, slug]) => `${contentType}/${slug}`,
    });

const _fetchPostList = async (contentType: 'blog' | 'projects') => {
  const modules =
    // Glob import can't use dynamic segments, so we need to use two separate import
    contentType === 'blog'
      ? import.meta.glob(`../../dist/blog/**/index.js`, {
          query: '?raw',
          import: 'default',
        })
      : import.meta.glob(`../../dist/projects/**/index.js`, {
          query: '?raw',
          import: 'default',
        });

  const postList = await Promise.all(
    Object.entries(modules).map(async ([modulePath, module]) => {
      const slug = path.parse(path.dirname(modulePath)).base;
      const mdxCode = await module();
      const metadata = await import(
        `../../dist/${contentType}/${slug}/index.json`
      );

      return {
        ...(metadata as Omit<Post, 'code' | 'slug'>),
        slug,
        code: mdxCode as string,
      };
    }),
  );

  return postList
    .filter((post): post is Post => !!post)
    .sort((a, b) => dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix());
};

export const fetchPostList = import.meta.env.DEV
  ? _fetchPostList
  : pMemoize(_fetchPostList);
