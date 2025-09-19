// import { Renderer } from '@takumi-rs/core';
// import { fromJsx } from '@takumi-rs/helpers/jsx';
import { createServerFileRoute } from '@tanstack/react-start/server';
import { twj } from 'tw-to-css';
import { WavyGrass } from '@/components/assets/shapes/lines';
import {
  FLORAL_YELLOW_BLUE,
  GLOBE_ICON,
  LINE_DASHED,
} from '@/constants/datauri';
import { getContentServerFn } from '@/services/posts';
import type { Post } from '@/types/post';

function _OgImage({ content }: { content?: Post | null }) {
  return (
    <div
      style={{
        ...twj`w-full h-full flex flex-col bg-[#F6F5F1] text-black`,
        fontFamily: 'Instrument Sans',
      }}
    >
      <div
        style={{
          ...twj`flex flex-row justify-between h-full pt-[84px] pb-[64px] px-[96px]`,
        }}
      >
        <div style={twj`flex flex-col items-start justify-between pb-6 h-full`}>
          <div
            style={twj`flex flex-row items-start justify-center ${content ? 'gap-5' : 'gap-8'}`}
          >
            <WavyGrass
              style={twj`text-[#FD1E1F] ${content ? 'w-[73px] h-[57px]' : 'w-[180px] h-[139px]'}`}
            />
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
                  ...twj`font-bold text-[#7a7a7a] uppercase leading-[1] ${content ? 'mt-0.5' : 'mt-2'}`,
                  fontSize: content ? '28px' : '64px',
                  width: '200px',
                }}
              >
                /&nbsp;&nbsp;&nbsp;Blog
              </div>
            )}
          </div>

          {content ? (
            <div style={{ ...twj`text-[48px] w-[658px]`, fontWeight: 600 }}>
              {content.title}
            </div>
          ) : (
            <div style={{ ...twj`text-[36px] w-[658px]`, fontWeight: 300 }}>
              A blog on software engineering, web development, life, and
              miscellaneous tech stuff
            </div>
          )}
        </div>

        <div style={twj`flex flex-col h-full items-center justify-center`}>
          <img
            src={FLORAL_YELLOW_BLUE}
            style={twj`w-[294px] h-[294px] rotate-[28deg] -mt-4`}
            draggable="false"
          />
        </div>
      </div>

      <img src={LINE_DASHED} />

      <div style={twj`w-full h-[140px] text-red-500 bg-[#ECECEC] px-[96px]`}>
        <div style={twj`flex w-full h-full items-center justify-between`}>
          <div
            style={twj`text-[28px] uppercase font-semibold font-light text-[#a9a9a9]`}
          >
            Read more at →
          </div>
          <div style={twj`flex flex-row items-center`}>
            <img src={GLOBE_ICON} style={twj`w-[40px] h-[40px] ml-auto`} />
            <div style={twj`text-[32px] font-semibold text-[#0015D4] ml-4`}>
              nourman.com
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const ServerRoute = createServerFileRoute(
  '/opengraph/{-$contentType}/{-$slug}',
).methods(() => ({
  GET: async ({ request, params }) => {
    const content = await (async () => {
      const { contentType, slug } = params;
      if (!contentType) {
        return 'home';
      }
      if (contentType !== 'blog' && contentType !== 'projects') {
        return null;
      }
      if (!slug) {
        return null;
      }

      const content = await getContentServerFn({
        data: {
          contentType,
          slug,
        },
      });
      if (!content) return null;

      return content;
    })();

    if (content == null) {
      return new Response(
        JSON.stringify({
          message: 'Not found',
        }),
        {
          status: 404,
        },
      );
    }

    return new Response('Not implemented', { status: 501 });

    // const node = await fromJsx(
    //   <OgImage content={content === 'home' ? null : content} />,
    // );
    // const renderer = new Renderer({
    //   loadDefaultFonts: true,
    //   fonts: [
    //     {
    //       name: 'Instrument Sans',
    //       data: await fetch(
    //         'https://fonts.gstatic.com/s/instrumentsans/v4/pxitypc9vsFDm051Uf6KVwgkfoSbSnNPooZAN0lInHGpCWNu15GRqXp6pQ.woff2',
    //       )
    //         .then((res) => res.arrayBuffer())
    //         .then((buf) => Buffer.from(buf)),
    //       style: 'italic',
    //       weight: 400,
    //     },
    //     {
    //       name: 'Instrument Sans',
    //       data: await fetch(
    //         'https://fonts.gstatic.com/s/instrumentsans/v4/pxiTypc9vsFDm051Uf6KVwgkfoSxQ0GsQv8ToedPibnr0SZe1ZuWi3g.woff2',
    //       )
    //         .then((res) => res.arrayBuffer())
    //         .then((buf) => Buffer.from(buf)),
    //       style: 'normal',
    //       weight: 400,
    //     },
    //   ],
    // });

    // const buffer = await renderer.renderAsync(node, {
    //   width: 1200,
    //   height: 630,
    //   format: 'webp',
    // });
    // const res = new Uint8Array(buffer);

    // return new Response(res, {
    //   status: 200,
    //   headers: {
    //     'Content-Type': 'image/png',
    //     'Cache-Control': 'public, max-age=31536000',
    //   },
    // });
  },
}));
