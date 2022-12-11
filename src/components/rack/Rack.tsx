import React from "react";
import styled from "styled-components";
import { useGameContext } from "../providers/GameProvider";
import Tile from "../tile/Tile";
import ResetButton from "./ResetButton";

const Rack: React.FC = () => {
  const { rack } = useGameContext();

  return (
    <Background>
      <Container data-testid="rack">
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
          <ResetButton type="text" />
        )}
      </Container>
    </Background>
  );
};

const Background = styled.div`
  display: flex;
  padding: ${(props) => props.theme.spacing(2, 0)};
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
  min-height: 84px;
`;

export default Rack;
