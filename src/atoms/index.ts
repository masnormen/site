import { atomWithStorage } from 'jotai/utils';
import type { THEMES } from '@/constants/themes';

export const themeAtom = atomWithStorage<keyof typeof THEMES>(
  'theme',
  'deuteranomaly',
);
