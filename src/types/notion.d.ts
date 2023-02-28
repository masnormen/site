import { TableOfContentsEntry } from "notion-utils";

export interface NotionCollectionPosts {
  data: PostMetadata[];
  recordMap: ExtendedRecordMap;
}

export interface NotionPost {
  data: PostMetadata;
  recordMap: ExtendedRecordMap;
}

export interface PostMetadata {
  id: string;
  title: string;
  slug: string;
  thumbnail: string;
  hasCover: boolean;
  summary: string;
  date: string;
  tags: string[];
  toc: TableOfContentsEntry[];
}
