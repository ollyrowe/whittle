import React from "react";
import { render } from "@testing-library/react";
import SettingsModal from "./SettingsModal";
import MockThemeProvider from "../providers/MockThemeProvider";

it("renders", () => {
  render(
    <MockThemeProvider>
      <SettingsModal open={true} onClose={() => {}} />
    </MockThemeProvider>
  );
});
