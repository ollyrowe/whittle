import React from "react";
import { AccessTime as AccessTimeIcon } from "@mui/icons-material";
import StatCard from "./StatisticCard";

interface Props {
  time?: string;
  disabled?: boolean;
}

const TimeCard: React.FC<Props> = ({ time, disabled }) => {
  return (
    <StatCard
      title="Time"
      color="blue"
      icon={<AccessTimeIcon style={{ fontSize: 18 }} />}
      disabled={disabled}
      data-testid="time-card"
    >
      {disabled ? "-- : --" : time}
    </StatCard>
  );
};

export default TimeCard;
