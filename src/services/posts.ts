import { createServerFn } from '@tanstack/react-start';
import { fetchPost, fetchPostList } from '@/utils/posts.server';

export const getContentServerFn = createServerFn({ method: 'GET' })
  .inputValidator(
    (params: { contentType: 'blog' | 'projects'; slug: string }) => params,
  )
  .handler(({ data }) => fetchPost(data.contentType, data.slug));

export const getContentListServerFn = createServerFn({ method: 'GET' })
  .inputValidator(
    (params: { contentType: 'blog' | 'projects' }) => params,
  )
  .handler(({ data }) => fetchPostList(data.contentType));
