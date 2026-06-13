import { useEffect, useState } from "react";
import { DEBOUNCE_MS } from "@/lib/constants";

/**
 * Debounce a value by a configurable delay.
 *
 * Use for search inputs to avoid spamming the API on every keystroke.
 * Default delay is 500ms per project requirements.
 *
 * @example
 * const [search, setSearch] = useState("");
 * const debouncedSearch = useDebounce(search, 500);
 * // Use debouncedSearch in your query
 */
export function useDebounce<T>(value: T, delay: number = DEBOUNCE_MS): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
