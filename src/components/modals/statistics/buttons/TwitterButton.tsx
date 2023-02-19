import React from "react";
import { IconButton } from "@mui/material";
import { Twitter as TwitterIcon } from "@mui/icons-material";

const TwitterButton: React.FC = () => {
  const openTwitterPage = () => {
    window.open("https://twitter.com/WhittleGame", "_blank");
  };

  return (
    <IconButton
      color="info"
      size="large"
      onClick={openTwitterPage}
      data-testid="twitter-button"
    >
      <TwitterIcon fontSize="large" />
    </IconButton>
  );
};

export default TwitterButton;
