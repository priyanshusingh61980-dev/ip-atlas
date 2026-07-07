import { useCallback, useEffect, useReducer, useRef } from "react";
import { aiService, AIServiceError } from "@/services/ai";
import type { AIResponse, TheoryPayload, TheoryRequest } from "@/shared/contracts/ai";
import type { AIErrorCode } from "@/features/search/useAISearch";

export type TheoryState =
  | { status: "idle" }
  | { status: "loading"; request: TheoryRequest }
  | { status: "success"; request: TheoryRequest; response: AIResponse<TheoryPayload> }
  | {
      status: "error";
      request: TheoryRequest;
      error: { code: AIErrorCode; message: string };
    };

type Action =
  | { type: "submit"; request: TheoryRequest }
  | { type: "success"; request: TheoryRequest; response: AIResponse<TheoryPayload> }
  | {
      type: "error";
      request: TheoryRequest;
      error: { code: AIErrorCode; message: string };
    }
  | { type: "reset" };

function reducer(state: TheoryState, action: Action): TheoryState {
  switch (action.type) {
    case "submit":
      return { status: "loading", request: action.request };
    case "success":
      return { status: "success", request: action.request, response: action.response };
    case "error":
      return { status: "error", request: action.request, error: action.error };
    case "reset":
      return { status: "idle" };
    default:
      return state;
  }
}

export interface UseAITheoryResult {
  state: TheoryState;
  submit: (request: TheoryRequest) => void;
  reset: () => void;
}

/**
 * `useAITheory` — drives the Theory AI surface. Same envelope contract as
 * search; non-streaming today because theory responses are short structured
 * documents rather than long synthesis.
 */
export function useAITheory(): UseAITheoryResult {
  const [state, dispatch] = useReducer(reducer, { status: "idle" } satisfies TheoryState);
  const controllerRef = useRef<AbortController | null>(null);

  const reset = useCallback(() => {
    controllerRef.current?.abort();
    controllerRef.current = null;
    dispatch({ type: "reset" });
  }, []);

  const submit = useCallback((request: TheoryRequest) => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    dispatch({ type: "submit", request });

    void (async () => {
      try {
        const env = await aiService.theory(request, { signal: controller.signal });
        if (controller.signal.aborted) return;
        dispatch({ type: "success", request, response: env });
      } catch (err) {
        if (controller.signal.aborted) return;
        if (err instanceof AIServiceError && err.code === "aborted") {
          dispatch({ type: "reset" });
          return;
        }
        const code: AIErrorCode = err instanceof AIServiceError ? err.code : "internal";
        dispatch({
          type: "error",
          request,
          error: { code, message: err instanceof Error ? err.message : "Unknown error" },
        });
      }
    })();
  }, []);

  useEffect(() => {
    return () => {
      controllerRef.current?.abort();
    };
  }, []);

  return { state, submit, reset };
}
