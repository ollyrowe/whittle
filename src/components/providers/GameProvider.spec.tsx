import React, { createRef } from "react";
import { render } from "@testing-library/react";
import GameProvider from "./GameProvider";
import { Board } from "../../model/Board";
import { Rack } from "../../model/Rack";
import { Game } from "../../hooks/useGame";
import { defaultSettings } from "../../hooks/useSettings";
import { createLightTheme } from "../../misc/theme";

const mockGame: Game = {
  number: 0,
  date: new Date(),
  board: new Board(),
  rack: new Rack([]),
  onSwapTiles: () => {},
  displayStats: false,
  openStats: () => {},
  closeStats: () => {},
  displayHowToPlay: false,
  openHowToPlay: () => {},
  closeHowToPlay: () => {},
  reset: () => {},
  settings: {
    ...defaultSettings,
    theme: createLightTheme(false),
    toggleHardMode: () => {},
    toggleTheme: () => {},
    toggleHighContrastMode: () => {},
    toggleSoundFx: () => {},
  },
  completedGames: [],
  boardRef: createRef(),
  confetti: {
    canvasProps: {
      refConfetti: () => {},
      style: {},
    },
    fire: () => {},
  },
};

it("renders", () => {
  render(<GameProvider game={mockGame} />);
});
