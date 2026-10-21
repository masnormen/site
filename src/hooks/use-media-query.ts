import { useSyncExternalStore } from 'react';

export function useMediaQuery(query: string, { defaultValue = false }: { defaultValue?: boolean } = {}): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mediaQueryList = window.matchMedia(query);
      mediaQueryList.addEventListener('change', onChange);
      return () => mediaQueryList.removeEventListener('change', onChange);
    },
    () => window.matchMedia(query).matches,
    () => defaultValue,
  );
}
