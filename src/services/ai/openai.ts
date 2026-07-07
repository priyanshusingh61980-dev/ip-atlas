/**
 * OpenAI provider — ADR-PENDING-001 stub.
 *
 * This adapter conforms to `AIService` so the UI can flip
 * `VITE_AI_PROVIDER=openai` and immediately start exercising the swap surface.
 * It does NOT hit the OpenAI API; it wraps the deterministic mock and tags
 * envelope IDs so traces clearly identify the provider in use.
 *
 * When ADR-PENDING-001 resolves, replace the wrapped calls below with a real
 * `fetch` to `https://api.openai.com/v1/chat/completions` (or Responses API),
 * keeping the same envelope contract and error mapping.
 */
import { mockAIService } from "./mock";
import type { AIService } from "./types";

const PROVIDER_TAG = "openai-stub";

export const openaiAIService: AIService = {
  async search(request, options) {
    const env = await mockAIService.search(request, options);
    return { ...env, id: `${PROVIDER_TAG}:${env.id}` };
  },
  async *searchStream(request, options) {
    for await (const frame of mockAIService.searchStream(request, options)) {
      yield { ...frame, id: `${PROVIDER_TAG}:${frame.id}` };
    }
  },
  async theory(request, options) {
    const env = await mockAIService.theory(request, options);
    return { ...env, id: `${PROVIDER_TAG}:${env.id}` };
  },
};
