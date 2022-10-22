import React, { useContext } from "react";
import styled from "styled-components";
import { Typography, alpha } from "@mui/material";
import { GameContext } from "../providers/GameProvider";

const GameNumber = () => {
  const { number } = useContext(GameContext);

  return <Text>{`Daily Whittle #${number}`}</Text>;
};

export default GameNumber;

const Text = styled(Typography)`
  text-align: center;
  color: ${(props) => alpha(props.theme.palette.text.primary, 0.64)};
  margin-bottom: 1.2rem;
`;
