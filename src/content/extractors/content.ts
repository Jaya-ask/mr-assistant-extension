import {
  COMMIT_MESSAGE_SELECTOR,
  FILENAME_SELECTOR,
  GITLAB_COMPARE_PATH,
  GITLAB_MR_NEW_PATH,
} from "../../shared/constants";
import type { BranchType } from "../../shared/types";

const parseBranchesFromComparePath = (
  pathname: string,
): { base?: string; compare?: string } => {
  const compareIndex = pathname.indexOf(GITLAB_COMPARE_PATH);
  if (compareIndex === -1) return {};

  const branchSegment = pathname.slice(
    compareIndex + GITLAB_COMPARE_PATH.length + 1,
  );
  const [base, compare] = branchSegment.split("...");
  if (!base || !compare) return {};

  return {
    base: decodeURIComponent(base),
    compare: decodeURIComponent(compare),
  };
};

const parseBranchesFromMrNewUrl = (
  searchParams: URLSearchParams,
): { base?: string; compare?: string } => {
  const compare = searchParams.get("merge_request[source_branch]");
  const base = searchParams.get("merge_request[target_branch]");

  if (!base || !compare) return {};
  return { base, compare };
};

const parseBranchesFromCompareSelector = (): {
  base?: string;
  compare?: string;
} => {
  const selector = document.getElementById("js-compare-selector");
  if (!selector?.dataset) return {};

  const compare = selector.dataset.paramsFrom;
  const base = selector.dataset.paramsTo;

  if (!base || !compare) return {};
  return { base, compare };
};

const parseBranchesFromDropdowns = (): { base?: string; compare?: string } => {
  const sourceBranch = document.querySelector(
    ".js-source-branch .gl-new-dropdown-button-text, .js-source-branch",
  );
  const targetBranch = document.querySelector(
    ".js-target-branch .gl-new-dropdown-button-text, .js-target-branch",
  );

  const compare = sourceBranch?.textContent?.trim();
  const base = targetBranch?.textContent?.trim();

  if (!base || !compare) return {};
  if (base.includes("Select") || compare.includes("Select")) return {};

  return { base, compare };
};

export const extractCommitMessages = (): string[] => {
  const commits = document.querySelectorAll(COMMIT_MESSAGE_SELECTOR);
  const commitsArray: string[] = Array.from(commits).map((commit) =>
    (commit as HTMLElement).innerText.trim(),
  );
  return commitsArray.filter(Boolean);
};

export const extractBranchName = (
  currentBranch: BranchType,
): string | undefined => {
  const url = new URL(window.location.href);
  const { pathname } = url;

  const fromComparePath = parseBranchesFromComparePath(pathname);
  const fromMrNewUrl =
    pathname.includes(GITLAB_MR_NEW_PATH) ?
      parseBranchesFromMrNewUrl(url.searchParams)
    : {};
  const fromCompareSelector = parseBranchesFromCompareSelector();
  const fromDropdowns = parseBranchesFromDropdowns();

  const branches = {
    ...fromDropdowns,
    ...fromCompareSelector,
    ...fromMrNewUrl,
    ...fromComparePath,
  };

  return currentBranch === "base" ? branches.base : branches.compare;
};

export const extractFileNames = (): string[] => {
  const fileNamesElement = document.querySelectorAll(FILENAME_SELECTOR);
  const fileNames: string[] = Array.from(fileNamesElement).map((fileName) =>
    (fileName as HTMLElement).innerText.trim(),
  );
  return fileNames.filter(Boolean);
};
