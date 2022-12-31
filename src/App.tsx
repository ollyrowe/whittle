import React from "react";
import ThemeProvider from "./components/providers/ThemeProvider";
import useSettings from "./hooks/useSettings";
import Game from "./Game";
import NotificationProvider from "./components/providers/NotificationProvider";
import ModalProvider from "./components/providers/ModalProvider";

const App: React.FC = () => {
  const settings = useSettings();

  return (
    <ThemeProvider theme={settings.theme}>
      <NotificationProvider>
        <ModalProvider>
          <Game settings={settings} />
        </ModalProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
};

export default App;
