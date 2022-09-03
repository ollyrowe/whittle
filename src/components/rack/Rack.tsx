import React from "react";
import styled from "styled-components";
import Tile from "../grid/Tile";
import { NO_OF_LETTERS } from "../../misc/constants";

const Grid: React.FC = () => {
  return (
    <Background>
      <Container>
        {new Array(NO_OF_LETTERS).fill(0).map((_, index) => (
          <Tile key={index} />
        ))}
      </Container>
    </Background>
  );
};

const Background = styled.div`
  display: flex;
  padding: 8px 12px;
  flex-grow: 1;
  overflow: hidden;
`;

const Container = styled.div`
  display: flex;
  max-width: 350px;
  overflow-x: auto;
  margin: auto;
`;

export default Grid;
