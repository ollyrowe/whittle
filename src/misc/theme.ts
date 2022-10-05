import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#9f7060",
    },
    background: {
      default: "#ffffff",
    },
    text: {
      primary: "#3a3a3c",
    },
    tile: {
      default: "#d3d6da",
      green: "#6aaa64",
      amber: "#c9b458",
    },
    border: "#d3d6da",
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#9f7060",
    },
    background: {
      default: "#121213",
    },
    text: {
      primary: "#ffffff",
    },
    tile: {
      default: "#b7b9bc",
      green: "#538d4e",
      amber: "#b59f3b",
    },
    border: "#3a3a3c",
  },
});
