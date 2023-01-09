import React from "react";
import styled from "styled-components";
import StatCard from "./StatisticCard";

interface Props {
  disabled?: boolean;
}

const ScoreCard: React.FC<Props> = ({ disabled }) => {
  return (
    <StatCard
      title="Score"
      color="green"
      disabled={disabled}
      data-testid="score-card"
    >
      <Text>Coming Soon!</Text>
    </StatCard>
  );
};

export default ScoreCard;

const Text = styled.div`
  font-size: 13px;
  line-height: 16px;
`;
