import type {
  AIResponse,
  SearchPayload,
  SearchRequest,
  TheoryPayload,
  TheoryRequest,
} from "@/shared/contracts/ai";

/**
 * AI service interface. Mock and real adapters implement this; the UI never
 * imports a concrete provider.
 */
export interface AIService {
  /** Non-streaming search. Returns the complete envelope. */
  search(request: SearchRequest, options?: AICallOptions): Promise<AIResponse<SearchPayload>>;

  /**
   * Streaming search. Yields progressive envelopes (`status: "streaming"`)
   * until a final `status: "complete"` (or `"error"`) is emitted.
   */
  searchStream(
    request: SearchRequest,
    options?: AICallOptions,
  ): AsyncGenerator<AIResponse<SearchPayload>, void, void>;

  /** Theory explanation at a given depth. Non-streaming for now. */
  theory(request: TheoryRequest, options?: AICallOptions): Promise<AIResponse<TheoryPayload>>;
}

export interface AICallOptions {
  signal?: AbortSignal;
  /** Deterministic seed for testing. */
  seed?: number;
}

export class AIServiceError extends Error {
  constructor(
    public readonly code: "aborted" | "network" | "validation" | "internal",
    message: string,
  ) {
    super(message);
    this.name = "AIServiceError";
  }
}
