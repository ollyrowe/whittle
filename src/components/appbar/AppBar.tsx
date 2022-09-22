import React, { useContext, useState } from "react";
import styled from "styled-components";
import HowToPlayIcon from "../icons/HowToPlayIcon";
import StatsIcon from "../icons/StatsIcon";
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
        <Title>Whittle</Title>
        <HowToPlayButton size="xl" onClick={openHowToPlay} />
        <StatsButton size="lg" onClick={openStats} />
      </Container>
      <HowToPlayModal open={displayHowToPlay} onClose={closeHowToPlay} />
      <StatisticsModal open={displayStats} onClose={closeStats} />
    </>
  );
};

const Container = styled.div`
  display: flex;
  color: ${(props) => props.theme.text};
  height: 60px;
  border-bottom: 1px solid ${(props) => props.theme.border};
`;

const Title = styled.h1`
  margin: auto;
  max-width: 65px;
`;

const HowToPlayButton = styled(HowToPlayIcon)`
  position: absolute;
  margin: 15px;
  cursor: pointer;
`;

const StatsButton = styled(StatsIcon)`
  display: flex;
  justify-content: flex-end;
  margin: 15px;
  margin-top: 17px;
  cursor: pointer;
`;

export default AppBar;
