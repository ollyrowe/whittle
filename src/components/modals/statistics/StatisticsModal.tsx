import React from "react";
import styled from "styled-components";
import { IconButton, IconButtonProps, Typography } from "@mui/material";
import { InfoOutlined as InfoOutlinedIcon } from "@mui/icons-material";
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
import { useStreakContext } from "../../providers/StreakProvider";

const StatisticsModal = () => {
  // Extract modal state and controls
  const { displayStats, closeStats, openScore, openScoreInfo } =
    useModalContext();

  // Extract streak state
  const { hasCompletedTodaysGame } = useStreakContext();

  // Extract game state
  const { board, timer, score } = useGameContext();

  // Time left until the next game is released
  const timeUntilNextGame = useNextGameTimer();

  const displayScoreModal = () => {
    closeStats();

    // If the game has been complete
    if (board.isDisabled()) {
      openScore();
    } else {
      openScoreInfo();
    }
  };

  return (
    <Modal
      title="Statistics"
      open={displayStats}
      onClose={closeStats}
      headerAction={<ScoreButton onClick={displayScoreModal} />}
      aria-describedby="statistics"
      data-testid="statistics-modal"
    >
      <Container id="statistics">
        <StreakDisplay />
        {hasCompletedTodaysGame && (
          <CardContainer>
            <TimeCard time={timer.text} disabled={!board.isDisabled()} />
            <ScoreCard
              score={score}
              disabled={!board.isDisabled()}
              onClick={displayScoreModal}
            />
          </CardContainer>
        )}
        <ButtonContainer>
          {board.isDisabled() && <ShareButton />}
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

const ScoreButton: React.FC<IconButtonProps> = (props) => {
  return (
    <IconButton {...props} data-testid="score-button">
      <InfoOutlinedIcon />
    </IconButton>
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
  font-size: 15px;
`;

const CardContainer = styled.div`
  display: flex;
  align-self: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

const TimeText = styled(Typography)`
  font-size: 1em;
  margin-top: 0;
  margin-bottom: 2px;
`;

export default StatisticsModal;
