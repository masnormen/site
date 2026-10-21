import type { ShikiTransformer } from 'shiki';
import type { Plugin } from 'vite';

import mdxRollup from '@mdx-js/rollup';
import { transformerColorizedBrackets } from '@shikijs/colorized-brackets';
import rehypeShiki from '@shikijs/rehype';
import { transformerMetaHighlight, transformerMetaWordHighlight, transformerNotationDiff } from '@shikijs/transformers';
import { createTransformerFactory, rendererRich } from '@shikijs/twoslash';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import { createTwoslasher } from 'twoslash';
import ts from 'typescript-6';

function parseMetaProps(meta: string) {
  if (!meta) return null;
  const match = meta.match(/title="([^"]+)"/);
  if (!match) return null;
  return match[1];
}

const transformCodeblockTitle = (): ShikiTransformer => {
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

      this.root.children.unshift(titleBlock as (typeof this.root.children)[number]);

      return hast;
    },
  };
};

export function mdx(): Plugin {
  const { transform, ...plugin } = mdxRollup({
    remarkPlugins: [remarkFrontmatter, remarkGfm],
    rehypePlugins: [
      [
        rehypeShiki,
        {
          defaultLanguage: 'plaintext',
          inline: 'tailing-curly-colon',
          theme: 'vitesse-dark',
          transformers: [
            createTransformerFactory(
              createTwoslasher({
                // twoslash is typed against the root `typescript` (v7, which has no JS API)
                tsModule: ts as never,
                tsLibDirectory: path.dirname(fileURLToPath(import.meta.resolve('typescript-6'))),
                compilerOptions: { moduleResolution: ts.ModuleResolutionKind.Bundler },
              }),
              rendererRich(),
            )({
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
    ],
  });

  return {
    ...(plugin as Plugin),
    enforce: 'pre',
    transform: {
      // @mdx-js/rollup ignores the query, so `?raw` imports would otherwise be compiled too
      filter: { id: /\.mdx$/ },
      handler: transform,
    },
  };
}
