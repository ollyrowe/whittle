import React, { useContext, useState } from "react";
import styled from "styled-components";
import { IconButton } from "@mui/material";
import {
  HelpOutline as HelpOutlineIcon,
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import HowToPlayModal from "../modals/HowToPlayModal";
import StatisticsModal from "../modals/StatisticsModal";
import SettingsModal from "../modals/SettingsModal";
import { GameContext } from "../providers/GameProvider";

const AppBar: React.FC = () => {
  const { displayStats, openStats, closeStats } = useContext(GameContext);

  const [displayHowToPlay, setDisplayHowToPlay] = useState(false);

  const [displaySettings, setDisplaySettings] = useState(false);

  const openHowToPlay = () => {
    setDisplayHowToPlay(true);
  };

  const closeHowToPlay = () => {
    setDisplayHowToPlay(false);
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
        <LeftButtonContainer>
          <AppBarButton onClick={openHowToPlay}>
            <HelpOutlineIcon />
          </AppBarButton>
        </LeftButtonContainer>
        <Title>Whittle</Title>
        <RightButtonContainer>
          <AppBarButton onClick={openStats}>
            <BarChartIcon />
          </AppBarButton>
          <AppBarButton onClick={openSettings}>
            <SettingsIcon />
          </AppBarButton>
        </RightButtonContainer>
      </Container>
      <HowToPlayModal open={displayHowToPlay} onClose={closeHowToPlay} />
      <StatisticsModal open={displayStats} onClose={closeStats} />
      <SettingsModal open={displaySettings} onClose={closeSettings} />
    </>
  );
};

const LeftButtonContainer = styled.div`
  position: absolute;
  left: ${(props) => props.theme.spacing(0.5)};
  top: ${(props) => props.theme.spacing(0.5)};
`;

const RightButtonContainer = styled.div`
  position: absolute;
  right: ${(props) => props.theme.spacing(0.5)};
  top: ${(props) => props.theme.spacing(0.5)};
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
