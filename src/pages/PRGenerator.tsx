import { ActionButtons } from "../components/ActionButtons";
import { CheckboxGroup } from "../components/CheckboxGroup";
import { Header } from "../components/Header";
import { InstructionTextarea } from "../components/InstructionTextarea";
import { ResultSection } from "../components/ResultSection";
import usePRStore from "../store/prGenerator.store";
import toast from "react-hot-toast";
import {
  TOAST_MESSAGES,
  ERROR_MESSAGES,
  MESSAGE_TYPES,
} from "../shared/constants";

export default function PRGenerator() {
  const { titleResult, descriptionResult } = usePRStore();

  const applyChangesHandler = async () => {
    try {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      if (tab?.id) {
        await chrome.tabs.sendMessage(tab.id, {
          type: MESSAGE_TYPES.APPLY_CHANGES,
          title: titleResult,
          description: descriptionResult,
        });
      }
      toast.success(TOAST_MESSAGES.PR_PASTE_SUCCESS);
    } catch (error) {
      console.error("Error occured while applying changes to GitLab: ", error);
      toast.error(ERROR_MESSAGES.APPLY_CHANGES_ERROR);
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-5 p-5 w-full max-w-[var(--popup-width)]">
      <Header />
      <CheckboxGroup />
      <InstructionTextarea />
      <ActionButtons />
      {(titleResult || descriptionResult) && <ResultSection />}
      {(titleResult || descriptionResult) && (
        <button
          className="relative w-full overflow-hidden rounded-[var(--radius)] bg-gradient-to-r from-[var(--accent)] to-[var(--accent-end)] px-4 py-3 text-sm font-semibold text-white shadow-[0_0_20px_var(--accent-glow)] transition-all duration-200 hover:shadow-[0_0_28px_var(--accent-glow)] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none cursor-pointer"
          onClick={applyChangesHandler}>
          Paste to GitLab
        </button>
      )}
    </div>
  );
}
