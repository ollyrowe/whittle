import React from "react";
import AppBar from "./components/appbar/AppBar";
import Board from "./components/board/Board";
import Rack from "./components/rack/Rack";
import GameProvider from "./components/providers/GameProvider";
import styled, { ThemeProvider } from "styled-components";
import { useThemeToggle } from "./hooks/useThemeToggle";
import { useGame } from "./hooks/useGame";

const App: React.FC = () => {
  const theme = useThemeToggle();

  const game = useGame();

  return (
    <ThemeProvider theme={theme}>
      <GameProvider game={game}>
        <Container>
          <AppBar />
          <Board />
          <Rack />
        </Container>
      </GameProvider>
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
