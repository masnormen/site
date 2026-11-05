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

/**
 * Promises are cached per key so they stay stable across renders for React's `use()`, and tagged with
 * `status`/`value` on settle so `use()` reads an already-resolved promise synchronously instead of suspending.
 */
function memoize<T>(key: string, load: () => Promise<T>) {
  if (!cache.has(key)) {
    const promise = load();
    promise.then(
      (value) => Object.assign(promise, { status: 'fulfilled', value }),
      (reason: unknown) => Object.assign(promise, { status: 'rejected', reason }),
    );
    cache.set(key, promise);
  }
  return cache.get(key) as Promise<T>;
}

/** Waits until image thumbnails are decoded, so a view transition snapshots them painted instead of blank. */
async function decodeImages(thumbnails: Array<Thumbnail | undefined>) {
  if (typeof window === 'undefined') return;
  await Promise.all(
    thumbnails
      .filter((thumbnail): thumbnail is string => typeof thumbnail === 'string')
      .map((src) => {
        const image = new Image();
        image.src = src;
        return image.decode().catch(() => undefined);
      }),
  );
}

export const loadPost = (contentType: ContentType, slug: string) =>
  memoize(`post:${contentType}/${slug}`, async () => {
    const post = await postModules[`/src/contents/${contentType}/${slug}/index.mdx`]?.();
    await decodeImages([post?.Thumbnail]);
    return post;
  });

export const loadThumbnails = (contentType: ContentType) =>
  memoize(`thumbnails:${contentType}`, async () => {
    const prefix = `/src/contents/${contentType}/`;
    const entries = await Promise.all(
      Object.entries(thumbnailModules)
        .filter(([modulePath]) => modulePath.startsWith(prefix))
        .map(async ([modulePath, load]) => [modulePath.slice(prefix.length).split('/')[0], await load()] as const),
    );
    const thumbnails = Object.fromEntries(entries) as Record<string, Thumbnail>;
    await decodeImages(Object.values(thumbnails));
    return thumbnails;
  });
