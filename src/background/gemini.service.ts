import { GoogleGenAI } from "@google/genai";
import type { BuildPRPromptOptions } from "../interfaces/backgroundScripts.interface";
import buildPRPrompt from "./utils/buildPRPrompt";
import { ERROR_MESSAGES } from "../shared/constants";

export const analyzePRWithGemini = async (PrPayload: BuildPRPromptOptions) => {
  const GEMINI_API_KEY = await new Promise<string | undefined>((resolve) => {
    chrome.storage.local.get(["apiKey"], (result) => {
      resolve(result.apiKey as string | undefined);
    });
  });

  if (!GEMINI_API_KEY) {
    throw new Error(ERROR_MESSAGES.MISSING_API_KEY);
  }

  const ai: GoogleGenAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

  const prompt: string = buildPRPrompt(PrPayload);

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });
    if (!response.text?.trim()) {
      throw new Error(ERROR_MESSAGES.EMPTY_AI_RESPONSE);
    }
    return response.text;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    if (
      errorMessage.includes("API_KEY_INVALID") ||
      errorMessage.includes("API key not valid")
    ) {
      throw new Error(ERROR_MESSAGES.INVALID_API_KEY);
    }
    if (
      errorMessage.includes("429") ||
      errorMessage.includes("rate limit") ||
      errorMessage.includes("RESOURCE_EXHAUSTED")
    ) {
      throw new Error(ERROR_MESSAGES.RATE_LIMIT_EXCEEDED);
    }
    throw new Error(ERROR_MESSAGES.GEMINI_API_ERROR);
  }
};
