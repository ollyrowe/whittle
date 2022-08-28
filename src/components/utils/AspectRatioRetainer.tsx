import { useState, useRef, useEffect } from "react";
import { useWindowEventListener } from "../../hooks/useEventListener";

interface Props {
  /** The aspect ratio to maintain. [1, 2] represents an aspect ratio of 1 / 2 */
  ratio: [number, number];
  className?: string;
  children: React.ReactNode;
}

/**
 * Utility component which maintains an aspect ratio based upon
 * the component's height. This provides a cross-platform replacement
 * for the aspect-ratio CSS property which is only available within
 * modern web browsers.
 */
const AspectRatioRetainer: React.FC<Props> = ({
  ratio,
  className,
  children,
}) => {
  // Reference to the component
  const ref = useRef<HTMLDivElement>(null);

  // The height of the component
  const [height, setHeight] = useState(0);

  // Compute the width based on the height and the aspect ratio
  const width = height * (ratio[0] / ratio[1]);

  const updateHeight = () => {
    if (ref.current) {
      setHeight(ref.current.offsetHeight);
    }
  };

  // Upon re-render, update the height state
  useEffect(updateHeight);

  // Upon window resize, update the height state
  useWindowEventListener("resize", updateHeight);

  return (
    <div ref={ref} className={className} style={{ width }}>
      {children}
    </div>
  );
};

export default AspectRatioRetainer;
