import type { MDXContentProps } from 'mdx-bundler/client';

const Paragraph = (props: React.PropsWithChildren) => (
  <p
    className="w-full whitespace-pre-wrap break-words p-1 px-0.5 my-1.75"
    {...props}
  />
);

export const MDXSubstitution: MDXContentProps['components'] = {
  p: Paragraph,
};
