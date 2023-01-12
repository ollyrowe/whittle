import React from "react";
import styled from "styled-components";
import AppBar from "./components/appbar/AppBar";
import Board from "./components/board/Board";
import Rack from "./components/rack/Rack";
import GameProvider from "./components/providers/GameProvider";
import { useGame } from "./hooks/useGame";
import { CssBaseline } from "@mui/material";
import { SettingsOptions } from "./hooks/useSettings";
import HowToPlayModal from "./components/modals/how-to-play/HowToPlayModal";
import SettingsModal from "./components/modals/settings/SettingsModal";
import StatisticsModal from "./components/modals/statistics/StatisticsModal";
import YesterdayModal from "./components/modals/yesterday/YesterdayModal";
import ShareModal from "./components/modals/share/ShareModal";
import ShareProvider from "./components/providers/ShareProvider";

interface Props {
  settings: SettingsOptions;
}

const Game: React.FC<Props> = ({ settings }) => {
  const game = useGame(settings);

  return (
    <ShareProvider>
      <GameProvider game={game}>
        <Container data-testid="background">
          <AppBar />
          <Board />
          <Rack />
        </Container>
        <HowToPlayModal />
        <YesterdayModal />
        <StatisticsModal />
        <SettingsModal />
        <ShareModal />
        <CssBaseline enableColorScheme />
      </GameProvider>
    </ShareProvider>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.palette.background.default};
`;

export default Game;
