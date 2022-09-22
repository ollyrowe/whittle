import React from "react";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";

type Props = Omit<FontAwesomeIconProps, "icon">;

const HowToPlayIcon: React.FC<Props> = (props) => {
  return <FontAwesomeIcon icon={faCircleQuestion} {...props} />;
};

export default HowToPlayIcon;
