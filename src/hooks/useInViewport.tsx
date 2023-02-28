/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { type RefObject, useEffect, useState } from "react";

const useInViewport = <T extends HTMLElement = HTMLElement>(ref: RefObject<T>) => {
  const [isInViewport, setInViewport] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setInViewport(entry!.isIntersecting));
    if (ref.current) {
      observer.observe(ref.current);
    }
  }, []);
  return isInViewport;
};

export default useInViewport;
