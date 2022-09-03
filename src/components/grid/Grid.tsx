import React from "react";
import styled from "styled-components";
import Row from "./Row";
import Tile from "./Tile";
import { GRID_HEIGHT, GRID_WIDTH } from "../../misc/constants";

const Grid: React.FC = () => {
  return (
    <Background>
      <Container>
        {new Array(GRID_HEIGHT).fill(0).map((_, index) => (
          <Row key={index}>
            {new Array(GRID_WIDTH).fill(0).map((_, index) => (
              <Tile key={index} />
            ))}
          </Row>
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
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 350px;
`;

export default Grid;
