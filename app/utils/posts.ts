import fs from 'fs';
import path from 'path';
import { type Heading, type Post, PostMetadata } from '@/types/post';
import { bundleMDX } from 'mdx-bundler';

export const fetchPost = async (indexMdxPath: string): Promise<Post | null> => {
  const postFolder = path.parse(indexMdxPath).dir;

  const mdxContent = await fs.promises.readFile(indexMdxPath, { encoding: 'utf-8' }).catch(() => null);
  if (!mdxContent) return null;

  const parsedMdx = await bundleMDX({
    source: mdxContent,
    cwd: postFolder,
  });
  const metadata = PostMetadata.parse(parsedMdx.frontmatter);
  const toc = getHeadings(mdxContent);

  return { metadata, toc, code: parsedMdx.code };
};

export const getHeadings = (content: string): Heading[] => {
  const HEADING_REGEX = /^#+\s+/;
  return content
    .split('\n')
    .filter((line) => line.match(HEADING_REGEX))
    .map((line) => ({
      id: normalizeTitle(line),
      text: line.replace(HEADING_REGEX, ''),
      level: line.split(/\s/).shift()?.length ?? 1,
    }));
};

export const normalizeTitle = (title: string): string => {
  return title
    .replaceAll(' ', '-')
    .replaceAll(/[^\dA-Za-z\u3000-\u303F\u3041-\u3096\u30A1-\u30FC\u4E00-\u9FFF\uAC00-\uD7AF-]/g, '')
    .replaceAll('--', '-')
    .replace(/-$/, '')
    .replace(/^-/, '')
    .trim()
    .toLowerCase();
};
