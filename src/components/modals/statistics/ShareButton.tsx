import React from "react";
import styled from "styled-components";
import { Button } from "@mui/material";
import { Share as ShareIcon } from "@mui/icons-material";

const ShareButton: React.FC = () => {
  return (
    <StyledButton variant="contained" endIcon={<ShareIcon />} disabled>
      Share
    </StyledButton>
  );
};

export default ShareButton;

const StyledButton = styled(Button)`
  border-radius: 20px;
  padding-left: 20px;
  padding-right: 20px;
  color: white;
  font-weight: 700;
  margin: ${(props) => props.theme.spacing(2)};
`;
