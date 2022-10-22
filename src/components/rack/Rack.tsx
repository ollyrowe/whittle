import React, { useContext } from "react";
import styled from "styled-components";
import { GameContext } from "../providers/GameProvider";
import Tile from "../tile/Tile";
import ResetButton from "./ResetButton";

const Rack: React.FC = () => {
  const { rack } = useContext(GameContext);

  return (
    <Background>
      <Container>
        {rack.hasLetterTile() ? (
          rack
            .getTiles()
            .map((tile) => (
              <Tile
                key={tile.getID()}
                state={tile.getState()}
                id={tile.getID()}
                letter={tile.getLetter()}
                size="small"
              />
            ))
        ) : (
          <ResetButton />
        )}
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
  height: fit-content;
`;

export default Rack;
