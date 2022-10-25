import React from "react";
import styled from "styled-components";

interface Props {
  children?: React.ReactNode;
}

const BoardWrapper: React.FC<Props> = ({ children }) => {
  return (
    <Background>
      <Container>{children}</Container>
    </Background>
  );
};

export default BoardWrapper;

const Background = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
`;

const Container = styled.div`
  margin: auto;
`;
