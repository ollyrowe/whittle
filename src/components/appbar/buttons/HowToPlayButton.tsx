import React from "react";
import { HelpOutline as HelpOutlineIcon } from "@mui/icons-material";
import { useModalContext } from "../../providers/ModalProvider";
import AppBarButton from "./AppBarButton";

const HowToPlayButton: React.FC = () => {
  // Extract modal controls
  const { openHowToPlay } = useModalContext();

  return (
    <AppBarButton onClick={openHowToPlay} data-testid="how-to-play-button">
      <HelpOutlineIcon />
    </AppBarButton>
  );
};

export default HowToPlayButton;
