import React from "react";
import styled from "styled-components";
import AppBar from "./components/appbar/AppBar";
import Board from "./components/board/Board";
import Rack from "./components/rack/Rack";
import GameProvider from "./components/providers/GameProvider";
import { useGame } from "./hooks/useGame";

const App: React.FC = () => {
  const game = useGame();

  return (
    <GameProvider game={game}>
      <Container>
        <AppBar />
        <Board />
        <Rack />
      </Container>
    </GameProvider>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.palette.background.default};
`;

export default App;
