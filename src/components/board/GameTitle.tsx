import React from "react";
import { Typography } from "@mui/material";
import { Answer } from "../../model/answers/AnswerValidator";

interface Props {
  number: number;
  answer?: Answer;
}

const GameTitle: React.FC<Props> = ({ number, answer }) => {
  // If the answer has a date, then it's an event date
  const isEvent = !!answer?.date;

  return (
    <Typography component="h1" textAlign="center">
      {isEvent ? answer.theme : `Daily Whittle #${number}`}
    </Typography>
  );
};

export default GameTitle;
