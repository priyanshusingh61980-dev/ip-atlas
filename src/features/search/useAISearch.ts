import { useCallback, useEffect, useReducer, useRef } from "react";
import { aiService, AIServiceError } from "@/services/ai";
import type { AIResponse, SearchPayload, SearchRequest } from "@/shared/contracts/ai";

/**
 * Discriminated union covering the full state matrix of the AI search surface.
 * UI components branch exclusively on `state.status`.
 */
export type SearchState =
  | { status: "idle" }
  | { status: "loading"; request: SearchRequest; attempt: number }
  | {
      status: "streaming";
      request: SearchRequest;
      response: AIResponse<SearchPayload>;
      attempt: number;
    }
  | { status: "success"; request: SearchRequest; response: AIResponse<SearchPayload> }
  | { status: "empty"; request: SearchRequest }
  | {
      status: "error";
      request: SearchRequest;
      error: { code: AIErrorCode; message: string };
      attempts: number;
    };

export type AIErrorCode = "aborted" | "network" | "validation" | "internal";

type Action =
  | { type: "submit"; request: SearchRequest; attempt: number }
  | {
      type: "stream";
      request: SearchRequest;
      response: AIResponse<SearchPayload>;
      attempt: number;
    }
  | { type: "success"; request: SearchRequest; response: AIResponse<SearchPayload> }
  | { type: "empty"; request: SearchRequest }
  | {
      type: "error";
      request: SearchRequest;
      error: { code: AIErrorCode; message: string };
      attempts: number;
    }
  | { type: "reset" };

function reducer(state: SearchState, action: Action): SearchState {
  switch (action.type) {
    case "submit":
      return { status: "loading", request: action.request, attempt: action.attempt };
    case "stream":
      return {
        status: "streaming",
        request: action.request,
        response: action.response,
        attempt: action.attempt,
      };
    case "success":
      return { status: "success", request: action.request, response: action.response };
    case "empty":
      return { status: "empty", request: action.request };
    case "error":
      return {
        status: "error",
        request: action.request,
        error: action.error,
        attempts: action.attempts,
      };
    case "reset":
      return { status: "idle" };
    default:
      return state;
  }
}

export interface UseAISearchOptions {
  /** Maximum number of retries on transient errors. Defaults to 2. */
  maxRetries?: number;
  /** Backoff base in ms. Delay = base * 3^(attempt-1). Defaults to 250. */
  backoffBaseMs?: number;
}

export interface UseAISearchResult {
  state: SearchState;
  submit: (request: SearchRequest) => void;
  cancel: () => void;
  reset: () => void;
}

const TRANSIENT_CODES: ReadonlySet<AIErrorCode> = new Set(["network", "internal"]);

function backoffDelay(attempt: number, baseMs: number): number {
  // attempt is 1-based; default schedule 250 / 750 / 2250.
  return baseMs * Math.pow(3, attempt - 1);
}

function delay(ms: number, signal: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal.aborted) {
      reject(new AIServiceError("aborted", "Cancelled"));
      return;
    }
    const t = setTimeout(() => {
      signal.removeEventListener("abort", onAbort);
      resolve();
    }, ms);
    const onAbort = () => {
      clearTimeout(t);
      reject(new AIServiceError("aborted", "Cancelled"));
    };
    signal.addEventListener("abort", onAbort, { once: true });
  });
}

/**
 * `useAISearch` — drives the AI search surface against any `AIService`.
 *
 * Behavior:
 * - Streaming frames feed `state.response` so the UI can paint partial summaries.
 * - Transient errors (`network` / `internal`) are retried with exponential
 *   backoff up to `maxRetries`. `validation` and `aborted` are never retried.
 * - Empty `summary` on completion → `empty` state.
 * - Aborts → `idle` (user intent).
 * - Component unmount cancels any in-flight work.
 */
export function useAISearch(options: UseAISearchOptions = {}): UseAISearchResult {
  const { maxRetries = 2, backoffBaseMs = 250 } = options;
  const [state, dispatch] = useReducer(reducer, { status: "idle" } satisfies SearchState);
  const controllerRef = useRef<AbortController | null>(null);

  const cancel = useCallback(() => {
    controllerRef.current?.abort();
    controllerRef.current = null;
    dispatch({ type: "reset" });
  }, []);

  const reset = useCallback(() => {
    cancel();
    dispatch({ type: "reset" });
  }, [cancel]);

  const submit = useCallback(
    (request: SearchRequest) => {
      controllerRef.current?.abort();
      const controller = new AbortController();
      controllerRef.current = controller;

      void (async () => {
        let attempt = 0;
        while (attempt <= maxRetries) {
          attempt += 1;
          if (controller.signal.aborted) return;
          dispatch({ type: "submit", request, attempt });

          try {
            let last: AIResponse<SearchPayload> | null = null;
            for await (const frame of aiService.searchStream(request, {
              signal: controller.signal,
            })) {
              if (controller.signal.aborted) return;
              last = frame;
              if (frame.status === "streaming") {
                dispatch({ type: "stream", request, response: frame, attempt });
              }
            }
            if (controller.signal.aborted) return;

            if (!last) {
              dispatch({ type: "empty", request });
              return;
            }
            if (last.status === "error") {
              throw new AIServiceError("internal", "Provider returned an error envelope.");
            }
            if (!last.data.summary || last.data.summary.trim().length === 0) {
              dispatch({ type: "empty", request });
              return;
            }
            dispatch({ type: "success", request, response: last });
            return;
          } catch (err) {
            if (controller.signal.aborted) return;
            const code: AIErrorCode = err instanceof AIServiceError ? err.code : "internal";
            const message = err instanceof Error ? err.message : "Unknown error";

            if (code === "aborted") {
              dispatch({ type: "reset" });
              return;
            }

            const canRetry = TRANSIENT_CODES.has(code) && attempt <= maxRetries;
            if (!canRetry) {
              dispatch({
                type: "error",
                request,
                error: { code, message },
                attempts: attempt,
              });
              return;
            }

            try {
              await delay(backoffDelay(attempt, backoffBaseMs), controller.signal);
            } catch {
              return; // aborted during backoff
            }
          }
        }
      })();
    },
    [maxRetries, backoffBaseMs],
  );

  useEffect(() => {
    return () => {
      controllerRef.current?.abort();
    };
  }, []);

  return { state, submit, cancel, reset };
}
