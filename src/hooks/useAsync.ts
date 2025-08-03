/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

type AsyncFunction<TArgs extends any[], TResult> = (
  ...args: TArgs
) => Promise<TResult>;

export function useAsync<TArgs extends any[], TResult>(
  asyncFunction: AsyncFunction<TArgs, TResult>
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const execute = async (...args: TArgs): Promise<TResult | undefined> => {
    setIsLoading(true);
    setError("");

    try {
      const result = await asyncFunction(...args);
      return result;
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      console.error("Async error:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { execute, isLoading, error };
}
