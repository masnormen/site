import { z } from 'zod';

export type Post = PostFrontMatter & {
  slug: string;
  toc: Heading[];
  code: string;
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
});

export type PostFrontMatter = z.infer<typeof PostFrontMatter>;
