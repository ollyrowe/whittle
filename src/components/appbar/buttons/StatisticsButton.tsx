import React from "react";
import styled from "styled-components";
import AppBarButton from "./AppBarButton";
import {
  BarChart as BarChartIcon,
  Whatshot as WhatshotIcon,
  PriorityHigh as PriorityHighIcon,
} from "@mui/icons-material";
import { useModalContext } from "../../providers/ModalProvider";
import { useStreakContext } from "../../providers/StreakProvider";

const StatisticsButton: React.FC = () => {
  // Extract modal controls
  const { openStats } = useModalContext();

  // Extract current streak statistics
  const streak = useStreakContext();

  // Determine the badge to be displayed against the button
  const badgeContent = streak.hasCompletedTodaysGame ? (
    <StreakBadge />
  ) : streak.currentStreak.length > 0 ? (
    <WarningBadge />
  ) : undefined;

  return (
    <AppBarButton
      onClick={openStats}
      badgeContent={badgeContent}
      data-testid="statistics-button"
    >
      <BarChartIcon />
    </AppBarButton>
  );
};

export default StatisticsButton;

interface CircleProps {
  disabled?: boolean;
}

const Circle = styled.div<CircleProps>`
  padding: 1px;
  border-radius: 16px;
  background-color: ${(props) => props.theme.palette.orange.default};
  filter: ${(props) => props.disabled && "grayscale(100%)"};
`;

const StreakBadge = () => {
  return (
    <Circle data-testid="streak-badge">
      <StreakIcon />
    </Circle>
  );
};

const WarningBadge = () => {
  return (
    <Circle disabled data-testid="warning-badge">
      <WarningIcon />
    </Circle>
  );
};

const StreakIcon = styled(WhatshotIcon)`
  color: white;
  font-size: 12px;
`;

const WarningIcon = styled(PriorityHighIcon)`
  color: white;
  font-size: 12px;
`;
