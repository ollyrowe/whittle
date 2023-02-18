import React from "react";
import styled from "styled-components";
import { BarChart as BarChartIcon } from "@mui/icons-material";
import StatCard from "./StatisticCard";

interface Props {
  score?: number;
  disabled?: boolean;
  onClick?: () => void;
}

const ScoreCard: React.FC<Props> = ({ score, disabled, onClick }) => {
  return (
    <StatCard
      title="Score"
      color="green"
      icon={<BarChartIcon style={{ fontSize: 18 }} />}
      disabled={disabled}
      onClick={onClick}
      data-testid="score-card"
    >
      <Text>{`${score ? score : "--"} pts`}</Text>
    </StatCard>
  );
};

export default ScoreCard;

const Text = styled.div`
  font-size: 13px;
  line-height: 16px;
`;
