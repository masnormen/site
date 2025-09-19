import { createServerFn } from '@tanstack/react-start';
import { fetchPost, fetchPostList } from '@/utils/posts.server';

export const getContentServerFn = createServerFn({ method: 'GET' })
  .validator(
    (params: { contentType: 'blog' | 'projects'; slug: string }) => params,
  )
  .handler(({ data }) => fetchPost(data.contentType, data.slug));

export const getContentListServerFn = createServerFn({ method: 'GET' })
  .validator((contentType: 'blog' | 'projects') => contentType)
  .handler(({ data: tag }) => fetchPostList(tag));
