import { create } from "zustand";
import type { ApiKeyStoreState } from "../interfaces/apiKeyStore.interface";

const useApiKeyStore = create<ApiKeyStoreState>()((set) => ({
  apiKey: null,
  isLoading: false,
  errorMessage: null,

  setApiKey: async (key: string | null) => {
    set({ isLoading: true, errorMessage: null });

    try {
      set({ apiKey: key });
    } catch (error) {
      set({ errorMessage: String(error) });
    } finally {
      set({ isLoading: false });
    }
  },
  setIsLoading: (value: boolean) => set({ isLoading: value }),
  setErrorMessage: (message: string | null) => set({ errorMessage: message }),
  clearApiKey: async () => {
    set({ isLoading: true, errorMessage: null });

    try {
      set({ apiKey: null });
    } catch (error) {
      set({ errorMessage: String(error) });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useApiKeyStore;
