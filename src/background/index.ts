import toast from "react-hot-toast";
import type { IhandleAnalaysePrMessage } from "../interfaces/backgroundScripts.interface";
import { analyzePRWithGemini } from "./gemini.service";
import { MESSAGE_TYPES, ERROR_MESSAGES } from "../shared/constants";

const notifyPrAnalysisComplete = async (result: string | undefined) => {
  try {
    await chrome.runtime.sendMessage({
      type: MESSAGE_TYPES.PR_ANALYSIS_COMPLETE,
      result: result,
    });
  } catch (error) {
    console.error("Popup not open: ", error);
  }
};

const notifyPrAnalysisFailed = async (errorMessage: string) => {
  try {
    await chrome.runtime.sendMessage({
      type: MESSAGE_TYPES.PR_ANALYSIS_FAILED,
      errorMessage,
    });
  } catch (error) {
    console.error("Popup not open: ", error);
    toast.error(ERROR_MESSAGES.GENERIC_ERROR);
  }
};

const handleAnalysePrMessage = async ({
  payload,
  sendResponse,
}: IhandleAnalaysePrMessage): Promise<void> => {
  try {
    const result: string | undefined = await analyzePRWithGemini(payload);
    sendResponse({ success: true, result });
    await notifyPrAnalysisComplete(result);
  } catch (error) {
    const message: string =
      error instanceof Error ? error.message : String(error);
    sendResponse({ success: false, error: message });
    await notifyPrAnalysisFailed(message);
  }
};

// Main Entry point
chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  if (message.type !== MESSAGE_TYPES.ANALYZE_PR) {
    console.error("Message Type is not ANALYZE_PR");
    return;
  }

  void handleAnalysePrMessage({
    payload: message.PrPayload,
    sendResponse,
  });
  return true;
});
