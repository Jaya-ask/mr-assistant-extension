import { MESSAGE_TYPES } from "../shared/constants";

export const notifyAnalysisFailed = (errorMessage: string): void => {
  void chrome.runtime
    .sendMessage({
      type: MESSAGE_TYPES.PR_ANALYSIS_FAILED,
      errorMessage,
    })
    .catch((error: unknown) => {
      console.error("Failed to notify popup of analysis failure:", error);
    });
};
