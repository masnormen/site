import { createFileRoute } from '@tanstack/react-router';
import { Footer } from '@/components/layouts/footer';
import { About } from '@/components/layouts/home/about';
import { Contact } from '@/components/layouts/home/contact';
import { FeaturedPosts } from '@/components/layouts/home/featured-posts';
import { FeaturedProjects } from '@/components/layouts/home/featured-projects';
import { Hero } from '@/components/layouts/home/hero';
import { getContentListServerFn } from '@/services/posts';

export const Route = createFileRoute('/')({
  loader: async () => {
    const [posts, projects] = await Promise.all([
      getContentListServerFn({ data: 'blog' }),
      getContentListServerFn({ data: 'projects' }),
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
