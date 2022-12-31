import React from "react";
import { render } from "@testing-library/react";
import NotificationProvider from "./NotificationProvider";

it("renders", () => {
  render(<NotificationProvider />);
});
