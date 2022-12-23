import React from "react";
import { render } from "@testing-library/react";
import Game from "./Game";
import useSettings from "./hooks/useSettings";

it("renders", () => {
  render(<MockGame />);
});

const MockGame = () => {
  const settings = useSettings();

  return <Game settings={settings} />;
};
