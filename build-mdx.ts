import fs from 'node:fs';
import path from 'node:path';
import { parseArgs } from 'node:util';
import { PostFrontMatter } from '@/types/post';
import { getHeadings } from '@/utils/posts';
import { NodeResolvePlugin } from '@esbuild-plugins/node-resolve';
import { globalExternals } from '@fal-works/esbuild-plugin-global-externals';
import mdxESBuild from '@mdx-js/esbuild';
import { transformerColorizedBrackets } from '@shikijs/colorized-brackets';
import rehypeShiki from '@shikijs/rehype';
import {
  transformerMetaHighlight,
  transformerMetaWordHighlight,
  transformerNotationDiff,
} from '@shikijs/transformers';
import { transformerTwoslash } from '@shikijs/twoslash';
import esbuild, { type BuildOptions } from 'esbuild';
import FastGlob from 'fast-glob';
import grayMatter, { type GrayMatterFile } from 'gray-matter';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import type { ShikiTransformer } from 'shiki';

const DIST_PATH = path.resolve(process.cwd(), 'dist');

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

/**
 * Based on mdx-bundler's `bundleMDX` function by Kent C. Dodds
 * @see https://github.com/kentcdodds/mdx-bundler
 */
function getBuildOptions({ sourcePaths }: { sourcePaths: string[] }) {
  const entryPoints = [] as Array<{
    entryPath: string;
    slug: string;
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    grayMatter: GrayMatterFile<any>;
  }>;

  for (const source of sourcePaths) {
    entryPoints.push({
      slug: path.parse(source).dir.split('/').pop()!,
      entryPath: source,
      grayMatter: grayMatter.read(source),
    });
  }

  const buildOptions: BuildOptions = {
    entryPoints: entryPoints.map((entry) => entry.entryPath),
    write: false,
    outdir: DIST_PATH,
    absWorkingDir: process.cwd(),
    define: {
      'process.env.NODE_ENV': JSON.stringify(
        // biome-ignore lint/nursery/noProcessEnv: needed
        process.env.NODE_ENV ?? 'production',
      ),
    },
    loader: {
      '.png': 'dataurl',
      '.jpg': 'dataurl',
      '.jpeg': 'dataurl',
      '.webp': 'dataurl',
    },
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
      NodeResolvePlugin({
        extensions: ['.js', '.ts', '.jsx', '.tsx'],
        // resolveOptions: { basedir: cwd },
      }),
      mdxESBuild({
        remarkPlugins: [
          remarkFrontmatter,
          [remarkMdxFrontmatter, { name: 'frontmatter' }],
          remarkGfm,
        ],
        rehypePlugins: [
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
        ],
      }),
      {
        name: 'output-mdx-and-metadata',
        setup(build) {
          build.onStart(() => {
            console.info('[mdx] 🔄 Building files...');
          });

          build.onEnd(async (result) => {
            if (result.errors.length > 0) {
              console.error(result.errors);
              throw new Error('[mdx] Failed to bundle MDX content');
            }

            if (fs.existsSync(DIST_PATH)) {
              await fs.promises.rm(DIST_PATH, { recursive: true });
            } else {
              await fs.promises.mkdir(DIST_PATH, { recursive: true });
            }

            console.info('[mdx] 💿 Writing files...');

            await Promise.all(
              result.outputFiles?.map(async (file) => {
                const slug = path.parse(file.path).dir.split('/').pop();
                if (!slug) {
                  throw new Error('[mdx] Failed to bundle MDX content');
                }

                const grayMatter = entryPoints.find(
                  (entry) => entry.slug === slug,
                )?.grayMatter;
                if (!grayMatter) {
                  throw new Error('[mdx] Failed to bundle MDX content');
                }

                const frontmatter = PostFrontMatter.safeParse(grayMatter?.data);
                if (!frontmatter.success) {
                  throw new Error('[mdx] Failed to bundle MDX content');
                }

                const metadata = {
                  ...frontmatter.data,
                  slug,
                  toc: getHeadings(grayMatter.content),
                };
                const metadataPath = file.path.replace(/\.js$/, '.json');

                await fs.promises.mkdir(path.parse(metadataPath).dir, {
                  recursive: true,
                });

                await Promise.all([
                  fs.promises.writeFile(file.path, file.contents),
                  fs.promises.writeFile(
                    metadataPath,
                    JSON.stringify(metadata, null, 2),
                  ),
                ]);
              }) ?? [],
            );
            console.info('[mdx] ✅ Finished building');
          });
        },
      },
    ],
    footer: {
      js: 'return Component;',
    },
    bundle: true,
    format: 'iife',
    globalName: 'Component',
    minify: true,
  };

  return buildOptions;
}

const { values: cmdArgs } = parseArgs({
  options: {
    watch: {
      type: 'boolean',
      short: 'w',
    },
  },
});

const sourcePaths = FastGlob.globSync(
  path.resolve(process.cwd(), './app/contents/**/index.mdx'),
);

if (cmdArgs.watch) {
  const ctx = await esbuild.context(getBuildOptions({ sourcePaths }));
  await ctx.watch();
} else {
  await esbuild.build(getBuildOptions({ sourcePaths }));
}
