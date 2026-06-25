import type { BuildPRPromptOptions } from "../../interfaces/backgroundScripts.interface";

function buildPRPrompt(options: BuildPRPromptOptions): string {
  const {
    isGenerateTitleEnabled,
    isGenerateDescriptionEnabled,
    instructions,
    PrPayload,
  } = options;

  const generateSections: string = [
    isGenerateTitleEnabled && "title",
    isGenerateDescriptionEnabled && "description",
  ]
    .filter(Boolean)
    .join(" and ");

  return `
You are a senior software engineer reviewing a GitLab Merge Request.

Generate only the following: ${generateSections}.
Do not generate anything else. Do not add extra separators, markdown fences, or labels outside the defined format.

${
  isGenerateTitleEnabled
    ? `## Title
A single plain text line. No markdown. Under 72 characters. No prefix like "Title:".`
    : ""
}

${
  isGenerateDescriptionEnabled
    ? `## Description
Markdown format with exactly these sections:
### Summary
### Changes
### Notes

${instructions ? `Follow these instructions: ${instructions}` : "Keep it short and in bullet points."} No extra sections.`
    : ""
}

Context:
- Target branch: ${PrPayload.branches.base}
- Source branch: ${PrPayload.branches.compare}

Commit messages:
${PrPayload.commitHints.map((commitHint: string) => `- ${commitHint}`).join("\n")}

Files changed:
${PrPayload.filesNames.map((fileName: string) => `- ${fileName}`).join("\n")}
`.trim();
}

export default buildPRPrompt;
