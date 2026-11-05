import dayjs from 'dayjs';
import { use } from 'react';

import type { Post } from '@/types/post';

import { BlogCard } from '@/components/posts/blog-card';
import { loadThumbnails } from '@/utils/post-modules';

export function PostList({ posts, children }: { posts: Post[]; children?: React.ReactNode }) {
  const thumbnails = use(loadThumbnails('blog'));

  return (
    <div data-testid="bloglist" className="relative mx-auto grid w-full max-w-4xl grid-cols-1 gap-4 sm:gap-8">
      {posts.map((post) => (
        <BlogCard
          key={post.slug}
          slug={post.slug}
          title={post.title}
          description={post.description}
          date={dayjs(post.createdAt).format('MMM DD, YYYY')}
          tags={post.tags}
          Thumbnail={thumbnails[post.slug] ?? null}
        />
      ))}
      {children}
    </div>
  );
}
