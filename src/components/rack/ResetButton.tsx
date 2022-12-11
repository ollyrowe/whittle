import React from "react";
import styled from "styled-components";
import { IconButton } from "@mui/material";
import { Autorenew as AutorenewIcon } from "@mui/icons-material";
import { useGameContext } from "../providers/GameProvider";
import TextButton from "../misc/TextButton";

interface Props {
  type: "text" | "icon";
  disabled?: boolean;
  className?: string;
}

const ResetButton: React.FC<Props> = ({ type, disabled, className }) => {
  const game = useGameContext();

  return type === "text" ? (
    <StyledButton
      onClick={game.reset}
      disabled={disabled}
      className={className}
      data-testid="reset-text-button"
    >
      Reset
    </StyledButton>
  ) : (
    <IconButton
      size="small"
      onClick={game.reset}
      disabled={disabled}
      className={className}
      data-testid="reset-icon-button"
    >
      <AutorenewIcon fontSize="small" />
    </IconButton>
  );
};

export default ResetButton;

const StyledButton = styled(TextButton)`
  height: fit-content;
`;
