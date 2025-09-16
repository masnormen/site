import { getRouteApi } from '@tanstack/react-router';
import { useSetAtom } from 'jotai';
import { useEffect, useMemo, useRef } from 'react';
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

  const PostContent = useMemo(
    () => getMDXExport(content.code).default,
    [content],
  );

  const postContentRef = useCalculateReadingTime();

  return (
    <Section className="py-0! md:py-0!">
      <div className="relative flex flex-col-reverse lg:grid lg:grid-cols-[1fr_216px] w-full gap-8">
        <article className="relative w-full h-full flex flex-col mx-auto max-w-4xl gap-8 pb-8 sm:py-8 lg:py-16">
          {/* Post body */}
          <div
            ref={postContentRef}
            className="markdown-body relative mx-auto flex flex-col items-start w-full"
          >
            <PostContent components={MDXSubstitution} />
          </div>
        </article>

        <aside className="relative h-full lg:border-l border-dashed border-xline">
          <TableOfContents post={content} />
        </aside>
      </div>
    </Section>
  );
}
