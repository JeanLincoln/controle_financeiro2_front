import { useEffect, useState } from "react";
import type { UseFormWatch } from "react-hook-form";

interface ValidatedFields<T> {
  callbackArgs: T;
  dependencies: string[];
}

interface UseDebounce<T extends Record<string, unknown>> {
  callback: (args: T) => void;
  formWatch: UseFormWatch<T>;
}

const A_SECOND_AND_HALF_DELAY = 1500;

export function usePromiseDebounce<T extends Record<string, unknown>>({
  callback,
  formWatch
}: UseDebounce<T>) {
  const [loading, setLoading] = useState(false);
  const fields = formWatch();

  const formatAndValidateFields = Object.entries(fields).reduce(
    (acc: ValidatedFields<T>, [key, value]) => {
      if (!value) return acc;

      acc.callbackArgs[key as keyof T] = value as T[keyof T];
      acc.dependencies.push(`${key}-${value}`);
      return acc;
    },
    {
      callbackArgs: {} as T,
      dependencies: []
    }
  );

  const { callbackArgs, dependencies } = formatAndValidateFields;

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
      callback(callbackArgs);
    }, A_SECOND_AND_HALF_DELAY);

    return () => {
      clearTimeout(timer);
    };
  }, dependencies);

  return { debounceLoading: loading };
}
