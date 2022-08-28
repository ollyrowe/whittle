import React from "react";
import AppBar from "./components/appbar/AppBar";
import Grid from "./components/grid/Grid";
import Rack from "./components/rack/Rack";
import styled, { ThemeProvider } from "styled-components";
import { useThemeToggle } from "./hooks/useThemeToggle";

const App: React.FC = () => {
  const theme = useThemeToggle();

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <AppBar />
        <Grid />
        <Rack />
      </Container>
    </ThemeProvider>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.background};
`;

export default App;
