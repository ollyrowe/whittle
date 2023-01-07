import React from "react";
import { render } from "@testing-library/react";
import ShareModal from "./ShareModal";
import MockThemeProvider from "../../providers/MockThemeProvider";
import ModalProvider from "../../providers/ModalProvider";

it("renders", () => {
  render(
    <MockThemeProvider>
      <ModalProvider>
        <ShareModal />
      </ModalProvider>
    </MockThemeProvider>
  );
});
