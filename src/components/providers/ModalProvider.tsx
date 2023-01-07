import React, { useContext, useState } from "react";

interface Props {
  children?: React.ReactNode;
}

const ModalProvider: React.FC<Props> = ({ children }) => {
  // Whether the how to play modal should be displayed
  const [displayHowToPlay, setDisplayHowToPlay] = useState(false);

  // Whether the yesterday modal should be displayed
  const [displayYesterdays, setDisplayYesterdays] = useState(false);

  // Whether the statistics modal should be displayed
  const [displayStats, setDisplayStats] = useState(false);

  // Whether the settings modal should be displayed
  const [displaySettings, setDisplaySettings] = useState(false);

  // Whether the share modal should be displayed
  const [displayShare, setDisplayShare] = useState(false);

  const openHowToPlay = () => {
    setDisplayHowToPlay(true);
  };

  const closeHowToPlay = () => {
    setDisplayHowToPlay(false);
  };

  const openYesterdays = () => {
    setDisplayYesterdays(true);
  };

  const closeYesterdays = () => {
    setDisplayYesterdays(false);
  };

  const openStats = () => {
    setDisplayStats(true);
  };

  const closeStats = () => {
    setDisplayStats(false);
  };

  const openSettings = () => {
    setDisplaySettings(true);
  };

  const closeSettings = () => {
    setDisplaySettings(false);
  };

  const openShare = () => {
    setDisplayShare(true);
  };

  const closeShare = () => {
    setDisplayShare(false);
  };

  const controls = {
    displayHowToPlay,
    openHowToPlay,
    closeHowToPlay,
    displayYesterdays,
    openYesterdays,
    closeYesterdays,
    displayStats,
    openStats,
    closeStats,
    displaySettings,
    openSettings,
    closeSettings,
    displayShare,
    openShare,
    closeShare,
  };

  return (
    <ModalContext.Provider value={controls}>{children}</ModalContext.Provider>
  );
};

export default ModalProvider;

interface ModalControls {
  displayHowToPlay: boolean;
  openHowToPlay: () => void;
  closeHowToPlay: () => void;
  displayYesterdays: boolean;
  openYesterdays: () => void;
  closeYesterdays: () => void;
  displayStats: boolean;
  openStats: () => void;
  closeStats: () => void;
  displaySettings: boolean;
  openSettings: () => void;
  closeSettings: () => void;
  displayShare: boolean;
  openShare: () => void;
  closeShare: () => void;
}

export const ModalContext = React.createContext<ModalControls>({
  displayHowToPlay: false,
  openHowToPlay: () => {},
  closeHowToPlay: () => {},
  displayYesterdays: false,
  openYesterdays: () => {},
  closeYesterdays: () => {},
  displayStats: false,
  openStats: () => {},
  closeStats: () => {},
  displaySettings: false,
  openSettings: () => {},
  closeSettings: () => {},
  displayShare: false,
  openShare: () => {},
  closeShare: () => {},
});

export const useModalContext = () => {
  return useContext(ModalContext);
};
