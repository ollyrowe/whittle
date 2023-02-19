import React from "react";
import { IconButton } from "@mui/material";
import { Favorite as FavoriteIcon } from "@mui/icons-material";

const SupportButton: React.FC = () => {
  const openSupportPage = () => {
    window.open("https://ko-fi.com/whittle", "_blank");
  };

  return (
    <IconButton
      color="warning"
      size="large"
      onClick={openSupportPage}
      data-testid="support-button"
    >
      <FavoriteIcon fontSize="large" />
    </IconButton>
  );
};

export default SupportButton;
