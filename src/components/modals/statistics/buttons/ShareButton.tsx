import React from "react";
import { IconButton } from "@mui/material";
import { Share as ShareIcon } from "@mui/icons-material";
import { useModalContext } from "../../../providers/ModalProvider";
import { useShareContext } from "../../../providers/ShareProvider";

const ShareButton: React.FC = () => {
  // Extract share state
  const { canShare } = useShareContext();

  // Extract modal controls
  const { openShare, closeStats } = useModalContext();

  const share = async () => {
    closeStats();

    openShare();
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
