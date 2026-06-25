// utils/handleGenerate.ts
import { toast } from "react-hot-toast";
import {
  ERROR_MESSAGES,
  GENERATION_TIMEOUT,
  MESSAGE_TYPES,
} from "../shared/constants";
import { getApiKey } from "./chromeStorage";
import usePRStore from "../store/prGenerator.store";
import useApiKeyStore from "../store/apiKey.store";

let generationTimeoutId: ReturnType<typeof setTimeout> | undefined;

const clearGenerationTimeout = () => {
  if (generationTimeoutId !== undefined) {
    clearTimeout(generationTimeoutId);
    generationTimeoutId = undefined;
  }
};

const startGenerationTimeout = () => {
  clearGenerationTimeout();
  generationTimeoutId = setTimeout(() => {
    const { isLoading, setIsLoading } = usePRStore.getState();
    if (isLoading) {
      setIsLoading(false);
      toast.error(ERROR_MESSAGES.GENERATION_TIMEOUT);
    }
  }, GENERATION_TIMEOUT);
};

const handleGenerate = async () => {
  const {
    isGenerateTitleEnabled,
    isGenerateDescriptionEnabled,
    instructions,
    setIsLoading,
  } = usePRStore.getState();
  const { setApiKey } = useApiKeyStore.getState();

  const prOptions = {
    isGenerateTitleEnabled,
    isGenerateDescriptionEnabled,
    instructions,
  };

  if (!isGenerateTitleEnabled && !isGenerateDescriptionEnabled) {
    toast.error(ERROR_MESSAGES.SELECT_TITLE_OR_DESCRIPTION);
    return;
  }
  const apiKey = await getApiKey();
  if (!apiKey) {
    setIsLoading(false);
    setApiKey(null);
    toast.error(ERROR_MESSAGES.API_KEY_MISSING);
    return;
  }
  setIsLoading(true);
  startGenerationTimeout();
  try {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    if (tab?.id) {
      await chrome.tabs.sendMessage(tab.id, {
        type: MESSAGE_TYPES.RUN_PR_EXTRACTION,
        prOptions,
      });
    } else {
      clearGenerationTimeout();
      setIsLoading(false);
      toast.error(ERROR_MESSAGES.EXTRACTION_TIMEOUT);
    }
  } catch {
    clearGenerationTimeout();
    setIsLoading(false);
    toast.error(ERROR_MESSAGES.EXTRACTION_TIMEOUT);
  }
};

export { clearGenerationTimeout };
export default handleGenerate;
