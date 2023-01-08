import React from "react";
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
  answer: { letters: "", theme: "", words: [] },
  outlineRack: false,
  setOutlineRack: () => {},
  onSwapTiles: () => {},
  onReturnTileToRack: () => {},
  reset: () => {},
  timer: {
    text: "",
    timeLapsed: 0,
    start: () => {},
    pause: () => {},
    reset: () => {},
  },
  settings: {
    ...defaultSettings,
    theme: createLightTheme(false),
    toggleHardMode: () => {},
    toggleTheme: () => {},
    toggleHighContrastMode: () => {},
    toggleSoundFx: () => {},
    toggleHints: () => {},
  },
  completedGames: [],
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
