import React from "react";
import styled from "styled-components";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  DialogProps,
  DialogTitleProps,
  IconButtonProps,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import SlideTransition from "../misc/SlideTransition";

interface Props extends DialogProps {
  title: string;
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const Modal: React.FC<Props> = ({
  title,
  open,
  onClose,
  children,
  ...dialogProps
}) => {
  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      TransitionComponent={SlideTransition}
      maxWidth="xs"
      fullWidth
      PaperProps={{ sx: { backgroundImage: "none" } }}
      {...dialogProps}
    >
      <CenteredTitle>
        {title.toUpperCase()}
        <CloseButton onClick={onClose} />
      </CenteredTitle>
      <DialogContent>{children}</DialogContent>
    </StyledDialog>
  );
};

// Dialog which appears in front of moving tiles
const StyledDialog = styled(Dialog)`
  z-index: ${(props) => props.open && 10000};
`;

const CenteredTitle: React.FC<DialogTitleProps> = styled(DialogTitle)`
  text-align: center;
`;

const CloseButton: React.FC<IconButtonProps> = (props) => {
  return (
    <FixedIconButton aria-label="close" {...props}>
      <CloseIcon />
    </FixedIconButton>
  );
};

const FixedIconButton: React.FC<IconButtonProps> = styled(IconButton)`
  position: absolute;
  right: ${(props) => props.theme.spacing(1)};
  top: ${(props) => props.theme.spacing(1)};
  color: ${(props) => props.theme.palette.grey[500]};
`;

export default Modal;
