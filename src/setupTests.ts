import "@testing-library/jest-dom";

jest.mock("@mui/material", () => {
  const originalModule = jest.requireActual("@mui/material");

  return {
    __esModule: true,
    ...originalModule,
    useMediaQuery: () => true,
  };
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
