import React from "react";
import styled from "styled-components";
import { Badge, IconButton, IconButtonProps } from "@mui/material";

interface Props extends IconButtonProps {
  badgeContent?: React.ReactNode;
}

const AppBarButton: React.FC<Props> = ({
  badgeContent,
  children,
  ...otherProps
}) => {
  return (
    <StyledIconButton {...otherProps}>
      <Badge badgeContent={badgeContent}>{children}</Badge>
    </StyledIconButton>
  );
};

const StyledIconButton = styled(IconButton)`
  color: ${(props) => props.theme.palette.text.primary};
  margin: ${(props) => props.theme.spacing(0.5)};
`;

export default AppBarButton;
