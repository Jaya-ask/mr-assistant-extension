import type { PRExtractedData } from "../shared/types";

export interface IhandleAnalaysePrMessage {
  payload: BuildPRPromptOptions;
  sendResponse: (response: unknown) => void;
}

export interface BuildPRPromptOptions {
  isGenerateTitleEnabled?: boolean;
  isGenerateDescriptionEnabled?: boolean;
  instructions?: string;
  PrPayload: PRExtractedData;
}
