import { mockAIService } from "./mock";
import { openaiAIService } from "./openai";
import { azureAIService } from "./azure";
import type { AIService } from "./types";

const provider = (import.meta.env.VITE_AI_PROVIDER ?? "mock") as
  | "mock"
  | "openai"
  | "azure"
  | string;

/**
 * Resolve the active AI service. Today every provider is a deterministic stub
 * wrapping the mock so the swap surface is fully exercised; real adapters will
 * replace the bodies in `openai.ts` / `azure.ts` once ADR-PENDING-001 lands.
 */
function resolveAIService(): AIService {
  switch (provider) {
    case "mock":
      return mockAIService;
    case "openai":
      return openaiAIService;
    case "azure":
      return azureAIService;
    default:
      console.warn(`[ai] provider "${provider}" not recognised; falling back to mock`);
      return mockAIService;
  }
}

export const aiService: AIService = resolveAIService();
export const activeProvider = provider;
export type { AIService } from "./types";
export { AIServiceError } from "./types";
