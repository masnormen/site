import { z } from 'zod';

export type ContentType = 'blog' | 'projects';

export type Post = PostFrontMatter & {
  slug: string;
  toc: Heading[];
};

export type Heading = {
  id: string;
  text: string;
  level: number;
};

export type ThumbnailProps = React.HTMLAttributes<HTMLDivElement> & {
  isHover: boolean;
};

export const PostFrontMatter = z.object({
  title: z.string(),
  description: z.string(),
  createdAt: z.coerce.date(),
  tags: z.array(z.string()).optional(),
  links: z.array(z.string().url()).optional(),
});

export type PostFrontMatter = z.infer<typeof PostFrontMatter>;
