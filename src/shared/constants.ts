export const GITLAB_COMPARE_PATH: string = "/-/compare";
export const GITLAB_MR_NEW_PATH: string = "/-/merge_requests/new";

export const COMMIT_MESSAGE_SELECTOR: string =
  "[data-testid='commit-title-link'], .commit-row-message, [data-testid='commit-row-message']";
export const FILENAME_SELECTOR: string =
  ".file-title-name, [data-testid='file-name-button'], .diff-file-path, [data-testid='file-tree-item']";

export const MR_TITLE_FIELD = "merge_request_title";
export const MR_DESCRIPTION_FIELD = "merge_request_description";

export const TIMEOUT_SAFEGUARD: number = 15_000;
export const PROMISE_INTERVAL: number = 300;
export const GENERATION_TIMEOUT: number = 90_000;

export const ERROR_MESSAGES = {
  GENERIC_ERROR: "Something went wrong. Please try again.",
  GENERATE_PR_ERROR: "Failed to generate MR. Please try again.",
  APPLY_CHANGES_ERROR: "Failed to apply changes. Please try again.",
  GEMINI_API_ERROR: "Failed to analyze with AI. Please try again.",
  SELECT_TITLE_OR_DESCRIPTION: "Select at least title or description",
  API_KEY_MISSING: "API key is missing. Please enter your API key.",
  INVALID_API_KEY: "Invalid API key. Please update your API key.",
  RATE_LIMIT_EXCEEDED:
    "Rate limit exceeded. Please try again later or upgrade your plan.",
  MISSING_API_KEY: "Missing or invalid Gemini API key. Check your .env file.",
  EXTRACTION_TIMEOUT:
    "Could not read commits or branch info from this GitLab page. Scroll to load the diff, then try again.",
  GENERATION_TIMEOUT:
    "Generation took too long. Check your API key and network, then try again.",
  EMPTY_AI_RESPONSE: "AI returned an empty response. Please try again.",
} as const;

export const TOAST_MESSAGES = {
  PR_PASTE_SUCCESS: "MR details pasted successfully!",
} as const;

export const MESSAGE_TYPES = {
  ANALYZE_PR: "ANALYZE_PR",
  APPLY_CHANGES: "APPLY_CHANGES",
  RUN_PR_EXTRACTION: "RUN_PR_EXTRACTION",
  PR_ANALYSIS_COMPLETE: "PR_ANALYSIS_COMPLETE",
  PR_ANALYSIS_FAILED: "PR_ANALYSIS_FAILED",
} as const;

export const GOOGLE_AI_STUDIO_URL: string =
  "https://aistudio.google.com/apikey";
