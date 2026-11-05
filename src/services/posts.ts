import { createServerFn } from '@tanstack/react-start';

import { fetchPost, fetchPostList, fetchPostsByTag, fetchTags } from '@/utils/posts.server';

export const getContentServerFn = createServerFn({ method: 'GET' })
  .validator((params: { contentType: 'blog' | 'projects'; slug: string }) => params)
  .handler(({ data }) => fetchPost(data.contentType, data.slug));

export const getContentListServerFn = createServerFn({ method: 'GET' })
  .validator((params: { contentType: 'blog' | 'projects' }) => params)
  .handler(({ data }) => fetchPostList(data.contentType));

export const getTagsServerFn = createServerFn({ method: 'GET' })
  .validator((params: { contentType?: 'blog' | 'projects' }) => params)
  .handler(({ data }) => fetchTags(data.contentType));

export const getPostsByTagServerFn = createServerFn({ method: 'GET' })
  .validator((params: { tag: string }) => params)
  .handler(({ data }) => fetchPostsByTag(data.tag));
