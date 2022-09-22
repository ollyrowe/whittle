import React from "react";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";

type Props = Omit<FontAwesomeIconProps, "icon">;

const StatsIcon: React.FC<Props> = (props) => {
  return <FontAwesomeIcon icon={faChartLine} {...props} />;
};

export default StatsIcon;
