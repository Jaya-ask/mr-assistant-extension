import useApiKeyStore from "../store/apiKey.store";

export const Header = () => {
  const { setApiKey } = useApiKeyStore();
  return (
    <header className="flex flex-col border-b border-[var(--border)] pb-5 gap-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--bg-elevated)] p-1 ring-1 ring-[var(--border)] shadow-[0_0_20px_var(--accent-glow)] overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)] to-[var(--accent-end)] opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
            <img src="/icons/ai-pr-icon.png" alt="MR Assistant Logo" className="w-full h-full object-cover relative z-10" />
          </div>
          <h1 className="text-xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-[var(--text-secondary)]">
            MR Assistant
          </h1>
        </div>
        <button
          className="text-xs font-light text-[var(--accent)] hover:text-white transition-colors duration-150 focus:outline-none cursor-pointer"
          onClick={() => setApiKey(null)}>
          <p>Change API Key</p>
        </button>
      </div>
      <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
        Generate clean MR titles & descriptions from your changes
      </p>
    </header>
  );
};
