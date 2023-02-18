import React from "react";
import { render } from "@testing-library/react";
import ScoreInfoModal from "./ScoreInfoModal";
import MockThemeProvider from "../../providers/MockThemeProvider";
import ModalProvider from "../../providers/ModalProvider";

it("renders", () => {
  render(
    <MockThemeProvider>
      <ModalProvider>
        <ScoreInfoModal />
      </ModalProvider>
    </MockThemeProvider>
  );
});
