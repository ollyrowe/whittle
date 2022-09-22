import React from "react";
import { render } from "@testing-library/react";
import Modal from "./Modal";

it("renders", () => {
  render(
    <Modal title="Title" open={true} onClose={() => {}}>
      <div>Contents</div>
    </Modal>
  );
});
