const Loading = () => {
  return (
    <div className="flex min-h-[var(--popup-min-height)] flex-col items-center justify-center gap-4 p-8">
      <div className="relative">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-[var(--border)] border-t-[var(--accent)]" />
        <div className="absolute inset-0 h-10 w-10 rounded-full bg-gradient-to-r from-[var(--accent)]/10 to-transparent blur-sm" />
      </div>
      <p className="text-sm font-medium text-[var(--text-primary)]">
        Checking page...
      </p>
      <p className="text-xs text-[var(--text-muted)]">
        Making sure you're on a GitLab compare or MR page
      </p>
    </div>
  );
};

export default Loading;
