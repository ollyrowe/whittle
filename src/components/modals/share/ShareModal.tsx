import React from "react";
import styled from "styled-components";
import { Button, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import Modal from "../Modal";
import { useModalContext } from "../../providers/ModalProvider";
import { useShareContext } from "../../providers/ShareProvider";
import { useGameContext } from "../../providers/GameProvider";

const ShareModal = () => {
  // Extract modal state and controls
  const { displayShare, closeShare } = useModalContext();

  // Extract game state
  const { number } = useGameContext();

  // Extract share controls
  const { canShare, preview, showLetters, share, toggleShowLetters } =
    useShareContext();

  return (
    <Modal
      title="Share"
      open={displayShare}
      onClose={closeShare}
      aria-describedby="share"
      data-testid="share-modal"
    >
      <Container id="share">
        {preview && (
          <Preview src={URL.createObjectURL(preview)} alt="Share Preview" />
        )}
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={showLetters}
                onChange={toggleShowLetters}
                data-testid="show-letters-toggle"
              />
            }
            label="Show Letters"
          />
        </FormGroup>
        <RoundedButton
          variant="contained"
          onClick={() => share(number)}
          disabled={!canShare}
          data-testid="confirm-share-button"
        >
          Share
        </RoundedButton>
      </Container>
    </Modal>
  );
};

export default ShareModal;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Preview = styled.img`
  width: 100%;
`;

const RoundedButton = styled(Button)`
  border-radius: 20px;
  padding-left: 20px;
  padding-right: 20px;
  color: white;
  font-weight: 700;
  margin: ${(props) => props.theme.spacing(2)};
`;
