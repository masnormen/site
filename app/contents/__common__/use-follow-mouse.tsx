import { type RefObject, useEffect, useRef } from 'react';
import { useHover } from 'usehooks-ts';

export function useFollowMouse<TRef extends HTMLElement = HTMLDivElement>({
  onlyThumbnailHover = false,
}: { onlyThumbnailHover?: boolean } = {}) {
  const ref = useRef<TRef>(null);
  const isHover = useHover(ref as RefObject<HTMLElement>);

  useEffect(() => {
    if (
      typeof document === 'undefined' ||
      typeof window === 'undefined' ||
      (onlyThumbnailHover && !isHover)
    ) {
      return;
    }

    const handleMouseMove = (event: MouseEvent) => {
      if (ref.current) {
        const x = event.pageX;
        const xFromCenter = x - window.innerWidth / 2;
        ref.current.style.setProperty(
          '--mouse-x',
          `${(xFromCenter ?? 0) * 0.02}px`,
        );

        const y = event.pageY;
        const yFromCenter = y - window.innerWidth / 2;
        ref.current.style.setProperty(
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

  return ref;
}
