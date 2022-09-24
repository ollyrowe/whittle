import React, { useContext } from "react";
import styled from "styled-components";
import Tile from "../tile/Tile";
import { GameContext } from "../providers/GameProvider";

export const Board: React.FC = () => {
  const { board } = useContext(GameContext);

  return (
    <Background>
      <Container>
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
      </Container>
    </Background>
  );
};

export default Board;

const Background = styled.div`
  display: flex;
  padding: 8px 12px;
  flex-grow: 1;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 350px;
  height: fit-content;
  margin: auto;
`;
