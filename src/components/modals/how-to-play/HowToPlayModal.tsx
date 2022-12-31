import React from "react";
import styled from "styled-components";
import { Typography, Divider } from "@mui/material";
import Modal from "../Modal";
import Tile from "../../tile/Tile";
import { TileState } from "../../../model/enums/TileState";
import { Letter } from "../../../model/enums/Letter";
import { useModalContext } from "../../providers/ModalProvider";

const HowToPlayModal: React.FC = () => {
  // Extract modal state and controls
  const { displayHowToPlay, closeHowToPlay } = useModalContext();

  return (
    <Modal
      title="How To Play"
      open={displayHowToPlay}
      onClose={closeHowToPlay}
      aria-describedby="how-to-play"
      data-testid="how-to-play-modal"
    >
      <div id="how-to-play">
        <Text>
          You have 15 letters, all to be placed within the 5 x 6 board
        </Text>
        <Text>
          Drag the letters onto the board to form words and join these words
          together until all of the letters have been placed
        </Text>
        <Text>
          Words must be spelt from left to right or from top to bottom
        </Text>
        <Text>All words must be connected to win the game</Text>
        <SpacedDivider />
        <Text variant="body2">
          Letters which appear grey do not form a valid word in either direction
        </Text>
        <TileContainer>
          <Tile letter={Letter.X} size="small" disabled />
          <Tile letter={Letter.Y} size="small" disabled />
          <Tile letter={Letter.Z} size="small" disabled />
        </TileContainer>
        <Text variant="body2">
          Letters which appear orange form a valid word in one direction but not
          the other
        </Text>
        <TileContainer>
          <Tile
            letter={Letter.D}
            state={TileState.PARTIALLY_CORRECT}
            size="small"
            disabled
          />
          <Tile
            letter={Letter.O}
            state={TileState.CORRECT}
            size="small"
            disabled
          />
          <Tile
            letter={Letter.G}
            state={TileState.CORRECT}
            size="small"
            disabled
          />
        </TileContainer>
        <TileContainer>
          <Tile letter={Letter.C} size="small" disabled />
        </TileContainer>
        <Text variant="body2">
          Letters which appear green form valid words in both directions
        </Text>
        <TileContainer>
          <Tile
            letter={Letter.T}
            state={TileState.CORRECT_THEME_WORD}
            size="small"
            disabled
          />
          <Tile
            letter={Letter.I}
            state={TileState.CORRECT_THEME_WORD}
            size="small"
            disabled
          />
          <Tile
            letter={Letter.N}
            state={TileState.CORRECT_THEME_WORD}
            size="small"
            disabled
          />
        </TileContainer>
        <Text variant="body2">Letters which appear blue form a theme word</Text>
      </div>
    </Modal>
  );
};

export default HowToPlayModal;

const Text = styled(Typography)`
  margin: ${(props) => props.theme.spacing(1, 0)};
`;

const SpacedDivider = styled(Divider)`
  margin: ${(props) => props.theme.spacing(2, 0)};
`;

const TileContainer = styled.div`
  display: flex;
`;
