import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { Footer } from '@/components/layouts/footer';
import { About } from '@/components/layouts/home/about';
import { Contact } from '@/components/layouts/home/contact';
import { FeaturedPosts } from '@/components/layouts/home/featured-posts';
import { FeaturedProjects } from '@/components/layouts/home/featured-projects';
import { Hero } from '@/components/layouts/home/hero';
import { getPostList, getProjectList } from '@/services/posts';

const getPostListServerFn = createServerFn({ method: 'GET' }).handler(() =>
  getPostList(),
);

const getProjectListServerFn = createServerFn({ method: 'GET' }).handler(() =>
  getProjectList(),
);

export const Route = createFileRoute('/')({
  loader: async () => {
    const [posts, projects] = await Promise.all([
      getPostListServerFn(),
      getProjectListServerFn(),
    ]);
    return { posts, projects };
  },
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <FeaturedPosts />
      <FeaturedProjects />
      <About />
      <Contact />
      <Footer />
    </>
  );
}
