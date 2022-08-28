import React from "react";
import styled from "styled-components";

interface Props {
  children?: React.ReactNode;
}

const Tile: React.FC<Props> = ({ children }) => {
  return (
    <Box>
      <Content>{children}</Content>
    </Box>
  );
};

const Box = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: xx-large;
  font-weight: bold;
  background-color: ${(props) => props.theme.background};
  margin: 2.5px;
  border: 2px solid ${(props) => props.theme.border};
  border-radius: 2px;
  width: 20%;
  padding-bottom: calc(20% - 9px);
  max-width: 80px;
  max-height: 80px;
  user-select: none;
`;

const Content = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Tile;
