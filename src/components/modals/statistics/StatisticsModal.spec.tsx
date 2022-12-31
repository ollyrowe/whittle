import React from "react";
import { render } from "@testing-library/react";
import StatisticsModal from "./StatisticsModal";
import MockThemeProvider from "../../providers/MockThemeProvider";
import ModalProvider from "../../providers/ModalProvider";

it("renders", () => {
  render(
    <MockThemeProvider>
      <ModalProvider>
        <StatisticsModal />
      </ModalProvider>
    </MockThemeProvider>
  );
});
