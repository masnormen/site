import { z } from 'zod';

export type Post = {
  slug: string;
  metadata: PostMetadata;
  toc: Heading[];
  thumbnailCode: string | null;
  code: string;
};

export type Heading = {
  id: string;
  text: string;
  level: number;
};

export const PostMetadata = z.object({
  title: z.string(),
  description: z.string(),
  createdAt: z.coerce.date(),
  editedAt: z.coerce.date(),
  tags: z.array(z.string()).optional(),
});

export type PostMetadata = z.infer<typeof PostMetadata>;
