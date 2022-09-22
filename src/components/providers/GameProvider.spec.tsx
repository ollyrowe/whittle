import React from "react";
import { render } from "@testing-library/react";
import GameProvider from "./GameProvider";
import { Board } from "../../model/Board";
import { Rack } from "../../model/Rack";

const mockGame = {
  board: new Board(),
  rack: new Rack([]),
  onSwapTiles: () => {},
  displayStats: false,
  openStats: () => {},
  closeStats: () => {},
  getNewIndex: () => -1,
};

it("renders", () => {
  render(<GameProvider game={mockGame} />);
});
