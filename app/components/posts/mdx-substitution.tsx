import { normalizeTitle } from '@/utils/posts.client';
import type { MDXContentProps } from 'mdx-bundler/client';

const Heading = ({
  level,
  ...props
}: React.PropsWithChildren<{ level: number }>) => {
  const Tag = `h${level}` as unknown as React.FC<
    React.JSX.IntrinsicElements['h1']
  >;
  return (
    <Tag id={normalizeTitle(props.children?.toString() ?? '')} {...props} />
  );
};

export const MDXSubstitution: MDXContentProps['components'] = {
  h1: (props) => <Heading level={1} {...props} />,
  h2: (props) => <Heading level={2} {...props} />,
  h3: (props) => <Heading level={3} {...props} />,
  h4: (props) => <Heading level={4} {...props} />,
  h5: (props) => <Heading level={5} {...props} />,
  h6: (props) => <Heading level={6} {...props} />,
};
