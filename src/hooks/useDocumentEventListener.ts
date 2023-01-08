import { useEffect } from "react";

/**
 * Binds an event listener to the global document object.
 *
 * @param event - the event to listen for.
 * @param callback - the event callback.
 */
export const useDocumentEventListener = <T extends keyof DocumentEventMap>(
  event: T,
  callback: (this: Document, ev: DocumentEventMap[T]) => void
) => {
  useEffect(() => {
    document.addEventListener(event, callback);

    return () => {
      document.removeEventListener(event, callback);
    };
  }, [event, callback]);
};
