import dayjs from "dayjs";
import { NotionAPI } from "notion-client";
import type { Decoration, PageBlock } from "notion-types";
import { getPageProperty, getTextContent, normalizeTitle } from "notion-utils";

export async function getPostList(collectionPostId: string) {
  const notion = new NotionAPI();
  const recordMap = await notion.getPage(collectionPostId);
  const blocks = Object.values(recordMap.block);

  const posts: Required<Omit<PostMetadata, "toc">>[] = blocks
    .filter(({ value: page }) => page.parent_table === "collection")
    .map(({ value: page }) => {
      const pageBlock = recordMap.block[page.id]?.value as PageBlock;

      const imageRaw = (page.format as Record<string, string>).page_cover ?? "";
      const image = imageRaw.includes("secure.notion-static.com")
        ? `https://www.notion.so/image/${encodeURIComponent(imageRaw)}?table=block&id=${
            pageBlock.id
          }&cache=v2&width=600&q=75`
        : imageRaw;

      const summaryRaw = blocks.find(({ value: block }) => block.parent_id === page.id && block.type === "text")?.value
        .properties.title as Decoration[];

      return {
        title: getPageProperty("Title", pageBlock, recordMap),
        slug: normalizeTitle(getPageProperty("Title", pageBlock, recordMap)),
        summary: getTextContent(summaryRaw),
        cover: image,
        date: dayjs.unix((getPageProperty("Date", pageBlock, recordMap) as number) / 1000).format("DD/MM/YYYY"),
        tags: (getPageProperty("Tags", pageBlock, recordMap) as string[]).filter((tag) => tag.length > 0),
      };
    });

  return posts;
}
