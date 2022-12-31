import React from "react";
import styled from "styled-components";
import { IconButton } from "@mui/material";
import {
  HelpOutline as HelpOutlineIcon,
  EventRepeat as EventRepeatIcon,
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import { useModalContext } from "../providers/ModalProvider";

const AppBar: React.FC = () => {
  // Extract modal controls
  const modals = useModalContext();

  return (
    <>
      <Container>
        <ButtonContainer>
          <AppBarButton
            onClick={modals.openHowToPlay}
            data-testid="how-to-play-button"
          >
            <HelpOutlineIcon />
          </AppBarButton>
          <AppBarButton
            onClick={modals.openYesterdays}
            data-testid="yesterdays-button"
          >
            <EventRepeatIcon />
          </AppBarButton>
        </ButtonContainer>
        <Title>Whittle</Title>
        <ButtonContainer>
          <AppBarButton
            onClick={modals.openStats}
            data-testid="statistics-button"
          >
            <BarChartIcon />
          </AppBarButton>
          <AppBarButton
            onClick={modals.openSettings}
            data-testid="settings-button"
          >
            <SettingsIcon />
          </AppBarButton>
        </ButtonContainer>
      </Container>
    </>
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

const AppBarButton = styled(IconButton)`
  color: ${(props) => props.theme.palette.text.primary};
  margin: ${(props) => props.theme.spacing(0.5)};
`;

export default AppBar;
