import { useEffect, useState } from 'react';

function getWindowSize() {
  if (typeof window === 'undefined') return { width: 0, height: 0 };
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export function useWindowSize() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowSize());

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowSize());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}
