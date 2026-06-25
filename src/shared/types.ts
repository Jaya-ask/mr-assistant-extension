export type PRExtractedData = {
  commitHints: string[];
  branches: {
    base: string;
    compare: string;
  };
  filesNames: string[];
};

export type BranchType = "base" | "compare";
