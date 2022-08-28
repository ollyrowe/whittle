import React from "react";
import styled from "styled-components";

interface Props {
  children?: React.ReactNode;
}

const Rack: React.FC<Props> = ({ children }) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  display: flex;
`;

export default Rack;
