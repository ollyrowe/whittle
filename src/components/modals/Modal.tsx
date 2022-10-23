import React from "react";
import styled from "styled-components";
import {
  Dialog,
  DialogTitle,
  Slide,
  DialogContent,
  IconButton,
  DialogProps,
  DialogTitleProps,
  IconButtonProps,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { TransitionProps } from "@mui/material/transitions";

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
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
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
    </Dialog>
  );
};

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

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default Modal;
