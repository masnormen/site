import type { Heading } from '@/types/post';

export const HEADING_REGEX = /^#+\s+/;

export const normalizeTitle = (title: string): string => {
  return title
    .replaceAll(' ', '-')
    .replaceAll(
      /[^\dA-Za-z\u3000-\u303F\u3041-\u3096\u30A1-\u30FC\u4E00-\u9FFF\uAC00-\uD7AF-]/g,
      '',
    )
    .replaceAll('--', '-')
    .replace(/-$/, '')
    .replace(/^-/, '')
    .trim()
    .toLowerCase();
};

export const getHeading = (line: string): Heading => ({
  id: normalizeTitle(line),
  text: line.replace(HEADING_REGEX, ''),
  level: line.split(/\s/).shift()?.length ?? 1,
});

export const getHeadings = (content: string) => {
  return content
    .split('\n')
    .filter((line) => line.match(HEADING_REGEX))
    .map(getHeading);
};
