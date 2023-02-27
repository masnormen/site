interface PostMetadata {
  title: string;
  slug?: string;
  cover?: string;
  summary: string;
  date: string;
  tags: string[];
  toc?: TableOfContentsEntry[];
}
