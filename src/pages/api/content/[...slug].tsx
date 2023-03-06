import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

const fontNormal = "Plus Jakarta Sans";
const jakartaFont = fetch(new URL("../../../../public/fonts/static/PlusJakartaSans-Regular.ttf", import.meta.url)).then(
  (res) => res.arrayBuffer()
);
const jakartaFontBold = fetch(
  new URL("../../../../public/fonts/static/PlusJakartaSans-ExtraBold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

export default async function handler(req: NextRequest) {
  try {
    const slugs = req.nextUrl.searchParams.getAll("slug").map((slug) => decodeURI(slug));

    const [type, rawTitle, rawTags] = slugs as [string, string, string];
    const title = rawTitle.length > 70 ? `${rawTitle.replace(/^(.{70}[^\s]*).*/, "$1")}...` : rawTitle;
    const tags = rawTags ? rawTags.split(",") : [];

    return new ImageResponse(
      (
        <div
          tw="flex relative flex-col p-16 w-full h-full justify-between items-start"
          style={{
            fontFamily: fontNormal,
            backgroundColor: "#e5e5f7",
            backgroundImage: "linear-gradient(to top right, #e4efee, #ffc4a8)",
            color: "#003023",
          }}
        >
          <div tw="flex flex-row w-full mt-4">
            <span tw="inline-flex rounded-3xl border border-[#003023] bg-[#a1c9c9] px-5 py-3 font-extrabold uppercase text-lg leading-none">
              {type.toLocaleLowerCase() === "blog" ? "✍️" : "🛠️"} {type}
            </span>
            {tags.map((tag) => (
              <span
                key={tag}
                tw="ml-4 inline-flex rounded-3xl border border-[#003023] bg-[#a1c9c9] px-5 py-3 font-extrabold uppercase text-lg leading-none"
              >
                {tag}
              </span>
            ))}
          </div>
          <div tw="flex flex-1 w-full justify-center flex-col">
            <div
              tw="flex leading-[1.25] font-bold text-[75px] tracking-tighter"
              style={{
                fontFamily: fontNormal,
                fontSize: title.length > 55 ? "75px" : "90px",
                backgroundClip: "text",
                color: "transparent",
                background: "linear-gradient(to top left, #831818, #af1c5e)",
              }}
            >
              {title}
            </div>
          </div>
          <div tw="flex items-center w-full justify-between">
            <div tw="flex text-3xl font-extrabold" style={{ fontFamily: fontNormal }}>
              <span tw="mt-1 mr-2">🚀</span> nourman.com
            </div>
            <div tw="flex items-center text-xl" style={{ fontFamily: fontNormal }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width={28} height={28}>
                <g fill="currentColor">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                </g>
              </svg>
              <div tw="flex mb-1 ml-2">masnormen</div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        emoji: "noto",
        fonts: [
          {
            name: fontNormal,
            data: await jakartaFont,
            weight: 400,
            style: "normal",
          },
          {
            name: fontNormal,
            data: await jakartaFontBold,
            weight: 800,
            style: "normal",
          },
        ],
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(`Failed to generate image`, {
      status: 500,
    });
  }
}
