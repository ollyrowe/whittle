import React from "react";
import { Settings as SettingsIcon } from "@mui/icons-material";
import { useModalContext } from "../../providers/ModalProvider";
import AppBarButton from "./AppBarButton";

const SettingsButton: React.FC = () => {
  // Extract modal controls
  const { openSettings } = useModalContext();

  return (
    <AppBarButton onClick={openSettings} data-testid="settings-button">
      <SettingsIcon />
    </AppBarButton>
  );
};

export default SettingsButton;
