import dayjs from 'dayjs';
import { parse as parseYaml } from 'yaml';

import { type ContentType, type Post, PostFrontMatter } from '@/types/post';
import { getHeadings } from '@/utils/posts';

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/;

function parseFrontmatter(raw: string) {
  const match = FRONTMATTER.exec(raw);
  if (!match) return { data: {}, content: raw };
  return { data: parseYaml(match[1] ?? '') ?? {}, content: raw.slice(match[0].length) };
}

const rawPosts = import.meta.glob<string>('/src/contents/*/*/index.mdx', {
  query: '?raw',
  import: 'default',
  eager: true,
});

const posts = Object.entries(rawPosts)
  .map(([modulePath, raw]) => {
    const [contentType, slug] = modulePath.split('/').slice(-3, -1) as [ContentType, string];
    const { data, content } = parseFrontmatter(raw);
    const post: Post = { ...PostFrontMatter.parse(data), slug, toc: getHeadings(content) };
    return { contentType, post };
  })
  .toSorted((a, b) => dayjs(b.post.createdAt).unix() - dayjs(a.post.createdAt).unix());

export const fetchPost = (contentType: ContentType, slug: string) =>
  posts.find((entry) => entry.contentType === contentType && entry.post.slug === slug)?.post ?? null;

export const fetchPostList = (contentType: ContentType) =>
  posts.filter((entry) => entry.contentType === contentType).map((entry) => entry.post);

const normalizeTag = (tag: string) => tag.toLowerCase();

export const fetchTags = (contentType?: ContentType) =>
  [
    ...new Set(
      posts
        .filter((entry) => !contentType || entry.contentType === contentType)
        .flatMap((entry) => (entry.post.tags ?? []).map(normalizeTag)),
    ),
  ].toSorted();

export const fetchPostsByTag = (tag: string) => {
  const matches = posts.filter((entry) => entry.post.tags?.some((t) => normalizeTag(t) === normalizeTag(tag)));
  return {
    blog: matches.filter((entry) => entry.contentType === 'blog').map((entry) => entry.post),
    projects: matches.filter((entry) => entry.contentType === 'projects').map((entry) => entry.post),
  };
};
