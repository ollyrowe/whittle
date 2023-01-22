import React from "react";
import { IconButton } from "@mui/material";
import { PhotoCameraOutlined as PhotoCameraIcon } from "@mui/icons-material";
import { useScreenshotContext } from "../providers/ScreenshotProvider";
import { useModalContext } from "../providers/ModalProvider";

interface Props {
  disabled?: boolean;
  className?: string;
}

const ScreenshotButton: React.FC<Props> = ({ disabled, className }) => {
  // Extract screenshot controls
  const { createPreview } = useScreenshotContext();

  // Extract modal controls
  const { openScreenshot } = useModalContext();

  const takeScreenshot = () => {
    createPreview();

    openScreenshot();
  };

  return (
    <IconButton
      size="small"
      onClick={takeScreenshot}
      disabled={disabled}
      className={className}
      data-testid="screenshot-button"
    >
      <PhotoCameraIcon fontSize="small" />
    </IconButton>
  );
};

export default ScreenshotButton;
