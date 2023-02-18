import React from "react";
import styled from "styled-components";
import Modal from "../Modal";
import ReturnButton from "../../misc/ReturnButton";
import { useModalContext } from "../../providers/ModalProvider";
import { Typography } from "@mui/material";

const ScoreInfoModal = () => {
  // Extract modal state and controls
  const { displayScoreInfo, closeScoreInfo, openStats } = useModalContext();

  const returnToStats = () => {
    closeScoreInfo();

    openStats();
  };

  return (
    <Modal
      title="Score"
      open={displayScoreInfo}
      onClose={closeScoreInfo}
      headerAction={<ReturnButton onClick={returnToStats} />}
      aria-describedby="score-info"
      data-testid="score-info-modal"
    >
      <Container id="score-info">
        <Typography>
          The score for a completed game is determined by applying a multiplier
          to each letter's Scrabble value.
        </Typography>
        <MultiplierText>
          A multiplier for each letter is determined as follows:
        </MultiplierText>
        <ul>
          <li>
            <b>1x</b> is awarded to letters which form <b>one</b> word 3 or more
            letters long
          </li>
          <li>
            <b>2x</b> is awarded to letters which form <b>two</b> words 3 or
            more letters long
          </li>
          <li>
            <b>0x</b> is awarded to any other letters
          </li>
        </ul>
      </Container>
    </Modal>
  );
};

export default ScoreInfoModal;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const MultiplierText = styled(Typography)`
  margin-top: 1em;
`;
