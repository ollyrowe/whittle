import React, { useContext } from "react";
import styled from "styled-components";
import Tile from "../tile/Tile";
import { GameContext } from "../providers/GameProvider";
import GameNumber from "./GameNumber";

export const Board: React.FC = () => {
  const { board } = useContext(GameContext);

  return (
    <Background>
      <Container>
        <GameNumber />
        <TileContainer>
          {board.getTiles().map((tile) => (
            <Tile
              key={tile.getID()}
              state={tile.getState()}
              id={tile.getID()}
              letter={tile.getLetter()}
              disabled={tile.isDisabled() || board.isDisabled()}
              hasPlaceholder
            />
          ))}
        </TileContainer>
      </Container>
    </Background>
  );
};

export default Board;

const Background = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 12px;
  flex-grow: 1;
  justify-content: center;
`;

const Container = styled.div`
  margin: auto;
`;

const TileContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 350px;
  height: fit-content;
`;
