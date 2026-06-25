import usePRStore from "../store/prGenerator.store";
import toast from "react-hot-toast";
import { MESSAGE_TYPES, ERROR_MESSAGES } from "../shared/constants";
import { clearGenerationTimeout } from "./handleGenerate";

let isListenerRegistered: boolean = false;

export const setupMessageListener = () => {
  if (typeof chrome === "undefined" || !chrome.runtime.onMessage) {
    return;
  }

  if (isListenerRegistered) return;
  isListenerRegistered = true;

  chrome.runtime.onMessage.addListener((message) => {
    const { setTitle, setDescription, setIsLoading } = usePRStore.getState();

    if (message.type === MESSAGE_TYPES.PR_ANALYSIS_COMPLETE) {
      try {
        const geminiText: string | undefined = message.result;

        if (!geminiText?.trim()) {
          toast.error(ERROR_MESSAGES.EMPTY_AI_RESPONSE);
          return;
        }

        const firstNewline: number = geminiText.indexOf("\n");
        const hasMultipleLines: boolean = firstNewline !== -1;

        const firstLine: string = hasMultipleLines
          ? geminiText.slice(0, firstNewline).trim()
          : geminiText.trim();
        const rest: string = hasMultipleLines
          ? geminiText.slice(firstNewline + 1).trim()
          : "";

        const isJustDescriptionGenerated: boolean = firstLine.startsWith("#");
        const isJustTitleGenerated: boolean =
          !isJustDescriptionGenerated && !rest;

        const titleResult: string = isJustDescriptionGenerated ? "" : firstLine;
        const descriptionResult: string =
          isJustDescriptionGenerated || isJustTitleGenerated
            ? isJustDescriptionGenerated
              ? geminiText.trim()
              : ""
            : rest;

        if (titleResult) setTitle(titleResult);
        if (descriptionResult) setDescription(descriptionResult);
      } catch (error: unknown) {
        console.error("Failed to parse AI response:", error);
        toast.error(ERROR_MESSAGES.GENERIC_ERROR);
      } finally {
        clearGenerationTimeout();
        setIsLoading(false);
      }
    }

    if (message.type === MESSAGE_TYPES.PR_ANALYSIS_FAILED) {
      clearGenerationTimeout();
      toast.error(message.errorMessage || ERROR_MESSAGES.GENERIC_ERROR);
      setIsLoading(false);
    }
  });
};
