import React from "react";
import styled from "styled-components";
import { Typography, Link, TypographyProps } from "@mui/material";
import Modal from "./Modal";

interface Props {
  open: boolean;
  onClose: () => void;
}

const HowToPlayModal: React.FC<Props> = ({ open, onClose }) => {
  return (
    <Modal
      title="How To Play"
      open={open}
      onClose={onClose}
      aria-describedby="how-to-play"
    >
      <div id="how-to-play">
        <Text>
          You have 15 letters, all to be placed within the 5 x 6 board
        </Text>
        <Text>
          Place the letters on the board to form words and join these words
          together until all of the letters have been placed
        </Text>
        <Text>
          Words must be spelt from left to right or from top to bottom
        </Text>
        <Text>
          Can you <i>whittle</i> it down and place as few words as possible?
        </Text>
        <CenteredText variant="body2">
          This game is inspired by the word game{" "}
          <Link
            underline="none"
            href="https://bananagrams.com/"
            target="_blank"
            rel="noreferrer"
          >
            BANANAGRAMS
          </Link>
        </CenteredText>
      </div>
    </Modal>
  );
};

export default HowToPlayModal;

const Text = styled(Typography)`
  margin-bottom: 1.5em;
`;

const CenteredText: React.FC<TypographyProps> = styled(Typography)`
  text-align: center;
`;
