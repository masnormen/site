import fs from 'node:fs';
import path from 'node:path';
import dayjs from 'dayjs';
import pMemoize from 'p-memoize';
import glob from 'tiny-glob';
import type { Post } from '@/types/post';

const _fetchPost = async (
  contentType: 'blog' | 'projects',
  slug: string,
): Promise<Post | null> => {
  try {
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
  } catch (error) {
    console.error(`Error fetching post: ${error}`);
    return null;
  }
};

export const fetchPost = import.meta.env.DEV
  ? _fetchPost
  : pMemoize(_fetchPost, {
      cacheKey: ([contentType, slug]) => `${contentType}/${slug}`,
    });

const _fetchPostList = async (contentType: 'blog' | 'projects') => {
  const modulePaths =
    // Glob import can't use dynamic segments, so we need to use two separate import
    contentType === 'blog'
      ? await glob(path.resolve(process.cwd(), `dist/blog/**/index.js`))
      : await glob(path.resolve(process.cwd(), `dist/projects/**/index.js`));

  const postList = await Promise.all(
    modulePaths.map(async (modulePath) => {
      const slug = path.parse(path.dirname(modulePath)).base;
      const mdxCode = fs.readFileSync(modulePath, 'utf-8');
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
