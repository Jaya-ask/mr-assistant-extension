export interface PRState {
  isGenerateTitleEnabled: boolean;
  isGenerateDescriptionEnabled: boolean;
  instructions: string;
  titleResult: string;
  descriptionResult: string;
  isLoading: boolean;

  setIsGenerateTitleEnabled: (isTitleEnabled: boolean) => void;
  setIsGenerateDescriptionEnabled: (isDescriptionEnabled: boolean) => void;
  setInstructions: (updatedInstructions: string) => void;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setIsLoading: (loading: boolean) => void;
}
