import toast from "react-hot-toast";
import useApiKeyStore from "../store/apiKey.store";

export const getApiKey = async () => {
  try {
    const result = await chrome.storage.local.get("apiKey");
    return result.apiKey;
  } catch (error) {
    toast.error("Failed to retrieve API key");
    console.error("Failed to retrieve API key:", error);
    return undefined;
  }
};

export const saveApiKey = async (apiKey: string): Promise<boolean> => {
  const { setApiKey } = useApiKeyStore.getState();
  if (!apiKey) return false;

  try {
    await chrome.storage.local.set({ apiKey });
    setApiKey(apiKey);
    return true;
  } catch (error) {
    toast.error("Failed to save API key");
    console.error("Failed to save API key:", error);
    return false;
  }
};
