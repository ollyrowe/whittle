import React from "react";
import { render } from "@testing-library/react";
import SettingsModal from "./SettingsModal";
import MockThemeProvider from "../../providers/MockThemeProvider";
import ModalProvider from "../../providers/ModalProvider";

it("renders", () => {
  render(
    <MockThemeProvider>
      <ModalProvider>
        <SettingsModal />
      </ModalProvider>
    </MockThemeProvider>
  );
});
