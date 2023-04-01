import React from "react";
import styled from "styled-components";
import { alpha, Typography } from "@mui/material";
import { GameSolution } from "../../model/game/GameLoader";
import BoardWrapper from "./BoardWrapper";
import GameTitle from "./GameTitle";
import TileGrid from "./TileGrid";

interface Props {
  solution: GameSolution;
}

export const SolutionBoard: React.FC<Props> = ({ solution }) => {
  return (
    <BoardWrapper dense>
      <Header>
        <GameTitle number={solution.number} />
        <Subtitle variant="body2">{solution.theme}</Subtitle>
      </Header>
      <TileGrid tiles={solution.board.getTiles()} disabled />
    </BoardWrapper>
  );
};

export default SolutionBoard;

const Header = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${(props) => alpha(props.theme.palette.text.primary, 0.64)};
`;

const Subtitle = styled(Typography)`
  font-weight: bold;
  margin-top: 0.2rem;
  margin-bottom: 1rem;
  text-align: center;
`;
