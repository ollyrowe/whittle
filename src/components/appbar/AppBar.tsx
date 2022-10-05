import React, { useContext, useState } from "react";
import styled from "styled-components";
import { IconButton } from "@mui/material";
import {
  HelpOutline as HelpOutlineIcon,
  BarChart as BarChartIcon,
} from "@mui/icons-material";
import HowToPlayModal from "../modals/HowToPlayModal";
import StatisticsModal from "../modals/StatisticsModal";
import { GameContext } from "../providers/GameProvider";

const AppBar: React.FC = () => {
  const { displayStats, openStats, closeStats } = useContext(GameContext);

  const [displayHowToPlay, setDisplayHowToPlay] = useState(false);

  const openHowToPlay = () => {
    setDisplayHowToPlay(true);
  };

  const closeHowToPlay = () => {
    setDisplayHowToPlay(false);
  };

  return (
    <>
      <Container>
        <AppBarButton onClick={openHowToPlay}>
          <HelpOutlineIcon />
        </AppBarButton>
        <Title>Whittle</Title>
        <AppBarButton onClick={openStats}>
          <BarChartIcon />
        </AppBarButton>
      </Container>
      <HowToPlayModal open={displayHowToPlay} onClose={closeHowToPlay} />
      <StatisticsModal open={displayStats} onClose={closeStats} />
    </>
  );
};

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
  margin: auto ${(props) => props.theme.spacing(2)};
`;

export default AppBar;
