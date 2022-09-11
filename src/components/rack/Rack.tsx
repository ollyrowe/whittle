import React, { useContext } from "react";
import styled from "styled-components";
import { TileContext } from "../tile/TileProvider";
import Tile from "../tile/Tile";

const Rack: React.FC = () => {
  const { tiles } = useContext(TileContext);

  return (
    <Background>
      <Container>
        {tiles.rack.map((tile) => (
          <Tile
            key={tile.getID()}
            id={tile.getID()}
            letter={tile.getLetter()}
            size="small"
          />
        ))}
      </Container>
    </Background>
  );
};

const Background = styled.div`
  display: flex;
  padding: 8px 12px;
  flex-grow: 1;
`;

const Container = styled.div`
  display: flex;
  max-width: 341px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 2.5px;
  margin-bottom: 2.5px;
`;

export default Rack;
