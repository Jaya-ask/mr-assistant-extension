import {
  ERROR_MESSAGES,
  PROMISE_INTERVAL,
  TIMEOUT_SAFEGUARD,
} from "../shared/constants";
import type { PRExtractedData } from "../shared/types";
import {
  extractBranchName,
  extractCommitMessages,
  extractFileNames,
} from "./extractors/content";

const hasMinimumExtractionData = (
  commits: string[],
  baseBranch?: string,
  compareBranch?: string,
): boolean =>
  commits.length > 0 && Boolean(baseBranch) && Boolean(compareBranch);

export const waitForCommits = (): Promise<PRExtractedData> => {
  const PrExtractedResponse: Promise<PRExtractedData> = new Promise(
    (resolve, reject) => {
      const startedAt = Date.now();

      const intervalId = setInterval(() => {
        const commits: string[] = extractCommitMessages();
        const baseBranch: string | undefined = extractBranchName("base");
        const compareBranch: string | undefined = extractBranchName("compare");
        const fileNames: string[] = extractFileNames();

        const hasRequiredData = hasMinimumExtractionData(
          commits,
          baseBranch,
          compareBranch,
        );

        if (hasRequiredData && baseBranch && compareBranch) {
          clearInterval(intervalId);
          resolve({
            commitHints: commits,
            branches: { base: baseBranch, compare: compareBranch },
            filesNames: fileNames,
          });
          return;
        }

        if (Date.now() - startedAt > TIMEOUT_SAFEGUARD) {
          clearInterval(intervalId);

          if (hasRequiredData && baseBranch && compareBranch) {
            resolve({
              commitHints: commits,
              branches: { base: baseBranch, compare: compareBranch },
              filesNames: fileNames,
            });
            return;
          }

          reject(new Error(ERROR_MESSAGES.EXTRACTION_TIMEOUT));
        }
      }, PROMISE_INTERVAL);
    },
  );
  return PrExtractedResponse;
};
