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
import ScreenshotModal from "./components/modals/screenshot/ScreenshotModal";
import ScoreModal from "./components/modals/score/ScoreModal";
import ScoreInfoModal from "./components/modals/score/ScoreInfoModal";

interface Props {
  settings: SettingsOptions;
}

const Game: React.FC<Props> = ({ settings }) => {
  const game = useGame(settings);

  return (
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
      <ScreenshotModal />
      <ScoreModal />
      <ScoreInfoModal />
      <CssBaseline enableColorScheme />
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

export default Game;
