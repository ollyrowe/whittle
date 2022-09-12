import React from "react";
import styled from "styled-components";
import Modal from "./Modal";

interface Props {
  open: boolean;
  onClose: () => void;
}

const HowToPlayModal: React.FC<Props> = ({ open, onClose }) => {
  return (
    <Modal title="Whittle Rules" open={open} onClose={onClose}>
      <Container>
        <TextBlock>
          You have 15 letters, all to be placed within the 5 x 6 board
        </TextBlock>
        <TextBlock>
          Place the letters on the board to form words and join these words
          together until all of the letters have been placed
        </TextBlock>
        <TextBlock>
          Words must be spelt from left to right or from top to bottom
        </TextBlock>
        <TextBlock>
          Can you <i>whittle</i> it down and place as few words as possible?
        </TextBlock>
        <Credit>
          This game is inspired by the word game{" "}
          <Link
            href="https://bananagrams.com/"
            target="_blank"
            rel="noreferrer"
          >
            BANANAGRAMS
          </Link>
        </Credit>
      </Container>
    </Modal>
  );
};

const TextBlock = styled.p`
  font-size: 1em;
  margin-top: 0;
  margin-bottom: 1.5em;
`;

const Credit = styled.p`
  font-size: 0.7em;
  text-align: center;
  margin-top: 0;
  margin-bottom: 1.5em;
`;

const Container = styled.div`
  text-align: left;
`;

const Link = styled.a`
  color: #968055;
  text-decoration: none;
`;

export default HowToPlayModal;
