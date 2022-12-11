import React from "react";
import styled from "styled-components";
import { alpha } from "@mui/material";
import { useGameContext } from "../providers/GameProvider";
import BoardWrapper from "./BoardWrapper";
import GameNumber from "./GameNumber";
import ResetButton from "../rack/ResetButton";
import TileGrid from "./TileGrid";

export const Board: React.FC = () => {
  const { number, board, boardRef } = useGameContext();

  return (
    <BoardWrapper ref={boardRef} data-testid="board">
      <Header>
        <GameNumber number={number} />
        <FixedResetButton type="icon" disabled={!board.hasLetterTile()} />
      </Header>
      <TileGrid
        tiles={board.getTiles()}
        disabled={board.isDisabled()}
        tileSize="large"
      />
    </BoardWrapper>
  );
};

export default Board;

const Header = styled.div`
  height: 30px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  color: ${(props) => alpha(props.theme.palette.text.primary, 0.64)};
`;

const FixedResetButton = styled(ResetButton)`
  position: absolute;
  right: 0;
  top: 0;
`;
