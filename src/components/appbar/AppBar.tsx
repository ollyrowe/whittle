import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
import HowToPlayModal from "../modals/HowToPlayModal";

const AppBar: React.FC = () => {
  const [displayHowToPlayModal, setDisplayHowToModal] = useState(false);

  const openHowToPlayModal = () => {
    setDisplayHowToModal(true);
  };

  const closeHowToPlayModal = () => {
    setDisplayHowToModal(false);
  };

  return (
    <Container>
      <Title>Whittle</Title>
      <Icon icon={faCircleQuestion} size="xl" onClick={openHowToPlayModal} />
      <HowToPlayModal
        open={displayHowToPlayModal}
        onClose={closeHowToPlayModal}
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
  max-width: 55px;
`;

const Icon = styled(FontAwesomeIcon)`
  display: flex;
  justify-content: flex-end;
  margin: 15px;
  cursor: pointer;
`;

export default AppBar;
