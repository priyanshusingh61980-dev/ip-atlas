import { AlertTriangle, RefreshCw } from "lucide-react";
import type { AIErrorCode } from "./useAISearch";

interface SearchErrorProps {
  code: AIErrorCode;
  message: string;
  onRetry: () => void;
}

const TITLE: Record<AIErrorCode, string> = {
  aborted: "Request cancelled.",
  network: "Connection issue.",
  validation: "That query needs adjusting.",
  internal: "Something went wrong.",
};

export function SearchError({ code, message, onRetry }: SearchErrorProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-start gap-4 rounded-xl border border-danger/40 bg-danger/5 p-6"
    >
      <div className="flex items-center gap-2 text-danger">
        <AlertTriangle className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
        <p className="text-sm font-medium">{TITLE[code]}</p>
      </div>
      <p className="text-sm text-ink-secondary">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="inline-flex items-center gap-2 rounded-md border border-hairline bg-surface-1 px-3.5 py-1.5 text-sm text-ink-primary transition-colors duration-fast hover:bg-bg-charcoal"
      >
        <RefreshCw className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
        Retry
      </button>
    </div>
  );
}
