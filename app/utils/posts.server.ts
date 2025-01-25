import fs from 'fs';
import path from 'path';
import { StringDecoder } from 'string_decoder';
import { type Post, PostMetadata } from '@/types/post';
import { getHeadings } from '@/utils/posts.client';
import { NodeResolvePlugin } from '@esbuild-plugins/node-resolve';
// @ts-ignore
import { globalExternals } from '@fal-works/esbuild-plugin-global-externals';
import { transformerColorizedBrackets } from '@shikijs/colorized-brackets';
import rehypeShiki from '@shikijs/rehype';
import {
  transformerMetaHighlight,
  transformerMetaWordHighlight,
  transformerNotationDiff,
} from '@shikijs/transformers';
import { transformerTwoslash } from '@shikijs/twoslash';
import esbuild, { type Loader, type Plugin } from 'esbuild';
import type { Element as HastElement } from 'hast';
import { bundleMDX } from 'mdx-bundler';
import remarkGfm from 'remark-gfm';
import type { ShikiTransformer } from 'shiki';

const inMemoryPlugin = ({
  entryPath,
  absoluteFiles,
}: { entryPath: string; absoluteFiles: Record<string, string> }): Plugin => ({
  name: 'inMemory',
  setup(build) {
    build.onResolve({ filter: /.*/ }, ({ path: filePath, importer }) => {
      if (filePath === entryPath) {
        return {
          path: filePath,
          pluginData: { inMemory: true, contents: absoluteFiles[filePath] },
        };
      }

      const modulePath = path.resolve(path.dirname(importer), filePath);

      if (modulePath in absoluteFiles) {
        return {
          path: modulePath,
          pluginData: { inMemory: true, contents: absoluteFiles[modulePath] },
        };
      }

      for (const ext of ['.js', '.ts', '.jsx', '.tsx', '.json', '.mdx']) {
        const fullModulePath = `${modulePath}${ext}`;
        if (fullModulePath in absoluteFiles) {
          return {
            path: fullModulePath,
            pluginData: {
              inMemory: true,
              contents: absoluteFiles[fullModulePath],
            },
          };
        }
      }

      // Return an empty object so that esbuild will handle resolving the file itself.
      return {};
    });

    build.onLoad({ filter: /.*/ }, async ({ path: filePath, pluginData }) => {
      if (pluginData === undefined || !pluginData.inMemory) {
        // Return an empty object so that esbuild will load & parse the file contents itself.
        return null;
      }

      // the || .js allows people to exclude a file extension
      const fileType = (path.extname(filePath) || '.jsx').slice(1);
      const contents = absoluteFiles[filePath];

      if (fileType === 'mdx') return null;

      let loader: Loader | undefined;

      if (
        build.initialOptions.loader &&
        build.initialOptions.loader[`.${fileType}`]
      ) {
        loader = build.initialOptions.loader[`.${fileType}`];
      } else {
        loader = fileType as Loader;
      }

      return {
        contents,
        loader,
      };
    });
  },
});

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

      const titleBlock: HastElement = {
        type: 'element',
        tagName: 'div',
        properties: {
          'data-codeblock-title': '',
        },
        children: [{ type: 'text', value: title }],
      };
      this.root.children.unshift(titleBlock);

      return hast;
    },
  };
};

export const fetchPost = async (indexMdxPath: string): Promise<Post | null> => {
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
              transformerTwoslash(),
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
  });

  const thumbnailPath = path.resolve(postFolder, 'thumbnail.tsx');
  const thumbnailContent = await fs.promises
    .readFile(thumbnailPath, { encoding: 'utf-8' })
    .then((content) => content.trim())
    .catch(() => null);

  let thumbnailCode: string | null = null;
  if (thumbnailContent) {
    const parsedMdxThumbnail = await esbuild.build({
      entryPoints: [thumbnailPath],
      write: false,
      outdir: undefined,
      publicPath: undefined,
      absWorkingDir: postFolder,
      define: { 'process.env.NODE_ENV': '"development"' },
      plugins: [
        globalExternals({
          react: {
            varName: 'React',
            type: 'cjs',
          },
          'react-dom': {
            varName: 'ReactDOM',
            type: 'cjs',
          },
          'react/jsx-runtime': {
            varName: '_jsx_runtime',
            type: 'cjs',
          },
        }),
        // eslint-disable-next-line new-cap
        NodeResolvePlugin({
          extensions: ['.js', '.ts', '.jsx', '.tsx'],
          resolveOptions: { basedir: postFolder },
        }),
        inMemoryPlugin({ entryPath: thumbnailPath, absoluteFiles: {} }),
      ],
      bundle: true,
      format: 'iife',
      globalName: 'Component',
      minify: true,
    });
    const decoder = new StringDecoder('utf8');
    const rawThumbnailCode = decoder.write(
      Buffer.from(parsedMdxThumbnail.outputFiles[0]!.contents),
    );
    if (rawThumbnailCode) {
      thumbnailCode = `${rawThumbnailCode};return Component;`;
    }
  }

  const metadata = PostMetadata.safeParse(parsedMdxContent.frontmatter);
  if (!metadata.success) return null;

  const toc = getHeadings(mdxContent);

  return {
    slug,
    metadata: metadata.data,
    toc,
    code: parsedMdxContent.code,
    thumbnailCode,
  };
};
