import React from "react";
import { render } from "@testing-library/react";
import Modal from "./Modal";
import MockThemeProvider from "../providers/MockThemeProvider";

it("renders", () => {
  render(
    <MockThemeProvider>
      <Modal title="Title" open={true} onClose={() => {}}>
        <div>Contents</div>
      </Modal>
    </MockThemeProvider>
  );
});
