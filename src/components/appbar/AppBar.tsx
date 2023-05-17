import React from "react";
import styled from "styled-components";
import StatisticsButton from "./buttons/StatisticsButton";
import HowToPlayButton from "./buttons/HowToPlayButton";
import YesterdayButton from "./buttons/YesterdayButton";
import SettingsButton from "./buttons/SettingsButton";

const AppBar: React.FC = () => {
  return (
    <Container>
      <ButtonContainer>
        <HowToPlayButton />
        <YesterdayButton />
      </ButtonContainer>
      <Title>Whittle</Title>
      <ButtonContainer>
        <StatisticsButton />
        <SettingsButton />
      </ButtonContainer>
    </Container>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  margin: auto;
`;

const Container = styled.div`
  display: flex;
  height: ${(props) => !props.theme.isSmallDisplay && "60px"};
  border-bottom: 1px solid ${(props) => props.theme.palette.border};
`;

const Title = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  margin: auto;
  color: ${(props) => props.theme.palette.text.primary};
`;

export default AppBar;
