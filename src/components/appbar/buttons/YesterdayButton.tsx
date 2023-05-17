import React from "react";
import { EventRepeat as EventRepeatIcon } from "@mui/icons-material";
import { useModalContext } from "../../providers/ModalProvider";
import AppBarButton from "./AppBarButton";

const YesterdayButton: React.FC = () => {
  // Extract modal controls
  const { openYesterdays } = useModalContext();

  return (
    <AppBarButton onClick={openYesterdays} data-testid="yesterdays-button">
      <EventRepeatIcon />
    </AppBarButton>
  );
};

export default YesterdayButton;
