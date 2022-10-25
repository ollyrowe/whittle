import React, { useContext } from "react";
import { IconButton } from "@mui/material";
import { Autorenew as AutorenewIcon } from "@mui/icons-material";
import { GameContext } from "../providers/GameProvider";

interface Props {
  className?: string;
}

const ResetButton: React.FC<Props> = ({ className }) => {
  const game = useContext(GameContext);

  return (
    <IconButton onClick={game.reset} size="small" className={className}>
      <AutorenewIcon fontSize="small" />
    </IconButton>
  );
};

export default ResetButton;
