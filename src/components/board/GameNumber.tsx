import React from "react";
import { Typography } from "@mui/material";

interface Props {
  number: number;
}

const GameNumber: React.FC<Props> = ({ number }) => {
  return (
    <Typography component="h1" textAlign="center">
      {`Daily Whittle #${number}`}
    </Typography>
  );
};

export default GameNumber;
