import React from "react";
import { IconButton } from "@mui/material";
import { Share as ShareIcon } from "@mui/icons-material";
import { useGameContext } from "../../../providers/GameProvider";
import { useStreakContext } from "../../../providers/StreakProvider";
import {
  createShareText,
  useShareContext,
} from "../../../providers/ShareProvider";

const ShareButton: React.FC = () => {
  // Extract game state
  const game = useGameContext();

  // Extract user's current streak statistics
  const streak = useStreakContext();

  // Extract share utility
  const { shareText } = useShareContext();

  const share = () => {
    const text = createShareText(game, streak);

    shareText(text);
  };

  return (
    <IconButton
      color="success"
      size="large"
      onClick={share}
      data-testid="share-button"
    >
      <ShareIcon fontSize="large" />
    </IconButton>
  );
};

export default ShareButton;
