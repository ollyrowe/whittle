import React from "react";
import { IconButton } from "@mui/material";
import { Share as ShareIcon } from "@mui/icons-material";
import { useShareContext } from "../providers/ShareProvider";
import { useModalContext } from "../providers/ModalProvider";

interface Props {
  disabled?: boolean;
  className?: string;
}

const ShareBoardButton: React.FC<Props> = ({ disabled, className }) => {
  // Extract share state
  const { canShare, createPreview } = useShareContext();

  // Extract modal controls
  const { openShare } = useModalContext();

  const share = () => {
    createPreview();

    openShare();
  };

  return (
    <IconButton
      size="small"
      onClick={share}
      disabled={disabled || !canShare}
      className={className}
      data-testid="share-board-button"
    >
      <ShareIcon fontSize="small" />
    </IconButton>
  );
};

export default ShareBoardButton;
