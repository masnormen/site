import { type RefObject, useEffect, useState } from "react";

const useInViewport = <T extends HTMLElement = HTMLElement>(ref: RefObject<T>, rootMargin?: string) => {
  const [isInViewport, setInViewport] = useState(false);
  useEffect(() => {
    const current = ref.current;

    const observer = new IntersectionObserver(
      ([e]) => {
        const entry = e as IntersectionObserverEntry;
        setInViewport(entry.isIntersecting);
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin,
      },
    );
    if (current) {
      observer.observe(current);
    }
    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [ref, rootMargin]);
  return isInViewport;
};

export default useInViewport;
