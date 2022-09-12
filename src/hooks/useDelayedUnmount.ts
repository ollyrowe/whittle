import { useState, useEffect } from "react";

/**
 * Hook which returns a boolean that becomes truthy a specified number of
 * milliseconds after the associated component is unmounted.
 *
 * @param isMounted - whether the associated component is currently
 *                    mounted.
 * @param delayTime - the time delay, in milliseconds.
 * @returns boolean indicating whether the delay time has lapsed.
 */
export const useDelayUnmount = (isMounted: boolean, delayTime: number) => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    if (isMounted && !shouldRender) {
      setShouldRender(true);
    } else if (!isMounted && shouldRender) {
      // Update the timeout to set the should render state to false after the delay time
      timeoutId = setTimeout(() => setShouldRender(false), delayTime);
    }

    return () => clearTimeout(timeoutId);
  }, [isMounted, delayTime, shouldRender]);

  return shouldRender;
};
