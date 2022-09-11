import React from "react";
import AppBar from "./components/appbar/AppBar";
import Board from "./components/board/Board";
import Rack from "./components/rack/Rack";
import TileProvider from "./components/tile/TileProvider";
import styled, { ThemeProvider } from "styled-components";
import { useThemeToggle } from "./hooks/useThemeToggle";
import { Letter } from "./model/Letter";
import { Character } from "./model/enums/Character";

const characters = [
  Character.A,
  Character.B,
  Character.C,
  Character.D,
  Character.E,
  Character.F,
  Character.G,
  Character.H,
  Character.I,
  Character.J,
  Character.K,
  Character.L,
  Character.M,
  Character.N,
  Character.O,
];

const createLetters = () => {
  return characters.map((character) => new Letter(character));
};

const App: React.FC = () => {
  const theme = useThemeToggle();

  return (
    <ThemeProvider theme={theme}>
      <TileProvider letters={createLetters()}>
        <Container>
          <AppBar />
          <Board />
          <Rack />
        </Container>
      </TileProvider>
    </ThemeProvider>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.background};
`;

export default App;
