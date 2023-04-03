import React from "react";
import styled from "styled-components";
import { styled as muiStyled } from "@mui/material/styles";
import { Button, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import Modal from "../Modal";
import { useModalContext } from "../../providers/ModalProvider";
import { useScreenshotContext } from "../../providers/ScreenshotProvider";

const ScreenshotModal = () => {
  // Extract modal state and controls
  const { displayScreenshot, closeScreenshot } = useModalContext();

  // Extract screenshot state and controls
  const { preview, showLetters, shareScreenshot, toggleShowLetters } =
    useScreenshotContext();

  return (
    <StyledModal
      title="Screenshot"
      open={displayScreenshot}
      onClose={closeScreenshot}
      aria-describedby="screenshot"
      data-testid="screenshot-modal"
    >
      <Container id="screenshot">
        {preview && (
          <PreviewContainer>
            <Preview
              src={URL.createObjectURL(preview)}
              alt="Screenshot Preview"
            />
          </PreviewContainer>
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
          onClick={shareScreenshot}
          data-testid="share-screenshot-button"
        >
          Share
        </RoundedButton>
      </Container>
    </StyledModal>
  );
};

export default ScreenshotModal;

const StyledModal = muiStyled(Modal)(() => ({
  "& .MuiDialogContent-root": {
    display: "flex",
  },
}));

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const PreviewContainer = styled.div`
  overflow: hidden;
  margin: auto;
`;

const Preview = styled.img`
  height: 100%;
  max-width: 100%;
`;

const RoundedButton = styled(Button)`
  border-radius: 20px;
  padding-left: 20px;
  padding-right: 20px;
  color: white;
  font-weight: 700;
  margin: ${(props) => props.theme.spacing(2)};
`;
