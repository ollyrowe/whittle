import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import HowToPlayModal from "../modals/HowToPlayModal";
import StatisticsModal from "../modals/StatisticsModal";

const AppBar: React.FC = () => {
  const [displayHowToPlayModal, setDisplayHowToPlayModal] = useState(false);
  const [displayStatisticsModal, setDisplayStatisticsModal] = useState(false);

  const openHowToPlayModal = () => {
    setDisplayHowToPlayModal(true);
  };

  const closeHowToPlayModal = () => {
    setDisplayHowToPlayModal(false);
  };

  const openStatisticsModal = () => {
    setDisplayStatisticsModal(true);
  };

  const closeStatisticsModal = () => {
    setDisplayStatisticsModal(false);
  };

  return (
    <Container>
      <Title>Whittle</Title>
      <HowToIcon
        icon={faCircleQuestion}
        size="xl"
        onClick={openHowToPlayModal}
      />
      <StatsIcon icon={faChartLine} size="lg" onClick={openStatisticsModal} />
      <HowToPlayModal
        open={displayHowToPlayModal}
        onClose={closeHowToPlayModal}
      />
      <StatisticsModal
        open={displayStatisticsModal}
        onClose={closeStatisticsModal}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  color: ${(props) => props.theme.text};
  height: 60px;
  border-bottom: 1px solid ${(props) => props.theme.border};
`;

const Title = styled.h1`
  margin: auto;
  max-width: 65px;
`;

const HowToIcon = styled(FontAwesomeIcon)`
  position: absolute;
  margin: 15px;
  cursor: pointer;
`;

const StatsIcon = styled(FontAwesomeIcon)`
  display: flex;
  justify-content: flex-end;
  margin: 15px;
  margin-top: 17px;
  cursor: pointer;
`;

export default AppBar;
