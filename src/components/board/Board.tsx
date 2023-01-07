import React from "react";
import styled from "styled-components";
import { alpha } from "@mui/material";
import { useGameContext } from "../providers/GameProvider";
import { useShareContext } from "../providers/ShareProvider";
import BoardWrapper from "./BoardWrapper";
import GameTitle from "./GameTitle";
import ResetButton from "../rack/ResetButton";
import TileGrid from "./TileGrid";

export const Board: React.FC = () => {
  const { board, number, answer, onReturnTileToRack } = useGameContext();

  const { boardRef, tileGridRef } = useShareContext();

  return (
    <BoardWrapper ref={boardRef} data-testid="board">
      <Header>
        <GameTitle number={number} answer={answer} />
        <FixedResetButton type="icon" disabled={!board.hasLetterTile()} />
      </Header>
      <TileGrid
        ref={tileGridRef}
        tiles={board.getTiles()}
        disabled={board.isDisabled()}
        tileSize="large"
        onDoubleClickTile={onReturnTileToRack}
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
  margin-top: ${(props) => !props.theme.isSmallDisplay && "0.5rem"};
  margin-bottom: ${(props) => (props.theme.isSmallDisplay ? "0.4rem" : "1rem")};
  color: ${(props) => alpha(props.theme.palette.text.primary, 0.64)};
`;

const FixedResetButton = styled(ResetButton)`
  position: absolute;
  right: 0;
  top: 0;
`;
