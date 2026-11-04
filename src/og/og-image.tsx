// oxlint-disable jsx_a11y/alt-text
import { Renderer } from '@takumi-rs/core';
import { fromJsx } from '@takumi-rs/helpers/jsx';
import { twj } from 'tw-to-css';

import type { ContentType, Post } from '@/types/post';

import { WavyGrass } from '@/components/assets/shapes/lines';
import { FLORAL_YELLOW_BLUE, GLOBE_ICON, LINE_DASHED } from '@/constants/datauri';
import { fetchPostList } from '@/utils/posts.server';

const FONT_CSS = 'https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;600;700';

const SECTION_LABEL: Record<ContentType, string> = { blog: 'Blog', projects: 'Projects' };

function OgImage({ content }: { content?: { post: Post; contentType: ContentType } }) {
  return (
    <div
      style={{
        ...twj`w-full h-full flex flex-col bg-[#F6F5F1] text-black`,
        fontFamily: 'Instrument Sans',
      }}
    >
      <div style={twj`flex flex-row justify-between h-full pt-[84px] pb-[64px] px-[96px]`}>
        <div style={twj`flex flex-col items-start justify-between pb-6 h-full`}>
          <div style={twj`flex flex-row items-start justify-center ${content ? 'gap-5' : 'gap-8'}`}>
            <WavyGrass style={twj`text-[#FD1E1F] ${content ? 'w-[73px] h-[57px]' : 'w-[180px] h-[139px]'}`} />
            <div
              style={{
                ...twj`font-bold text-[#0015D4] uppercase leading-[1] ${content ? 'mt-0.5' : 'mt-2'}`,
                fontSize: content ? '28px' : '64px',
                width: '140px',
              }}
            >
              Nourman Hajar
            </div>
            {content && (
              <div
                style={{
                  ...twj`font-bold text-[#7a7a7a] uppercase leading-[1] mt-0.5`,
                  fontSize: '28px',
                  width: '240px',
                }}
              >
                /&nbsp;&nbsp;&nbsp;{SECTION_LABEL[content.contentType]}
              </div>
            )}
          </div>

          {content ? (
            <div style={{ ...twj`text-[48px] w-[658px]`, fontWeight: 600 }}>{content.post.title}</div>
          ) : (
            <div style={{ ...twj`text-[36px] w-[658px]`, fontWeight: 300 }}>
              A blog on software engineering, web development, life, and miscellaneous tech stuff
            </div>
          )}
        </div>

        <div style={twj`flex flex-col h-full items-center justify-center`}>
          <img src={FLORAL_YELLOW_BLUE} style={twj`w-[294px] h-[294px] rotate-[28deg] -mt-4`} />
        </div>
      </div>

      <img src={LINE_DASHED} />

      <div style={twj`w-full h-[140px] bg-[#ECECEC] px-[96px]`}>
        <div style={twj`flex w-full h-full items-center justify-between`}>
          <div style={twj`text-[28px] uppercase font-light text-[#a9a9a9]`}>Read more at →</div>
          <div style={twj`flex flex-row items-center`}>
            <img src={GLOBE_ICON} style={twj`w-[40px] h-[40px] ml-auto`} />
            <div style={twj`text-[32px] font-semibold text-[#0015D4] ml-4`}>nourman.com</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Fetches Instrument Sans from Google Fonts, so the build needs network access. */
export async function renderOgImages(): Promise<{ fileName: string; source: Uint8Array }[]> {
  const renderer = new Renderer();
  const download = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Instrument Sans download failed (${res.status}): ${url}`);
    return res;
  };
  // Without a browser User-Agent, Google serves full unsubsetted TTFs, so glyphs like → are included.
  const css = await (await download(FONT_CSS)).text();
  const faces = [...css.matchAll(/font-weight: (\d+);[^}]*?src: url\((\S+?)\)/g)];
  if (faces.length === 0) throw new Error('No Instrument Sans faces found in Google Fonts CSS');
  await Promise.all(
    faces.map(async ([, weight, url]) =>
      renderer.registerFont({
        name: 'Instrument Sans',
        weight: Number(weight),
        data: await (await download(url!)).arrayBuffer(),
      }),
    ),
  );

  const render = async (fileName: string, content?: { post: Post; contentType: ContentType }) => {
    const { node, css } = await fromJsx(<OgImage content={content} />);
    const source = await renderer.render(node, { width: 1200, height: 630, format: 'png', css });
    return { fileName, source: new Uint8Array(source) };
  };

  const contentTypes: ContentType[] = ['blog', 'projects'];
  return Promise.all([
    render('og/home.png'),
    ...contentTypes.flatMap((contentType) =>
      fetchPostList(contentType).map((post) => render(`og/${contentType}/${post.slug}.png`, { post, contentType })),
    ),
  ]);
}
