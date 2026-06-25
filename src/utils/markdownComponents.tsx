const markdownComponents = {
  h1: ({ node, ...props }: any) => (
    <h1
      className="mb-3 mt-4 text-xl font-bold text-[var(--accent)]"
      {...props}
    />
  ),
  h2: ({ node, ...props }: any) => (
    <h2
      className="mb-2 mt-3 text-lg font-bold text-[var(--accent)]"
      {...props}
    />
  ),
  h3: ({ node, ...props }: any) => (
    <h3
      className="mb-2 mt-2 text-base font-bold text-[var(--accent-hover)]"
      {...props}
    />
  ),
  h4: ({ node, ...props }: any) => (
    <h4 className="mb-2 font-bold text-[var(--text-primary)]" {...props} />
  ),
  strong: ({ node, ...props }: any) => (
    <strong className="font-bold text-[var(--accent)]" {...props} />
  ),
  ul: ({ node, ...props }: any) => (
    <ul
      className="my-2 list-inside list-disc space-y-1 text-[var(--text-primary)]"
      {...props}
    />
  ),
  ol: ({ node, ...props }: any) => (
    <ol
      className="my-2 list-inside list-decimal space-y-1 text-[var(--text-primary)]"
      {...props}
    />
  ),
  li: ({ node, ...props }: any) => <li className="ml-2" {...props} />,
  p: ({ node, ...props }: any) => (
    <p className="mb-2 text-[var(--text-primary)]" {...props} />
  ),
};

export default markdownComponents;
