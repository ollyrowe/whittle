import { createTheme } from "@mui/material";

/**
 * Gets the theme based on the desired mode and high-contrast preference.
 *
 * @param mode - the theme mode.
 * @param enableHighContrast - whether high-contrast colours should be used.
 * @returns the desired theme.
 */
export const getTheme = (mode: ThemeMode, enableHighContrast: boolean) => {
  switch (mode) {
    case "light":
      return createLightTheme(enableHighContrast);
    case "dark":
      return createDarkTheme(enableHighContrast);
    case "system":
      return prefersDarkTheme
        ? createDarkTheme(enableHighContrast)
        : createLightTheme(enableHighContrast);
  }
};

export const createLightTheme = (enableHighContrast: boolean) => {
  return createTheme({
    palette: {
      mode: "light",
      primary: {
        main: colours.brown,
      },
      background: {
        default: colours.white,
      },
      text: {
        primary: colours.grey,
      },
      tile: {
        default: colours.lighterGrey,
        green: enableHighContrast ? colours.orange : colours.green,
        amber: enableHighContrast ? colours.blue : colours.amber,
      },
      border: colours.lighterGrey,
    },
  });
};

export const createDarkTheme = (enableHighContrast: boolean) => {
  return createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: colours.brown,
      },
      background: {
        default: colours.darkGrey,
        paper: colours.darkGrey,
      },
      text: {
        primary: colours.white,
      },
      tile: {
        default: colours.lightGrey,
        green: enableHighContrast ? colours.orange : colours.darkGreen,
        amber: enableHighContrast ? colours.blue : colours.darkAmber,
      },
      border: colours.grey,
    },
  });
};

const colours = {
  white: "#ffffff",
  green: "#6aaa64",
  darkGreen: "#538d4e",
  amber: "#c9b458",
  darkAmber: "#b59f3b",
  blue: "#85c0f9",
  orange: "#f5793a",
  brown: "#9f7060",
  grey: "#3a3a3c",
  lightGrey: "#b7b9bc",
  lighterGrey: "#d3d6da",
  darkGrey: "#121213",
};

const prefersDarkTheme = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches;

export type ThemeMode = "light" | "dark" | "system";
