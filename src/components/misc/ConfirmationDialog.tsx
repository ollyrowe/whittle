import React from "react";
import styled from "styled-components";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import SlideTransition from "./SlideTransition";

interface Props {
  open: boolean;
  title: string;
  text: string;
  confirmText?: string;
  rejectText?: string;
  onConfirm: () => void;
  onReject: () => void;
}

const ConfirmationDialog: React.FC<Props> = ({
  open,
  title,
  text,
  confirmText = "Confirm",
  rejectText = "Cancel",
  onConfirm,
  onReject,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onReject}
      TransitionComponent={SlideTransition}
      aria-describedby="confirmation-text"
      maxWidth="xs"
      keepMounted
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="confirmation-text">{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <ActionButton onClick={onReject}>{rejectText}</ActionButton>
        <ActionButton onClick={onConfirm}>{confirmText}</ActionButton>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;

const ActionButton = styled(Button)`
  color: ${(props) => props.theme.palette.text.primary};
`;
