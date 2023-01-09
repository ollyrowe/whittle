import React from "react";
import styled from "styled-components";
import { alpha } from "@mui/material";
import {
  Done as DoneIcon,
  Circle as DotIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

interface Props {
  type: CircleType;
  icon?: CircleIcon;
  /** Whether this day forms part of the streak */
  formsStreak: boolean;
}

const DayCircle: React.FC<Props> = ({ type, icon, formsStreak }) => {
  return (
    <Circle type={type} formsStreak={formsStreak} data-testid="day-circle">
      {getIcon(icon, formsStreak)}
    </Circle>
  );
};

export default DayCircle;

export type CircleType = "complete" | "left-end" | "middle" | "right-end";
export type CircleIcon = "tick" | "cross" | "dot";

const getIcon = (icon?: CircleIcon, hasContrastText?: boolean) => {
  switch (icon) {
    case "tick":
      return <Tick $hasContrastText={!!hasContrastText} data-testid="tick" />;
    case "cross":
      return <Cross data-testid="cross" />;
    case "dot":
      return <Dot data-testid="dot" />;
  }
};

const Circle = styled.div<Props>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => width[props.type]};
  height: 27px;
  padding: ${(props) => padding[props.type]};
  margin: ${(props) => margin[props.type]};
  background-color: ${(props) =>
    props.formsStreak
      ? props.theme.palette.orange.default
      : alpha(props.theme.palette.text.primary, 0.1)};
  border-radius: ${(props) => borderRadius[props.type]};
`;

// Mapping of circle types to border radii
const borderRadius: Record<CircleType, string> = {
  complete: "20px",
  "left-end": "20px 0px 0px 20px",
  "right-end": "0px 20px 20px 0px",
  middle: "0px",
};

const padding: Record<CircleType, string> = {
  complete: "0px",
  "left-end": "0px 4px 0px 4px",
  "right-end": "0px 4px 0px 4px",
  middle: "0px 4px",
};

const margin: Record<CircleType, string> = {
  complete: "0px 4px",
  "left-end": "0px 0px 0px 4px",
  "right-end": "0px 4px 0px 0px",
  middle: "0px",
};

const width: Record<CircleType, string> = {
  complete: "27px",
  "left-end": "31px",
  "right-end": "31px",
  middle: "35px",
};

interface TickProps {
  $hasContrastText: boolean;
}

const Tick = styled(DoneIcon)<TickProps>`
  color: transparent;
  stroke: ${(props) =>
    props.$hasContrastText ? "white" : props.theme.palette.text.disabled};
  stroke-width: 2;
  font-size: 16px;
`;

const Cross = styled(CloseIcon)`
  color: transparent;
  stroke: ${(props) => props.theme.palette.text.disabled};
  stroke-width: 2;
  font-size: 14px;
`;

const Dot = styled(DotIcon)`
  color: ${(props) => props.theme.palette.text.disabled};
  font-size: 6px;
`;
