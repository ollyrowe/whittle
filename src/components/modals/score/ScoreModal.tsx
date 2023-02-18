import React from "react";
import styled from "styled-components";
import Modal from "../Modal";
import { useModalContext } from "../../providers/ModalProvider";
import { Link, Typography } from "@mui/material";
import BoardWrapper from "../../board/BoardWrapper";
import TileGrid from "../../board/TileGrid";
import { useGameContext } from "../../providers/GameProvider";
import { Tile } from "../../../model/Tile";
import { ScoreUtils } from "../../../model/utils/ScoreUtils";
import ReturnButton from "../../misc/ReturnButton";

const ScoreModal = () => {
  // Extract modal state and controls
  const { displayScore, closeScore, openStats } = useModalContext();

  // Extract game state
  const { board, score } = useGameContext();

  const returnToStats = () => {
    closeScore();

    openStats();
  };

  const getTileMultiplier = (tile: Tile) => {
    return ScoreUtils.getTileMultiplier(board, tile);
  };

  return (
    <Modal
      title="Score"
      open={displayScore}
      onClose={closeScore}
      headerAction={<ReturnButton onClick={returnToStats} />}
      aria-describedby="score"
      data-testid="score-modal"
    >
      <Container id="score">
        <Title>{`${score} points`}</Title>
        <BoardWrapper>
          <TileGrid
            tiles={board.getTiles()}
            getTileMultiplier={getTileMultiplier}
            disabled
          />
        </BoardWrapper>
        <Text>
          Click <ScoreInfoLink>here</ScoreInfoLink> for a breakdown of how the
          score is calculated
        </Text>
      </Container>
    </Modal>
  );
};

export default ScoreModal;

interface ScoreInfoLinkProps {
  children: React.ReactNode;
}

const ScoreInfoLink: React.FC<ScoreInfoLinkProps> = ({ children }) => {
  // Extract modal controls
  const { closeScore, openScoreInfo } = useModalContext();

  const displayScoreInfo = () => {
    closeScore();

    openScoreInfo();
  };

  return (
    <Link onClick={displayScoreInfo} data-testid="score-info-link">
      {children}
    </Link>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const Title = styled.h3`
  margin: 0;
  margin-bottom: ${(props) => props.theme.spacing(1)};
`;

const Text = styled(Typography)`
  margin-top: ${(props) => props.theme.spacing(1)};
`;
