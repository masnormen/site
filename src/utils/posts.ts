import type { Heading } from '@/types/post';

import React from 'react';
import ReactDOM from 'react-dom';
import _jsx_runtime from 'react/jsx-runtime';

export const HEADING_REGEX = /^#+\s+/;

/**
 * Based on mdx-bundler's `getMDXExport` function by Kent C. Dodds
 * @see https://github.com/kentcdodds/mdx-bundler
 */
export function getMDXExport(code: string) {
  const scope = {
    React,
    ReactDOM,
    _jsx_runtime,
  };
  const fn = new Function(...Object.keys(scope), code);
  return fn(...Object.values(scope));
}

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
