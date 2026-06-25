import { AiOutlineExclamationCircle } from "react-icons/ai";
import type { ErrorProps } from "../../interfaces/commonComponents.interface";

const Error = ({ error }: ErrorProps) => {
  return (
    <div className="flex min-h-[var(--popup-min-height)] flex-col gap-4 p-6">
      <div className="flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-red-500">
          <AiOutlineExclamationCircle size={18} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-red-600 dark:text-red-400">
            Something went wrong
          </p>
          <p className="mt-0.5 text-xs text-[var(--text-muted)]" role="alert">
            {error}
          </p>
        </div>
      </div>
      <p className="text-center text-xs text-[var(--text-muted)]">
        Try refreshing the extension or opening a new tab
      </p>
    </div>
  );
};

export default Error;
