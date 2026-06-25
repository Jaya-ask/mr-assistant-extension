import {
  GITLAB_COMPARE_PATH,
  GITLAB_MR_NEW_PATH,
} from "../shared/constants";

export function isGitlabMRPageUrl(url: string): boolean {
  try {
    const { pathname } = new URL(url);
    const isComparePage: boolean = pathname.includes(GITLAB_COMPARE_PATH);
    const isMrNewPage: boolean = pathname.includes(GITLAB_MR_NEW_PATH);
    return isComparePage || isMrNewPage;
  } catch {
    return false;
  }
}
