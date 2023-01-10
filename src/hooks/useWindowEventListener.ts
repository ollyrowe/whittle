import { useEffect } from "react";

/**
 * Binds an event listener to the global window object.
 *
 * @param event - the event to listen for.
 * @param callback - the event callback.
 */
export const useWindowEventListener = <T extends keyof WindowEventMap>(
  event: T,
  callback: (this: Window, ev: WindowEventMap[T]) => void
) => {
  useEffect(() => {
    window.addEventListener(event, callback);

    return () => {
      window.removeEventListener(event, callback);
    };
  }, [event, callback]);
};
