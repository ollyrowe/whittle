import React, {
  createRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { toBlob } from "html-to-image";
import { useTheme } from "styled-components";
import { useGameContext } from "./GameProvider";

interface Props {
  children?: React.ReactNode;
}

const ShareProvider: React.FC<Props> = ({ children }) => {
  const theme = useTheme();

  const { number } = useGameContext();

  // A preview of the image to be shared
  const [preview, setPreview] = useState(new Blob());

  // Whether the letters should be revealed within the shared image
  const [showLetters, setShowLetters] = useState(false);

  // Ref to be bound to the board component
  const boardRef = useRef<HTMLDivElement>(null);

  // Ref to be bound to the tile grid component
  const tileGridRef = useRef<HTMLDivElement>(null);

  /**
   * Determines whether sharing is available within the current context.
   */
  const canShare = useMemo(() => {
    return (
      // Check that sharing is allowed within the current context
      !!navigator.canShare &&
      // Check that the device can actually share images
      !!navigator.canShare(createShareableContent(number, preview))
    );
  }, [number, preview]);

  /**
   * Function which captures a screenshot of the board as an
   * image which is then passed to the user agents share API.
   *
   * @param number - the number of the game being shared
   */
  const share = async (number: number) => {
    // Ensure the board ref is currently bound
    if (boardRef.current) {
      const blob = await createImage({ showLetters });

      if (blob) {
        // Create the shareable content based on the returned blob
        const content = createShareableContent(number, blob);

        navigator.share(content);
      }
    }
  };

  /**
   * Creates an image of the board.
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

        return Promise.resolve(new Blob());
      }

      return Promise.resolve(null);
    },
    [theme]
  );

  const toggleShowLetters = () => {
    setShowLetters((showLetters) => !showLetters);
  };

  const createPreview = useCallback(async () => {
    const preview = await createImage({ showLetters, isPreview: true });

    if (preview) {
      setPreview(preview);
    }
  }, [showLetters, createImage]);

  /**
   * Effect which automatically creates a share preview.
   */
  useEffect(() => {
    createPreview();
  }, [createPreview]);

  const controls: ShareControls = {
    canShare,
    share,
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

export default ShareProvider;

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

/**
 * Creates a shareable object given the game number and the blob containing the captured solution.
 */
const createShareableContent = (number: number, blob: Blob) => {
  // Create an image file fom the blob
  const image = new File([blob], `daily-whittle-${number}.png`, {
    type: blob.type,
  });

  return { files: [image] };
};

interface CreateImageOptions {
  /** Whether a preview image should be created */
  isPreview?: boolean;
  showLetters?: boolean;
}

interface ShareControls {
  canShare: boolean;
  share: (number: number) => Promise<void>;
  preview: Blob | null;
  createPreview: () => void;
  showLetters: boolean;
  toggleShowLetters: () => void;
  boardRef: React.RefObject<HTMLDivElement>;
  tileGridRef: React.RefObject<HTMLDivElement>;
}

export const ShareContext = React.createContext<ShareControls>({
  canShare: false,
  share: () => Promise.resolve(),
  preview: null,
  createPreview: () => {},
  showLetters: false,
  toggleShowLetters: () => {},
  boardRef: createRef(),
  tileGridRef: createRef(),
});

export const useShareContext = () => {
  return useContext(ShareContext);
};
