import React from "react";
import styled from "styled-components";
import { alpha, Button, IconButton } from "@mui/material";
import { Autorenew as AutorenewIcon } from "@mui/icons-material";
import { useGameContext } from "../providers/GameProvider";

interface Props {
  type: "text" | "icon";
  disabled?: boolean;
  className?: string;
}

const ResetButton: React.FC<Props> = ({ type, disabled, className }) => {
  const game = useGameContext();

  return type === "text" ? (
    <TextButton onClick={game.reset} disabled={disabled} className={className}>
      Reset
    </TextButton>
  ) : (
    <IconButton
      size="small"
      onClick={game.reset}
      disabled={disabled}
      className={className}
    >
      <AutorenewIcon fontSize="small" />
    </IconButton>
  );
};

export default ResetButton;

const TextButton = styled(Button)`
  height: fit-content;
  color: ${(props) => alpha(props.theme.palette.text.primary, 0.64)};
  &:hover {
    background-color: ${(props) =>
      alpha(props.theme.palette.text.primary, 0.08)}};
  }
`;
