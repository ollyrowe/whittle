import React, {
  createRef,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { toBlob } from "html-to-image";
import { useTheme } from "styled-components";
import { useShareContext } from "./ShareProvider";

interface Props {
  children?: React.ReactNode;
}

const ScreenshotProvider: React.FC<Props> = ({ children }) => {
  const theme = useTheme();

  // Extract share controls
  const { shareBlob } = useShareContext();

  // A preview of the image to be taken
  const [preview, setPreview] = useState(new Blob([], { type: "image/png" }));

  // Whether the letters should be revealed within the image
  const [showLetters, setShowLetters] = useState(false);

  // Ref to be bound to the board component
  const boardRef = useRef<HTMLDivElement>(null);

  // Ref to be bound to the tile grid component
  const tileGridRef = useRef<HTMLDivElement>(null);

  /**
   * Function which captures a screenshot of the board and shares it.
   */
  const shareScreenshot = async () => {
    // Ensure the board ref is currently bound
    if (boardRef.current) {
      const blob = await createImage({ showLetters });

      if (blob) {
        shareBlob(blob, "whittle.png");
      }
    }
  };

  /**
   * Creates an image of the board and its contained tiles.
   */
  const createImage = useCallback(
    ({ isPreview, showLetters }: CreateImageOptions = {}) => {
      // If the image should be a preview, target the tile grid, ignoring the board title
      const target = isPreview ? tileGridRef.current : boardRef.current;

      if (target) {
        // Check that this isn't currently the test environment as the method doesn't run
        if (!(window as any).Cypress) {
          // Create a screenshot of the target's DOM
          return doToBlob(target, {
            cacheBust: true,
            backgroundColor: theme.palette.background.default,
            filter: (node: HTMLElement) => {
              return (
                // Remove the reset button
                node.tagName !== "BUTTON" &&
                // Remove the letters from the tiles unless specified otherwise
                (showLetters ||
                  node.parentElement?.getAttribute("role") !== "button")
              );
            },
          });
        }

        // Return an empty blob to support the test environment
        return Promise.resolve(new Blob());
      }

      return Promise.resolve(null);
    },
    [theme]
  );

  const toggleShowLetters = () => {
    setShowLetters((showLetters) => !showLetters);
  };

  /**
   * Creates a preview image of the board and its contained tiles.
   */
  const createPreview = useCallback(async () => {
    const preview = await createImage({ showLetters, isPreview: true });

    if (preview) {
      setPreview(preview);
    }
  }, [showLetters, createImage]);

  /**
   * Effect which automatically creates a preview image.
   */
  useEffect(() => {
    createPreview();
  }, [createPreview]);

  const controls: ShareControls = {
    shareScreenshot,
    preview,
    createPreview,
    showLetters,
    toggleShowLetters,
    boardRef,
    tileGridRef,
  };

  return (
    <ShareContext.Provider value={controls}>{children}</ShareContext.Provider>
  );
};

export default ScreenshotProvider;

/**
 * Calls the html-to-image toBlob method.
 *
 * This call is made several times to implement the fix outlined within the issue below.
 *
 * https://github.com/tsayen/dom-to-image/issues/343#issuecomment-685428224
 */
const doToBlob = async (node: HTMLDivElement, options: any) => {
  await toBlob(node, options);
  await toBlob(node, options);

  return toBlob(node, options);
};

interface CreateImageOptions {
  /** Whether a preview image should be created */
  isPreview?: boolean;
  /** Whether the letters should be present within the image */
  showLetters?: boolean;
}

interface ShareControls {
  shareScreenshot: () => Promise<void>;
  preview: Blob | null;
  createPreview: () => void;
  showLetters: boolean;
  toggleShowLetters: () => void;
  boardRef: React.RefObject<HTMLDivElement>;
  tileGridRef: React.RefObject<HTMLDivElement>;
}

export const ShareContext = React.createContext<ShareControls>({
  shareScreenshot: () => Promise.resolve(),
  preview: null,
  createPreview: () => {},
  showLetters: false,
  toggleShowLetters: () => {},
  boardRef: createRef(),
  tileGridRef: createRef(),
});

export const useScreenshotContext = () => {
  return useContext(ShareContext);
};
