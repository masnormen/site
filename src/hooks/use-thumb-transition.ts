import { useAtom, useAtomValue, useSetAtom } from 'jotai';

import type { ContentType } from '@/types/post';

import { ornamentTransitionTypeAtom, thumbTransitionSlugAtom } from '@/atoms/index';
import { postTransitionName } from '@/utils/posts';

/**
 * Names a card thumbnail for the view transition only while it is the navigation's source or return target,
 * so unrelated cards stay in the root snapshot instead of floating above the page.
 */
export function useThumbTransition(slug: string, contentType: ContentType) {
  const [activeSlug, setActiveSlug] = useAtom(thumbTransitionSlugAtom);
  const setOrnamentType = useSetAtom(ornamentTransitionTypeAtom);

  return {
    thumbStyle: activeSlug === slug ? { viewTransitionName: postTransitionName(slug, 'thumb') } : undefined,
    markThumb: () => {
      setActiveSlug(slug);
      setOrnamentType(contentType);
    },
  };
}

/** Names a section sticker for the view transition only when the navigation came from that section's cards. */
export function useOrnamentTransition(contentType: ContentType) {
  const activeType = useAtomValue(ornamentTransitionTypeAtom);
  return activeType === contentType ? { viewTransitionName: `ornament-${contentType}` } : undefined;
}
