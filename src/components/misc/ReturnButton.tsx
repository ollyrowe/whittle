import React from "react";
import { IconButton, IconButtonProps } from "@mui/material";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";

const ReturnButton: React.FC<IconButtonProps> = (props) => {
  return (
    <IconButton {...props} data-testid="return-button">
      <ArrowBackIcon />
    </IconButton>
  );
};

export default ReturnButton;
