import usePRStore from "../store/prGenerator.store";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import markdownComponents from "../utils/markdownComponents";

export const ResultSection = () => {
  const { titleResult, descriptionResult } = usePRStore();

  if (!titleResult && !descriptionResult) return null;

  return (
    <div className="mt-2 space-y-4 border-t border-[var(--border)] pt-4">
      {titleResult && (
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
            Title
          </p>
          <div className="prose prose-sm prose-invert max-w-none rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--bg-card)] px-3.5 py-3 text-sm text-[var(--text-primary)] backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={markdownComponents}>
              {titleResult}
            </ReactMarkdown>
          </div>
        </div>
      )}

      {descriptionResult && (
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
            Description
          </p>
          <div className="prose prose-sm prose-invert max-w-none rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--bg-card)] px-3.5 py-3 text-sm leading-relaxed text-[var(--text-primary)] backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={markdownComponents}>
              {descriptionResult}
            </ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
};
