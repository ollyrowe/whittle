import React, { useState } from "react";
import styled from "styled-components";
import { IconButton } from "@mui/material";
import {
  HelpOutline as HelpOutlineIcon,
  EventRepeat as EventRepeatIcon,
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import { useGameContext } from "../providers/GameProvider";
import HowToPlayModal from "../modals/how-to-play/HowToPlayModal";
import YesterdayModal from "../modals/yesterday/YesterdayModal";
import StatisticsModal from "../modals/statistics/StatisticsModal";
import SettingsModal from "../modals/settings/SettingsModal";

const AppBar: React.FC = () => {
  const {
    displayStats,
    openStats,
    closeStats,
    displayHowToPlay,
    openHowToPlay,
    closeHowToPlay,
  } = useGameContext();

  const [displayYesterdays, setDisplayYesterdays] = useState(false);

  const [displaySettings, setDisplaySettings] = useState(false);

  const openYesterdays = () => {
    setDisplayYesterdays(true);
  };

  const closeYesterdays = () => {
    setDisplayYesterdays(false);
  };

  const openSettings = () => {
    setDisplaySettings(true);
  };

  const closeSettings = () => {
    setDisplaySettings(false);
  };

  return (
    <>
      <Container>
        <ButtonContainer>
          <AppBarButton onClick={openHowToPlay}>
            <HelpOutlineIcon />
          </AppBarButton>
          <AppBarButton onClick={openYesterdays}>
            <EventRepeatIcon />
          </AppBarButton>
        </ButtonContainer>
        <Title>Whittle</Title>
        <ButtonContainer>
          <AppBarButton onClick={openStats}>
            <BarChartIcon />
          </AppBarButton>
          <AppBarButton onClick={openSettings}>
            <SettingsIcon />
          </AppBarButton>
        </ButtonContainer>
      </Container>
      <HowToPlayModal open={displayHowToPlay} onClose={closeHowToPlay} />
      <YesterdayModal open={displayYesterdays} onClose={closeYesterdays} />
      <StatisticsModal open={displayStats} onClose={closeStats} />
      <SettingsModal open={displaySettings} onClose={closeSettings} />
    </>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  margin: auto;
`;

const Container = styled.div`
  display: flex;
  height: 60px;
  border-bottom: 1px solid ${(props) => props.theme.palette.border};
`;

const Title = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  color: ${(props) => props.theme.palette.text.primary};
`;

const AppBarButton = styled(IconButton)`
  color: ${(props) => props.theme.palette.text.primary};
  margin: ${(props) => props.theme.spacing(0.5)};
`;

export default AppBar;
