import React, { useMemo } from "react";
import styled from "styled-components";
import { toBlob } from "html-to-image";
import { Button, useTheme } from "@mui/material";
import { Share as ShareIcon } from "@mui/icons-material";
import { useGameContext } from "../../providers/GameProvider";

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
      // Create a screenshot of the board's DOM
      const blob = await toBlob(boardRef.current, {
        cacheBust: true,
        backgroundColor: theme.palette.background.default,
        // Remove the reset button
        filter: (node) => node.tagName !== "BUTTON",
      });

      if (blob) {
        // Create an image fom the returned blob
        const image = new File([blob], `daily-whittle-${number}.png`, {
          type: blob.type,
        });

        navigator.share({
          title: "Whittle",
          text: `Daily Whittle #${number}`,
          files: [image],
        });
      }
    }
  };

  return (
    <RoundedButton
      variant="contained"
      endIcon={<ShareIcon />}
      onClick={share}
      disabled={!canShare}
    >
      Share
    </RoundedButton>
  );
};

export default ShareButton;

const RoundedButton = styled(Button)`
  border-radius: 20px;
  padding-left: 20px;
  padding-right: 20px;
  color: white;
  font-weight: 700;
  margin: ${(props) => props.theme.spacing(2)};
`;
