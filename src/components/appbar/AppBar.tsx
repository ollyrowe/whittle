import React from "react";
import styled from "styled-components";

const AppBar: React.FC = () => {
  return (
    <Container>
      <Title>Whittle</Title>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  color: ${(props) => props.theme.text};
  height: 60px;
  border-bottom: 1px solid ${(props) => props.theme.border};
`;

const Title = styled.h1`
  margin: auto;
`;

export default AppBar;
