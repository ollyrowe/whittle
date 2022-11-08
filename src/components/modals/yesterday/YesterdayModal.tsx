import React from "react";
import styled from "styled-components";
import { Typography } from "@mui/material";
import { GameLoader } from "../../../model/game/GameLoader";
import Modal from "../Modal";
import SolutionBoard from "../../board/SolutionBoard";
import { useGameContext } from "../../providers/GameProvider";
import { DateUtils } from "../../../model/utils/DateUtils";

interface Props {
  open: boolean;
  onClose: () => void;
}

const YesterdayModal: React.FC<Props> = ({ open, onClose }) => {
  const { date } = useGameContext();

  // Load yesterday's solution
  const yesterdaysSolution = GameLoader.getSolution(
    DateUtils.getPreviousDay(date)
  );

  return (
    <Modal
      title="Yesterday"
      open={open}
      onClose={onClose}
      aria-describedby="yesterday"
    >
      <div id="yesterday">
        <SolutionBoard solution={yesterdaysSolution} />
        <FooterText>This is just one solution, there may be others!</FooterText>
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
