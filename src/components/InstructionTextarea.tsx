import usePRStore from "../store/prGenerator.store";
import handleGenerate from "../utils/handleGenerate";

export const InstructionTextarea = () => {
  const {
    isGenerateDescriptionEnabled,
    instructions,
    setInstructions,
    isLoading,
    isGenerateTitleEnabled,
  } = usePRStore();

  const textChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInstructions(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      event.key === "Enter" &&
      !isLoading &&
      (isGenerateTitleEnabled || isGenerateDescriptionEnabled)
    ) {
      event.preventDefault();
      handleGenerate();
    }
  };

  return (
    <textarea
      value={instructions}
      onChange={textChangeHandler}
      placeholder="Optional instructions for description (e.g. keep it concise, use bullet points)..."
      rows={3}
      disabled={!isGenerateDescriptionEnabled}
      onKeyDown={handleKeyDown}
      className="w-full resize-none rounded-[var(--radius)] border border-[var(--border)] bg-[var(--bg-card)] px-3.5 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.3)] transition-all duration-200 focus:border-[var(--border-focus)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-glow)] disabled:cursor-not-allowed hover:border-[rgba(255,255,255,0.15)]"
    />
  );
};
