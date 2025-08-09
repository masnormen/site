import { useHover } from '@uidotdev/usehooks';
import { useEffect, useRef } from 'react';
import { mergeRefs } from './merge-refs';

export function useFollowMouse<TRef extends HTMLElement = HTMLDivElement>({
  onlyThumbnailHover = false,
}: {
  onlyThumbnailHover?: boolean;
} = {}) {
  const refObj = useRef<TRef>(null);
  const [refCb, isHover] = useHover<TRef>();

  const mergedRef = mergeRefs(refObj, refCb);

  useEffect(() => {
    if (
      typeof document === 'undefined' ||
      typeof window === 'undefined' ||
      (onlyThumbnailHover && !isHover)
    ) {
      return;
    }

    const handleMouseMove = (event: MouseEvent) => {
      if (refObj.current) {
        const x = event.pageX;
        const xFromCenter = x - window.innerWidth / 2;
        refObj.current.style.setProperty(
          '--mouse-x',
          `${(xFromCenter ?? 0) * 0.02}px`,
        );

        const y = event.pageY;
        const yFromCenter = y - window.innerWidth / 2;
        refObj.current.style.setProperty(
          '--mouse-y',
          `${(yFromCenter ?? 0) * 0.02}px`,
        );
      }
    };
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isHover]);

  return mergedRef;
}
