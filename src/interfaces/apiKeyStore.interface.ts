export interface ApiKeyStoreState {
  apiKey: string | null;
  isLoading: boolean;
  errorMessage: string | null;

  setApiKey: (key: string | null) => Promise<void>;
  setIsLoading: (value: boolean) => void;
  setErrorMessage: (message: string | null) => void;
  clearApiKey: () => Promise<void>;
}
