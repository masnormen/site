import { getRouteApi } from '@tanstack/react-router';
import { useSetAtom } from 'jotai';
import { useEffect, useRef } from 'react';

import { readingTimeMsAtom } from '@/atoms/index';
import { Section } from '@/components/layouts/section';
import { MDXSubstitution } from '@/components/posts/mdx-substitution';
import { TableOfContents } from '@/components/posts/toc';
import { getMDXExport } from '@/utils/posts';

const postRoute = getRouteApi('/$contentType/$slug');

const useCalculateReadingTime = () => {
  const setReadingTimeMs = useSetAtom(readingTimeMsAtom);
  const postContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (postContentRef.current) {
      const clone = postContentRef.current.cloneNode(true) as HTMLDivElement;
      clone.querySelectorAll('pre, code').forEach((el) => el.remove());
      const text = clone.innerText;
      const wordsPerMinute = 250;
      const words = text.trim().split(/\s+/).length;
      const time = Math.ceil((words / wordsPerMinute) * 60 * 1000);
      setReadingTimeMs(time);
    }
  }, []);

  return postContentRef;
};

export function PostBody() {
  const content = postRoute.useLoaderData();

  const PostContent = getMDXExport(content.code).default;

  const postContentRef = useCalculateReadingTime();

  return (
    <Section className="py-0! md:py-0!">
      <div className="relative flex w-full flex-col-reverse gap-8 lg:grid lg:grid-cols-[1fr_216px]">
        <article className="relative mx-auto flex h-full w-full max-w-4xl flex-col gap-8 pb-8 sm:py-8 lg:py-16">
          {/* Post body */}
          <div ref={postContentRef} className="markdown-body relative mx-auto flex w-full flex-col items-start">
            <PostContent components={MDXSubstitution} />
          </div>
        </article>

        <aside className="border-xline relative h-full border-dashed lg:border-l">
          <TableOfContents post={content} />
        </aside>
      </div>
    </Section>
  );
}
