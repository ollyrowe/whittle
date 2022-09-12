import React from "react";
import styled, { keyframes } from "styled-components";
import { useDelayUnmount } from "../../hooks/useDelayedUnmount";
import { useDocumentEventListener } from "../../hooks/useEventListener";

interface Props {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<Props> = ({ open, title, children, onClose }) => {
  const onClickWrapper = (event: React.MouseEvent<HTMLElement>) => {
    // Close the modal if the wrapper was directly clicked
    if (event.target === event.currentTarget) {
      event.preventDefault();

      onClose();
    }
  };

  // Waits for the opening / closing animation to complete before unmounting
  const shouldRenderChild = useDelayUnmount(open, ANIMATION_LENGTH);

  useDocumentEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      onClose();
    }
  });

  return shouldRenderChild ? (
    <ModalWrapper open={open} onClick={onClickWrapper}>
      <ModalContents open={open}>
        <ModalHeader>
          <CloseButton onClick={onClose} />
          <h3>{title}</h3>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
      </ModalContents>
    </ModalWrapper>
  ) : (
    <></>
  );
};

/* Modal opening and closing animation length in milliseconds */
const ANIMATION_LENGTH = 250;

interface CloseButtonProps {
  onClick: () => void;
}

const CloseButton: React.FC<CloseButtonProps> = ({ onClick }) => {
  return <CloseIcon onClick={onClick}>&times;</CloseIcon>;
};

interface ModalWrapperProps {
  open: boolean;
}

const ModalWrapper = styled.div<ModalWrapperProps>`
  display: flex;
  position: absolute;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  overflow: hidden;
  opacity: ${(props) => (props.open ? 1 : 0)};
  transition: opacity ${ANIMATION_LENGTH}ms ease-in;
`;

const slideUpAnimation = keyframes`
  from { bottom: -100vw; opacity: 0 }
  to { bottom: 0; opacity: 1 }
`;

const slideDownAnimation = keyframes`
  from { bottom: 0; opacity: 1 }
  to { bottom: -100vw; opacity: 0 }
`;

const ModalContents = styled.div<{ open: boolean }>`
  position: relative;
  color: ${(props) => props.theme.text};
  background-color: ${(props) => props.theme.background};
  margin: auto;
  padding: 0;
  width: 90%;
  max-width: 360px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  opacity: 1 !important;
  animation-name: ${(props) =>
    props.open ? slideUpAnimation : slideDownAnimation};
  animation-fill-mode: forwards;
  animation-duration: ${ANIMATION_LENGTH}ms;
  border-radius: 6px;
`;

const ModalHeader = styled.div`
  text-align: center;
  padding: 16px;
`;

const ModalBody = styled.div`
  padding: 16px;
  padding-top: 0px;
`;

const CloseIcon = styled.div`
  float: right;
  font-size: 28px;
  font-weight: bold;
  line-height: 12px;
  cursor: pointer;
  user-select: none;
`;

export default Modal;
