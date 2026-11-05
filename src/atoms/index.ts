import { atom } from 'jotai';

import type { ContentType } from '@/types/post';

export const readingTimeMsAtom = atom<number | null>(null);

export const thumbTransitionSlugAtom = atom<string | null>(null);

export const ornamentTransitionTypeAtom = atom<ContentType | null>(null);
