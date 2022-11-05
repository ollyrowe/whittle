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
    <Circle type={type} formsStreak={formsStreak}>
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
      return <Tick $hasContrastText={!!hasContrastText} />;
    case "cross":
      return <Cross />;
    case "dot":
      return <Dot />;
  }
};

const Circle = styled.div<Props>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => (props.type === "complete" ? "29px" : "35px")};
  height: ${(props) => (props.type === "complete" ? "29px" : "35px")};
  margin: ${(props) => props.type === "complete" && "4px"};
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

interface TickProps {
  $hasContrastText: boolean;
}

const Tick = styled(DoneIcon)<TickProps>`
  color: transparent;
  stroke: ${(props) =>
    props.$hasContrastText ? "white" : props.theme.palette.text.disabled};
  stroke-width: 2;
  font-size: 20px;
`;

const Cross = styled(CloseIcon)`
  color: transparent;
  stroke: ${(props) => props.theme.palette.text.disabled};
  stroke-width: 2;
  font-size: 16px;
`;

const Dot = styled(DotIcon)`
  color: ${(props) => props.theme.palette.text.disabled};
  font-size: 8px;
`;
