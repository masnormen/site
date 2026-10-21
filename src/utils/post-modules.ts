import type { MDXSubstitution } from '@/components/posts/mdx-substitution';
import type { ContentType, ThumbnailProps } from '@/types/post';

type Thumbnail = React.FC<ThumbnailProps> | string;

type PostModule = {
  default: React.FC<{ components?: typeof MDXSubstitution }>;
  Thumbnail?: Thumbnail;
};

const postModules = import.meta.glob<PostModule>('/src/contents/*/*/index.mdx');
const thumbnailModules = import.meta.glob<Thumbnail>('/src/contents/*/*/thumbnail.tsx', { import: 'Thumbnail' });

const cache = new Map<string, Promise<unknown>>();

/** Promises are cached per key so they stay stable across renders for React's `use()`. */
function memoize<T>(key: string, load: () => Promise<T>) {
  if (!cache.has(key)) cache.set(key, load());
  return cache.get(key) as Promise<T>;
}

export const loadPost = (contentType: ContentType, slug: string) =>
  memoize(
    `post:${contentType}/${slug}`,
    () => postModules[`/src/contents/${contentType}/${slug}/index.mdx`]?.() ?? Promise.resolve(undefined),
  );

export const loadThumbnails = (contentType: ContentType) =>
  memoize(`thumbnails:${contentType}`, async () => {
    const prefix = `/src/contents/${contentType}/`;
    const entries = await Promise.all(
      Object.entries(thumbnailModules)
        .filter(([modulePath]) => modulePath.startsWith(prefix))
        .map(async ([modulePath, load]) => [modulePath.slice(prefix.length).split('/')[0], await load()] as const),
    );
    return Object.fromEntries(entries) as Record<string, Thumbnail>;
  });
