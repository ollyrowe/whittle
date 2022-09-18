import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "./Modal";
import { Box } from "./../tile/Tile";

interface Props {
  open: boolean;
  onClose: () => void;
}

const StatisticsModal: React.FC<Props> = ({ open, onClose }) => {
  // Time left until next whittle is released
  const [timeLeft, setTimeLeft] = useState(new Date());

  useEffect(() => {
    const secondTimer = setInterval(() => {
      const localMidnight = new Date();
      localMidnight.setHours(24, 0, 0, 0);
      // Difference between midnight and current time
      setTimeLeft(new Date(localMidnight.getTime() - new Date().getTime()));
    }, 1000);

    return () => clearInterval(secondTimer);
  }, []);

  return (
    <Modal title="Statistics" open={open} onClose={onClose}>
      <Container>
        <div>
          <TodayBox size="regular" isBlank={false} transform={null}>
            ?
          </TodayBox>
          <TextBlock>Today's Score</TextBlock>
        </div>
        <StatsRow>
          <StatsBox size="regular" isBlank={false} transform={null}>
            0
          </StatsBox>
          <StatsBox size="regular" isBlank={false} transform={null}>
            0
          </StatsBox>
          <StatsBox size="regular" isBlank={false} transform={null}>
            0
          </StatsBox>
        </StatsRow>
        <StatsRow>
          <StatsTextBlock>Solved</StatsTextBlock>
          <StatsTextBlock>Longest Streak</StatsTextBlock>
          <StatsTextBlock>Current Streak</StatsTextBlock>
        </StatsRow>
        <TimeText>Next Whittle In</TimeText>
        <TimeLeftText>
          <b>{timeLeft.toLocaleTimeString()}</b>
        </TimeLeftText>
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
  text-weight: bold;
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
