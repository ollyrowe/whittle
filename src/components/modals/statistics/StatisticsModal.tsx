import React from "react";
import styled from "styled-components";
import { Typography } from "@mui/material";
import Modal from "../Modal";
import StreakDisplay from "./StreakDisplay";
import SupportButton from "./buttons/SupportButton";
import ShareButton from "./buttons/ShareButton";
import TwitterButton from "./buttons/TwitterButton";
import TimeCard from "./cards/TimeCard";
import ScoreCard from "./cards/ScoreCard";
import { useNextGameTimer } from "../../../hooks/useNextGameTimer";
import { useModalContext } from "../../providers/ModalProvider";
import { useGameContext } from "../../providers/GameProvider";

const StatisticsModal = () => {
  // Extract modal state and controls
  const { displayStats, closeStats } = useModalContext();

  const { board, timer } = useGameContext();

  // Time left until the next game is released
  const timeUntilNextGame = useNextGameTimer();

  return (
    <Modal
      title="Statistics"
      open={displayStats}
      onClose={closeStats}
      aria-describedby="statistics"
      data-testid="statistics-modal"
    >
      <Container id="statistics">
        <StreakDisplay />
        <CardContainer>
          <TimeCard time={timer.text} disabled={!board.isDisabled()} />
          <ScoreCard disabled={!board.isDisabled()} />
        </CardContainer>
        <ButtonContainer>
          <ShareButton />
          <SupportButton />
          <TwitterButton />
        </ButtonContainer>
        <NextGameSection>
          <TimeText>Next Whittle In</TimeText>
          {timeUntilNextGame}
        </NextGameSection>
      </Container>
    </Modal>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 400px;
`;

const NextGameSection = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
`;

const CardContainer = styled.div`
  display: flex;
  margin-top: 12px;
  align-self: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const TimeText = styled(Typography)`
  font-size: 1em;
  margin-top: 0;
  margin-bottom: 2px;
`;

export default StatisticsModal;
