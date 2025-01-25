import { useEffect, useRef } from 'react';

export function useFollowMouse<TRef extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<TRef>(null);

  useEffect(() => {
    if (
      typeof document === 'undefined' ||
      typeof window === 'undefined'
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
  }, []);

  return ref;
}
