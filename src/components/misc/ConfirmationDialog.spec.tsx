import React from "react";
import { render } from "@testing-library/react";
import ConfirmationDialog from "./ConfirmationDialog";
import MockThemeProvider from "../providers/MockThemeProvider";

it("renders", () => {
  render(
    <MockThemeProvider>
      <ConfirmationDialog
        open={true}
        title="title"
        text="text"
        onConfirm={() => {}}
        onReject={() => {}}
      />
    </MockThemeProvider>
  );
});
