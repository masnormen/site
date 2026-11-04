import { useAtom } from 'jotai';

import { thumbTransitionSlugAtom } from '@/atoms/index';
import { postTransitionName } from '@/utils/posts';

/**
 * Names a card thumbnail for the view transition only while it is the navigation's source or return target,
 * so unrelated cards stay in the root snapshot instead of floating above the page.
 */
export function useThumbTransition(slug: string) {
  const [activeSlug, setActiveSlug] = useAtom(thumbTransitionSlugAtom);

  return {
    thumbStyle: activeSlug === slug ? { viewTransitionName: postTransitionName(slug, 'thumb') } : undefined,
    markThumb: () => setActiveSlug(slug),
  };
}
