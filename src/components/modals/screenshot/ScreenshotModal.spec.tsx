import React from "react";
import { render } from "@testing-library/react";
import ScreenshotModal from "./ScreenshotModal";
import MockThemeProvider from "../../providers/MockThemeProvider";
import ModalProvider from "../../providers/ModalProvider";

it("renders", () => {
  render(
    <MockThemeProvider>
      <ModalProvider>
        <ScreenshotModal />
      </ModalProvider>
    </MockThemeProvider>
  );
});
