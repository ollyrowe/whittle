import React, { useMemo } from "react";
import { toBlob } from "html-to-image";
import { IconButton, useTheme } from "@mui/material";
import { Share as ShareIcon } from "@mui/icons-material";
import { useGameContext } from "../../../providers/GameProvider";

const ShareButton: React.FC = () => {
  const theme = useTheme();

  const { boardRef, board, number } = useGameContext();

  const canShare = useMemo(() => {
    return (
      // Check that sharing is allowed within the current context
      !!navigator.canShare &&
      // Ensure the board is disabled which implies it contains a completed solution
      board.isDisabled()
    );
  }, [board]);

  /**
   * Function which captures a screenshot of the board as an
   * image which is then passed to the user agents share API.
   */
  const share = async () => {
    // Ensure the board ref is currently bound
    if (boardRef.current) {
      let blob: Blob | null = new Blob();

      // Check that this isn't currently the test environment
      if (!(window as any).Cypress) {
        // Create a screenshot of the board's DOM
        blob = await doToBlob(boardRef.current, {
          cacheBust: true,
          backgroundColor: theme.palette.background.default,
          // Remove the reset button
          filter: (node: HTMLElement) => node.tagName !== "BUTTON",
        });
      }

      if (blob) {
        // Create an image fom the returned blob
        const image = new File([blob], `daily-whittle-${number}.png`, {
          type: blob.type,
        });

        navigator.share({ files: [image] });
      }
    }
  };

  return (
    <IconButton
      color="success"
      size="large"
      onClick={share}
      disabled={!canShare}
      data-testid="share-button"
    >
      <ShareIcon fontSize="large" />
    </IconButton>
  );
};

export default ShareButton;

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
