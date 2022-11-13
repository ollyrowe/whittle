import React from "react";
import styled from "styled-components";
import { alpha, Button } from "@mui/material";

const TextButton = styled(Button)`
  color: ${(props) => alpha(props.theme.palette.text.primary, 0.64)};
  &:hover {
    background-color: ${(props) =>
      alpha(props.theme.palette.text.primary, 0.08)}};
  }
`;

export default TextButton;
