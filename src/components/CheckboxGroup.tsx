import usePRStore from "../store/prGenerator.store";

export const CheckboxGroup = () => {
  const {
    isGenerateTitleEnabled,
    isGenerateDescriptionEnabled,
    setIsGenerateTitleEnabled,
    setIsGenerateDescriptionEnabled,
  } = usePRStore();

  return (
    <div className="flex gap-6 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--bg-card)] p-3 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.3)] hover:border-[var(--border-focus)] transition-colors duration-300">
      <label className="flex cursor-pointer items-center gap-3 text-sm text-[var(--text-primary)] transition-opacity hover:opacity-90">
        <input
          type="checkbox"
          checked={isGenerateTitleEnabled}
          onChange={(event) => setIsGenerateTitleEnabled(event.target.checked)}
        />
        <span className="font-medium">Title</span>
      </label>
      <label className="flex cursor-pointer items-center gap-3 text-sm text-[var(--text-primary)] transition-opacity hover:opacity-90">
        <input
          type="checkbox"
          checked={isGenerateDescriptionEnabled}
          onChange={(event) =>
            setIsGenerateDescriptionEnabled(event.target.checked)
          }
        />
        <span className="font-medium">Description</span>
      </label>
    </div>
  );
};
