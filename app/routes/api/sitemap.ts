import path from 'node:path';
import { createAPIFileRoute } from '@tanstack/start/api';
import fg from 'fast-glob';

const BLOG_CONTENTS_PATH = `${process.cwd()}/app/contents/blog` as const;
const PROJECT_CONTENTS_PATH = `${process.cwd()}/app/contents/projects` as const;

const getPostSlugList = async () => {
  return fg
    .globSync(path.resolve(BLOG_CONTENTS_PATH, '**', 'index.mdx'))
    .map((indexMdxPath) => {
      const postFolder = path.parse(indexMdxPath).dir;
      const slug = postFolder.split('/').pop()!;
      return slug;
    });
};

const getProjectSlugList = async () => {
  return fg
    .globSync(path.resolve(PROJECT_CONTENTS_PATH, '**', 'index.mdx'))
    .map((indexMdxPath) => {
      const postFolder = path.parse(indexMdxPath).dir;
      const slug = postFolder.split('/').pop()!;
      return slug;
    });
};

const SitemapURLTemplate = (
  loc: string,
  lastmod: string,
  priority: string,
  changefreq: string,
) =>
  `<url>
  <loc>${loc}</loc>
  <lastmod>${lastmod}</lastmod>
  <priority>${priority}</priority>
  <changefreq>${changefreq}</changefreq>
</url>` as const;

const SitemapXMLTemplate = (urls: string[]) =>
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${urls.join('\n')}
</urlset>` as const;

export const APIRoute = createAPIFileRoute('/api/sitemap')({
  GET: async () => {
    const [postSlugs, projectSlugs] = await Promise.all([
      getPostSlugList(),
      getProjectSlugList(),
    ]);

    const date = __BUILD_TIME__;
    const sitemap = SitemapXMLTemplate([
      SitemapURLTemplate(`https://nourman.com`, date, '1.0', 'daily'),
      ...postSlugs.map((url) =>
        SitemapURLTemplate(
          `https://nourman.com/blog/${url}`,
          date,
          '0.9',
          'weekly',
        ),
      ),
      ...projectSlugs.map((url) =>
        SitemapURLTemplate(
          `https://nourman.com/projects/${url}`,
          date,
          '0.8',
          'monthly',
        ),
      ),
    ]);

    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  },
});
