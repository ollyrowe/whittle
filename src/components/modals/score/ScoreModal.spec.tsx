import React from "react";
import { render } from "@testing-library/react";
import ScoreModal from "./ScoreModal";
import MockThemeProvider from "../../providers/MockThemeProvider";
import ModalProvider from "../../providers/ModalProvider";

it("renders", () => {
  render(
    <MockThemeProvider>
      <ModalProvider>
        <ScoreModal />
      </ModalProvider>
    </MockThemeProvider>
  );
});
