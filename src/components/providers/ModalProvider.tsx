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

  // Whether the screenshot modal should be displayed
  const [displayScreenshot, setDisplayScreenshot] = useState(false);

  // Whether the score modal should be displayed
  const [displayScore, setDisplayScore] = useState(false);

  // Whether the score info modal should be displayed
  const [displayScoreInfo, setDisplayScoreInfo] = useState(false);

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

  const openScreenshot = () => {
    setDisplayScreenshot(true);
  };

  const closeScreenshot = () => {
    setDisplayScreenshot(false);
  };

  const openScore = () => {
    setDisplayScore(true);
  };

  const closeScore = () => {
    setDisplayScore(false);
  };

  const openScoreInfo = () => {
    setDisplayScoreInfo(true);
  };

  const closeScoreInfo = () => {
    setDisplayScoreInfo(false);
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
    displayScreenshot,
    openScreenshot,
    closeScreenshot,
    displayScore,
    openScore,
    closeScore,
    displayScoreInfo,
    openScoreInfo,
    closeScoreInfo,
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
  displayScreenshot: boolean;
  openScreenshot: () => void;
  closeScreenshot: () => void;
  displayScore: boolean;
  openScore: () => void;
  closeScore: () => void;
  displayScoreInfo: boolean;
  openScoreInfo: () => void;
  closeScoreInfo: () => void;
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
  displayScreenshot: false,
  openScreenshot: () => {},
  closeScreenshot: () => {},
  displayScore: false,
  openScore: () => {},
  closeScore: () => {},
  displayScoreInfo: false,
  openScoreInfo: () => {},
  closeScoreInfo: () => {},
});

export const useModalContext = () => {
  return useContext(ModalContext);
};
