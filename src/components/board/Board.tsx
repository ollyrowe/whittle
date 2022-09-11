import React, { useContext } from "react";
import styled from "styled-components";
import Tile from "../tile/Tile";
import { TileContext } from "../tile/TileProvider";

export const Board: React.FC = () => {
  const { tiles } = useContext(TileContext);

  return (
    <Background>
      <Container>
        {tiles.board.map((tile) => (
          <Tile
            key={tile.getID()}
            id={tile.getID()}
            letter={tile.getLetter()}
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
`;
