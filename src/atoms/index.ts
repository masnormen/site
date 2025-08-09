import type { THEMES } from '@/constants/themes';
import { atomWithStorage } from 'jotai/utils';

export const themeAtom = atomWithStorage<keyof typeof THEMES>(
  'theme',
  'deuteranomaly',
);
