import React from "react";
import { IconButton } from "@mui/material";
import { Autorenew as AutorenewIcon } from "@mui/icons-material";
import { useGameContext } from "../providers/GameProvider";

interface Props {
  disabled?: boolean;
  className?: string;
}

const ResetButton: React.FC<Props> = ({ disabled, className }) => {
  const game = useGameContext();

  return (
    <IconButton
      onClick={game.reset}
      size="small"
      disabled={disabled}
      className={className}
    >
      <AutorenewIcon fontSize="small" />
    </IconButton>
  );
};

export default ResetButton;
