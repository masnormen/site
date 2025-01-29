import fs from 'fs';
import path from 'path';
import { type Post, PostMetadata } from '@/types/post';
import { getHeadings } from '@/utils/posts';
import { transformerColorizedBrackets } from '@shikijs/colorized-brackets';
import rehypeShiki from '@shikijs/rehype';
import {
  transformerMetaHighlight,
  transformerMetaWordHighlight,
  transformerNotationDiff,
} from '@shikijs/transformers';
import { transformerTwoslash } from '@shikijs/twoslash';
import { bundleMDX } from 'mdx-bundler';
import pMemoize from 'p-memoize';
import remarkGfm from 'remark-gfm';
import type { ShikiTransformer } from 'shiki';

const transformCodeblockTitle = (): ShikiTransformer => {
  function parseMetaProps(meta: string) {
    if (!meta) return null;
    const match = meta.match(/title="([^"]+)"/);
    if (!match) return null;
    return match[1];
  }
  return {
    name: '@custom/transformers:codeblock-title',
    root(hast) {
      if (!this.options.meta?.__raw) return hast;

      const title = parseMetaProps(this.options.meta.__raw);
      if (!title) return hast;

      const titleBlock = {
        type: 'element',
        tagName: 'div',
        properties: {
          'data-codeblock-title': '',
        },
        children: [{ type: 'text', value: title }],
      };

      this.root.children.unshift(
        titleBlock as (typeof this.root.children)[number],
      );

      return hast;
    },
  };
};

const _fetchPost = async (indexMdxPath: string): Promise<Post | null> => {
  'use server';
  const postFolder = path.parse(indexMdxPath).dir;
  const slug = postFolder.split('/').pop()!;

  const mdxContent = await fs.promises
    .readFile(indexMdxPath, { encoding: 'utf-8' })
    .then((content) => content.trim())
    .catch(() => null);
  if (!mdxContent) return null;

  const parsedMdxContent = await bundleMDX({
    source: mdxContent,
    cwd: postFolder,
    mdxOptions: (options) => {
      options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkGfm];
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        [
          rehypeShiki,
          {
            defaultLanguage: 'plaintext',
            inline: 'tailing-curly-colon',
            theme: 'vitesse-dark',
            transformers: [
              transformerTwoslash({
                twoslashOptions: {
                  handbookOptions: {
                    noErrorValidation: true,
                  },
                },
              }),
              transformerColorizedBrackets(),
              transformCodeblockTitle(),
              transformerMetaHighlight(),
              transformerMetaWordHighlight(),
              transformerNotationDiff({
                matchAlgorithm: 'v3',
              }),
            ],
          },
        ],
      ];
      return options;
    },
    esbuildOptions: (options) => {
      options.loader = {
        ...options.loader,
        '.png': 'dataurl',
        '.jpg': 'dataurl',
        '.jpeg': 'dataurl',
        '.webp': 'dataurl',
      };
      return options;
    },
  });

  const metadata = PostMetadata.safeParse(parsedMdxContent.frontmatter);
  if (!metadata.success) return null;

  const toc = getHeadings(mdxContent);

  return {
    slug,
    metadata: metadata.data,
    toc,
    code: parsedMdxContent.code,
  };
};

export const fetchPost = import.meta.env.DEV
  ? _fetchPost
  : pMemoize(_fetchPost);
