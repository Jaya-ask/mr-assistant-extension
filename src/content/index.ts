import type { PRExtractedData } from "../shared/types";
import type { BuildPRPromptOptions } from "../interfaces/backgroundScripts.interface";
import { isGitlabMRPage } from "./detector";
import { waitForCommits } from "./waiters";
import {
  ERROR_MESSAGES,
  MR_TITLE_FIELD,
  MR_DESCRIPTION_FIELD,
  MESSAGE_TYPES,
} from "../shared/constants";
import { notifyAnalysisFailed } from "../utils/notifyAnalysis";

const main = async (prOptions: Omit<BuildPRPromptOptions, "PrPayload">) => {
  try {
    if (!isGitlabMRPage()) {
      notifyAnalysisFailed(ERROR_MESSAGES.EXTRACTION_TIMEOUT);
      return;
    }

    const PrPayload: PRExtractedData = await waitForCommits();
    const updatedPrPayload = { ...prOptions, PrPayload };

    await chrome.runtime.sendMessage({
      type: MESSAGE_TYPES.ANALYZE_PR,
      PrPayload: updatedPrPayload,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : ERROR_MESSAGES.GENERIC_ERROR;
    notifyAnalysisFailed(message);
  }
};

const setInputValue = (element: HTMLInputElement | HTMLTextAreaElement, value: string) => {
  element.value = value;
  element.dispatchEvent(new Event("input", { bubbles: true }));
  element.dispatchEvent(new Event("change", { bubbles: true }));
};

const applyChangesToGitLab = (title: string, description: string) => {
  const titleSelectors = [
    `#${MR_TITLE_FIELD}`,
    'input[name="merge_request[title]"]',
  ];

  const descriptionSelectors = [
    `#${MR_DESCRIPTION_FIELD}`,
    'textarea[name="merge_request[description]"]',
  ];

  let titleElement: HTMLInputElement | null = null;
  for (const selector of titleSelectors) {
    titleElement = document.querySelector(selector) as HTMLInputElement;
    if (titleElement) {
      setInputValue(titleElement, title);
      break;
    }
  }
  if (!titleElement) {
    console.warn("Could not find GitLab MR title field");
  }

  let descriptionElement: HTMLTextAreaElement | null = null;
  for (const selector of descriptionSelectors) {
    descriptionElement = document.querySelector(
      selector,
    ) as HTMLTextAreaElement;
    if (descriptionElement) {
      setInputValue(descriptionElement, description);
      break;
    }
  }
  if (!descriptionElement) {
    console.warn("Could not find GitLab MR description field");
  }
};

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === MESSAGE_TYPES.APPLY_CHANGES) {
    applyChangesToGitLab(message.title, message.description);
    return;
  }

  const prOptions = message.prOptions;
  if (!prOptions) {
    return;
  }

  if (message.type === MESSAGE_TYPES.RUN_PR_EXTRACTION) {
    main(prOptions);
  }
});
