import React from "react";
import styled from "styled-components";
import { useNextGameTimer } from "../../hooks/useNextGameTimer";
import Modal from "./Modal";
import { Box } from "./../tile/Tile";

interface Props {
  open: boolean;
  onClose: () => void;
}

const StatisticsModal: React.FC<Props> = ({ open, onClose }) => {
  // Time left until the next whittle is released
  const timeUntilNextGame = useNextGameTimer();

  return (
    <Modal title="Statistics" open={open} onClose={onClose}>
      <Container>
        <div>
          <TodayBox size="regular">?</TodayBox>
          <TextBlock>Today's Score</TextBlock>
        </div>
        <StatsRow>
          <StatsBox size="regular">0</StatsBox>
          <StatsBox size="regular">0</StatsBox>
          <StatsBox size="regular">0</StatsBox>
        </StatsRow>
        <StatsRow>
          <StatsTextBlock>Solved</StatsTextBlock>
          <StatsTextBlock>Longest Streak</StatsTextBlock>
          <StatsTextBlock>Current Streak</StatsTextBlock>
        </StatsRow>
        <TimeText>Next Whittle In</TimeText>
        <TimeLeftText>{timeUntilNextGame}</TimeLeftText>
      </Container>
    </Modal>
  );
};

const TextBlock = styled.p`
  font-size: 1em;
  margin-top: 0;
  margin-bottom: 1.5em;
`;

const TimeText = styled.p`
  font-size: 1em;
  margin-top: 0;
  margin-bottom: 0.5em;
`;

const TimeLeftText = styled.p`
  font-size: 1em;
  margin-top: 0;
  margin-bottom: 1.5em;
  font-weight: bold;
`;

const StatsTextBlock = styled.p`
  font-size: 1em;
  margin-top: 0;
  margin-bottom: 1.5em;
  margin-left: 10px;
  margin-right: 10px;
  width: 65px;
  max-width: 65px;
  text-align: center;
`;

const Container = styled.div`
  text-align: center;
`;

const TodayBox = styled(Box)`
  margin-right: auto;
  margin-left: auto;
`;

const StatsRow = styled.div`
  display: inline-flex;
`;

const StatsBox = styled(Box)`
  margin-left: 10px;
  margin-right: 10px;
`;

export default StatisticsModal;
