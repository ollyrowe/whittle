import React from "react";
import { render } from "@testing-library/react";
import GameProvider, { GameContextProps } from "./GameProvider";
import { Board } from "../../model/Board";
import { Rack } from "../../model/Rack";
import { defaultSettings } from "../../hooks/useSettings";
import { createLightTheme } from "../../misc/theme";

const mockGame: GameContextProps = {
  board: new Board(),
  rack: new Rack([]),
  onSwapTiles: () => {},
  displayStats: false,
  openStats: () => {},
  closeStats: () => {},
  getNewIndex: () => -1,
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
