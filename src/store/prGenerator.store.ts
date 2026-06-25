import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PRState } from "../interfaces/prGeneratorStore.interface";

const usePRStore = create<PRState>()(
  persist(
    (set) => ({
      isGenerateTitleEnabled: false,
      isGenerateDescriptionEnabled: false,
      instructions: "",
      titleResult: "",
      descriptionResult: "",
      isLoading: false,

      setIsGenerateTitleEnabled: (isTitleEnabled: boolean) =>
        set({ isGenerateTitleEnabled: isTitleEnabled }),
      setIsGenerateDescriptionEnabled: (isDescriptionEnabled: boolean) =>
        set({ isGenerateDescriptionEnabled: isDescriptionEnabled }),
      setInstructions: (updatedInstructions: string) =>
        set({ instructions: updatedInstructions }),
      setResults: (title?: string, description?: string) =>
        set({ titleResult: title, descriptionResult: description }),
      setTitle: (title: string) => set({ titleResult: title }),
      setDescription: (description: string) =>
        set({ descriptionResult: description }),
      setIsLoading: (loading: boolean) => set({ isLoading: loading }),
    }),
    {
      name: "mr-generator-storage-gitlab",
    },
  ),
);

export default usePRStore;
