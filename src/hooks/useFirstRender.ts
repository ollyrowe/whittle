import { useRef, useEffect } from "react";

/**
 * Hook which identifies whether the first render has passed.
 *
 * @returns true if this is the first render.
 */
export const useFirstRender = () => {
  const firstRender = useRef(true);

  useEffect(() => {
    firstRender.current = false;
  }, []);

  return firstRender.current;
};
