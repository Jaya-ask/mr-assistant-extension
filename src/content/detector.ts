import { isGitlabMRPageUrl } from "../utils/gitlab";

export const isGitlabMRPage = (): boolean => {
  const currentUrl: string = window.location.href;
  const isMRPage: boolean = isGitlabMRPageUrl(currentUrl);
  return isMRPage;
};
