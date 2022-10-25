import { render } from "@testing-library/react";
import BoardWrapper from "./BoardWrapper";

describe("BoarderWrapper", () => {
  it("renders", () => {
    render(<BoardWrapper />);
  });

  it("renders a child", () => {
    const text = "example";

    const { getByText } = render(<BoardWrapper>{text}</BoardWrapper>);

    expect(getByText(text)).toBeDefined();
  });
});
