import { useEffect, useState } from "react";

/**
 * Hook which returns a count of the number of times a condition evaluates to true.
 *
 * @param condition - the condition to observe.
 * @returns number representing the number of times the condition has been met.
 */
export const useConditionCount = (condition: boolean) => {
  const [count, setCount] = useState(0);

  /**
   * Effect which is invoked upon change to the condition state.
   */
  useEffect(() => {
    if (condition) {
      setCount((count) => count + 1);
    }
  }, [condition]);

  return count;
};
