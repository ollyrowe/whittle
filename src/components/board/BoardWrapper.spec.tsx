import { render } from "@testing-library/react";
import BoardWrapper from "./BoardWrapper";
import MockThemeProvider from "../providers/MockThemeProvider";

describe("BoarderWrapper", () => {
  it("renders", () => {
    render(
      <MockThemeProvider>
        <BoardWrapper />
      </MockThemeProvider>
    );
  });

  it("renders a child", () => {
    const text = "example";

    const { getByText } = render(
      <MockThemeProvider>
        <BoardWrapper>{text}</BoardWrapper>
      </MockThemeProvider>
    );

    expect(getByText(text)).toBeDefined();
  });
});
