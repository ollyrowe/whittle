import React from "react";
import ThemeProvider from "./components/providers/ThemeProvider";
import useSettings from "./hooks/useSettings";
import Game from "./Game";
import NotificationProvider from "./components/providers/NotificationProvider";
import ModalProvider from "./components/providers/ModalProvider";
import ScreenshotProvider from "./components/providers/ScreenshotProvider";
import ShareProvider from "./components/providers/ShareProvider";

const App: React.FC = () => {
  const settings = useSettings();

  return (
    <ThemeProvider theme={settings.theme}>
      <NotificationProvider>
        <ModalProvider>
          <ShareProvider>
            <ScreenshotProvider>
              <Game settings={settings} />
            </ScreenshotProvider>
          </ShareProvider>
        </ModalProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
};

export default App;
