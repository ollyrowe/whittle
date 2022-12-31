import React from "react";
import styled from "styled-components";
import { Typography } from "@mui/material";
import { GameLoader } from "../../../model/game/GameLoader";
import Modal from "../Modal";
import SolutionBoard from "../../board/SolutionBoard";
import { useGameContext } from "../../providers/GameProvider";
import { DateUtils } from "../../../model/utils/DateUtils";
import { useModalContext } from "../../providers/ModalProvider";

const YesterdayModal: React.FC = () => {
  // Extract modal state and controls
  const { displayYesterdays, closeYesterdays } = useModalContext();

  // Extract game state
  const { date } = useGameContext();

  // Load yesterday's solution
  const yesterdaysSolution = GameLoader.getSolution(
    DateUtils.getPreviousDay(date)
  );

  return (
    <Modal
      title="Yesterday"
      open={displayYesterdays}
      onClose={closeYesterdays}
      aria-describedby="yesterday"
      data-testid="yesterday-modal"
    >
      <div id="yesterday">
        {yesterdaysSolution ? (
          <>
            <SolutionBoard solution={yesterdaysSolution} />
            <FooterText>
              This is just one solution, there may be others!
            </FooterText>
          </>
        ) : (
          <NoSolutionText>
            Come back tomorrow to see today's solution!
          </NoSolutionText>
        )}
      </div>
    </Modal>
  );
};

export default React.memo(YesterdayModal);

const FooterText = styled(Typography)`
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
`;

const NoSolutionText = styled(Typography)`
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;
