import { fetchPost, fetchPostList } from '@/utils/posts.server';

export const getPostBySlug = (slug: string) => {
  return fetchPost('blog', slug);
};

export const getPostList = async () => {
  return fetchPostList('blog');
};

export const getProjectBySlug = (slug: string) => {
  return fetchPost('projects', slug);
};

export const getProjectList = async () => {
  return fetchPostList('projects');
};
