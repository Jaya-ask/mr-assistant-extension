import { useCallback, useEffect, useState } from "react";
import usePRStore from "./store/prGenerator.store";
import Loading from "./components/common/Loading";
import Error from "./components/common/Error";
import InvalidComparePage from "./components/common/InvalidComparePage";
import useApiKeyStore from "./store/apiKey.store";
import PRGenerator from "./pages/PRGenerator";
import OnboardingScreen from "./components/OnboardingScreen";
import { getApiKey } from "./utils/chromeStorage";
import { isGitlabMRPageUrl } from "./utils/gitlab";

const App = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isGitlabComparePage, setIsGitlabComparePage] =
    useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { apiKey, setApiKey } = useApiKeyStore();

  const checkBrowserUrl = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      if (typeof chrome === "undefined" || !chrome.tabs) {
        setError("Extension context not available");
        return;
      }

      const [currentTab]: chrome.tabs.Tab[] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      const url: string | undefined = currentTab?.url;
      if (!url) {
        setIsGitlabComparePage(false);
        return;
      }
      setIsGitlabComparePage(url ? isGitlabMRPageUrl(url) : false);
    } catch (error: unknown) {
      console.error("Failed to check tab URL:", error);
      setError("Failed to check tab URL");
      setIsGitlabComparePage(false);
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading, setError, setIsGitlabComparePage]);

  const fetchApiKey = useCallback(async () => {
    const storedKey = await getApiKey();
    if (storedKey) {
      setApiKey(String(storedKey));
    }
  }, [setApiKey]);

  useEffect(() => {
    usePRStore.getState().setIsLoading(false);
    checkBrowserUrl();

    fetchApiKey();
  }, [fetchApiKey, checkBrowserUrl]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  if (!isGitlabComparePage) {
    return <InvalidComparePage />;
  }

  if (!apiKey) {
    return <OnboardingScreen />;
  }

  return (
    <div className="min-h-[var(--popup-min-height)] flex flex-col bg-transparent items-center justify-center mx-auto">
      <PRGenerator />
    </div>
  );
};

export default App;
