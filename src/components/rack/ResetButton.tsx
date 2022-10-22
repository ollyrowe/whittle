import React, { useContext } from "react";
import { IconButton } from "@mui/material";
import { Autorenew as AutorenewIcon } from "@mui/icons-material";
import { GameContext } from "../providers/GameProvider";

const ResetButton: React.FC = () => {
  const game = useContext(GameContext);

  return (
    <IconButton onClick={game.reset}>
      <AutorenewIcon />
    </IconButton>
  );
};

export default ResetButton;
