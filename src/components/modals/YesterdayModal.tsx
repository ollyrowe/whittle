import React from "react";
import styled from "styled-components";
import { Typography } from "@mui/material";
import { GameLoader } from "../../model/game/GameLoader";
import Modal from "./Modal";
import SolutionBoard from "../board/SolutionBoard";

interface Props {
  open: boolean;
  onClose: () => void;
}

const PreviousGameModal: React.FC<Props> = ({ open, onClose }) => {
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

export default PreviousGameModal;

const yesterdaysSolution = GameLoader.getYesterdaysSolution();

const FooterText = styled(Typography)`
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
`;
