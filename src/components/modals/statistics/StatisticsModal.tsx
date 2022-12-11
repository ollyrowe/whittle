import React from "react";
import styled from "styled-components";
import { Typography } from "@mui/material";
import Modal from "../Modal";
import StreakDisplay from "./StreakDisplay";
import ShareButton from "./ShareButton";
import { useNextGameTimer } from "../../../hooks/useNextGameTimer";

interface Props {
  open: boolean;
  onClose: () => void;
}

const StatisticsModal: React.FC<Props> = ({ open, onClose }) => {
  // Time left until the next game is released
  const timeUntilNextGame = useNextGameTimer();

  return (
    <Modal
      title="Statistics"
      open={open}
      onClose={onClose}
      aria-describedby="statistics"
      data-testid="statistics-modal"
    >
      <Container id="statistics">
        <StreakDisplay />
        <NextGameSection>
          <TimeText>Next Whittle In</TimeText>
          {timeUntilNextGame}
        </NextGameSection>
        <ButtonContainer>
          <ShareButton />
        </ButtonContainer>
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

const TimeText = styled(Typography)`
  font-size: 1em;
  margin-top: 0;
  margin-bottom: 0.5em;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export default StatisticsModal;
