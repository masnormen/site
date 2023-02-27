import dayjs from "dayjs";
import { NotionAPI } from "notion-client";
import type { Decoration, ExtendedRecordMap, PageBlock } from "notion-types";
import {
  getPageImageUrls,
  getPageProperty,
  getPageTableOfContents,
  getTextContent,
  normalizeTitle,
} from "notion-utils";

import { NotionCollectionPosts, NotionPost, PostMetadata } from "../types/notion";

const notion = new NotionAPI();

function getFirstImageOfPost(recordMap: ExtendedRecordMap, pageId: string) {
  const images = getPageImageUrls(recordMap, {
    mapImageUrl: (url, block) => {
      if (block.parent_id === pageId) return url;
      else return null;
    },
  });
  return images[0];
}

export function getPostMetadata(recordMap: ExtendedRecordMap, pageId: string): PostMetadata {
  const page = recordMap.block[pageId]?.value as PageBlock;
  const recordMapValues = Object.values(recordMap.block);

  // Get signed cover image URL
  const imageRawUrl =
    (page.format as Record<string, string>).page_cover ?? getFirstImageOfPost(recordMap, page.id) ?? "";
  const imageId = page.content?.find((x) => recordMap?.block[x]?.value?.type === "image") ?? page.id;
  const image = imageRawUrl.includes("secure.notion-static.com")
    ? `https://www.notion.so/image/${encodeURIComponent(imageRawUrl)}?table=block&id=${imageId}&cache=v2&width=800&q=75`
    : imageRawUrl;

  // Get summary based on first text block of the post
  const firstParagraph = recordMapValues.find(
    ({ value: block }) => block.parent_id === page.id && block.type === "text"
  );
  const summaryRaw = firstParagraph?.value.properties.title as Decoration[];

  // Get post date in unix timestamp
  const timestamp = getPageProperty("Date", page, recordMap) as number | undefined;

  return {
    id: page.id,
    title: getPageProperty("Title", page, recordMap),
    slug: normalizeTitle(getPageProperty("Title", page, recordMap)),
    summary: getTextContent(summaryRaw),
    cover: image,
    date: timestamp ? dayjs.unix(timestamp / 1000).format("DD/MM/YYYY") : "",
    tags: (getPageProperty("Tags", page, recordMap) as string[] | undefined)?.filter((tag) => tag.length > 0) ?? [],
    toc: getPageTableOfContents(page, recordMap).map((entry) => ({
      ...entry,
      id: entry.id.replaceAll(/-/g, ""),
    })),
  };
}

export async function getPost(postId: string): Promise<NotionPost> {
  const recordMap = await notion.getPage(postId);
  const data = getPostMetadata(recordMap, postId);
  return {
    data,
    recordMap,
  };
}

export async function getPostsFromCollection(collectionPostId: string): Promise<NotionCollectionPosts> {
  const recordMap = await notion.getPage(collectionPostId);
  const recordMapBlocks = Object.values(recordMap.block);

  const data = recordMapBlocks
    .filter(({ value: page }) => page.parent_table === "collection")
    .map(({ value: page }) => getPostMetadata(recordMap, page.id));

  return {
    data,
    recordMap,
  };
}
