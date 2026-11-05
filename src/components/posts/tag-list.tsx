import { Link } from '@tanstack/react-router';

import { Chip } from '@/components/posts/chip';
import { cn } from '@/utils/cn';

export function TagList({ tags, current }: { tags: string[]; current?: string }) {
  return (
    <nav aria-label="Tags" className="mb-10 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Link
          key={tag}
          to="/tags/$tag"
          params={{ tag }}
          aria-current={tag === current ? 'page' : undefined}
          className="rounded-[10px] transition-[scale] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105 active:scale-97"
        >
          <Chip
            label={`#${tag}`}
            className={cn(
              'px-3 py-1.5 transition-colors duration-300',
              tag === current ? 'bg-xblue text-white' : 'bg-xbg text-xstroke hover:bg-xyellow hover:text-xblue',
            )}
          />
        </Link>
      ))}
    </nav>
  );
}
