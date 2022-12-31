import React from "react";
import { render } from "@testing-library/react";
import HowToPlayModal from "./HowToPlayModal";
import MockThemeProvider from "../../providers/MockThemeProvider";
import ModalProvider from "../../providers/ModalProvider";

it("renders", () => {
  render(
    <MockThemeProvider>
      <ModalProvider>
        <HowToPlayModal />
      </ModalProvider>
    </MockThemeProvider>
  );
});
