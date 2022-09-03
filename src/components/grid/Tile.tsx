import React from "react";
import styled from "styled-components";

interface Props {
  children?: React.ReactNode;
}

const Tile: React.FC<Props> = ({ children }) => {
  return <Box>{children}</Box>;
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
  width: 61px;
  height: 61px;
  user-select: none;
  flex-shrink: 0;
`;

export default Tile;
