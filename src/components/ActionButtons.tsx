import { useCallback, useEffect } from "react";
import usePRStore from "../store/prGenerator.store";
import { setupMessageListener } from "../utils/setupMessageListener";
import handleGenerate from "../utils/handleGenerate";

export const ActionButtons = () => {
  const { isLoading, isGenerateTitleEnabled, isGenerateDescriptionEnabled } =
    usePRStore();

  const buttonLabel = useCallback((): string => {
    if (isGenerateTitleEnabled && !isGenerateDescriptionEnabled)
      return "Generate Title";
    else if (!isGenerateTitleEnabled && isGenerateDescriptionEnabled)
      return "Generate Description";
    return "Generate PR";
  }, [isGenerateTitleEnabled, isGenerateDescriptionEnabled]);


  useEffect(() => {
    setupMessageListener();
  }, []);

  return (
    <button
      onClick={handleGenerate}
      disabled={
        isLoading || (!isGenerateTitleEnabled && !isGenerateDescriptionEnabled)
      }
      className="relative w-full overflow-hidden rounded-[var(--radius)] bg-gradient-to-r from-[var(--accent)] to-[var(--accent-end)] px-4 py-3 text-sm font-semibold text-white shadow-[0_0_20px_var(--accent-glow)] transition-all duration-200 hover:shadow-[0_0_28px_var(--accent-glow)] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none cursor-pointer">
      <span className="relative z-10">
        {isLoading ? "Generating..." : buttonLabel()}
      </span>
    </button>
  );
};
