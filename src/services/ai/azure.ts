/**
 * Azure OpenAI provider — ADR-PENDING-001 stub.
 *
 * Same shape as `openai.ts`; kept distinct so the eventual real adapter can
 * differ on auth (Entra ID via DefaultAzureCredential or API key), endpoint
 * (`{resource}.openai.azure.com`), and deployment-name routing.
 */
import { mockAIService } from "./mock";
import type { AIService } from "./types";

const PROVIDER_TAG = "azure-stub";

export const azureAIService: AIService = {
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
