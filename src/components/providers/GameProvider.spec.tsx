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
  board: new Board(),
  rack: new Rack([]),
  onSwapTiles: () => {},
  displayStats: false,
  openStats: () => {},
  closeStats: () => {},
  reset: () => {},
  settings: {
    ...defaultSettings,
    theme: createLightTheme(false),
    toggleEasyMode: () => {},
    toggleTheme: () => {},
    toggleHighContrastMode: () => {},
    toggleSoundFx: () => {},
  },
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
