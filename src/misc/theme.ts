import { createTheme, ThemeOptions } from "@mui/material";

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
    ...baseThemeOptions,
    palette: {
      mode: "light",
      primary: {
        main: colours.green,
      },
      background: {
        default: colours.white,
      },
      text: {
        primary: colours.grey,
      },
      tile: {
        default: colours.lighterGrey,
        green: enableHighContrast ? highContrastColours.orange : colours.green,
        amber: enableHighContrast ? highContrastColours.blue : colours.amber,
      },
      orange: {
        default: colours.orange,
        light: colours.orange,
        dark: colours.darkOrange,
      },
      border: colours.lighterGrey,
    },
  });
};

export const createDarkTheme = (enableHighContrast: boolean) => {
  return createTheme({
    ...baseThemeOptions,
    palette: {
      mode: "dark",
      primary: {
        main: colours.darkGreen,
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
        green: enableHighContrast
          ? highContrastColours.orange
          : colours.darkGreen,
        amber: enableHighContrast
          ? highContrastColours.blue
          : colours.darkAmber,
      },
      orange: {
        default: colours.darkOrange,
        light: colours.orange,
        dark: colours.darkOrange,
      },
      border: colours.grey,
    },
  });
};

const baseThemeOptions: ThemeOptions = {
  typography: {
    fontFamily: "Quicksand",
  },
};

const colours = {
  white: "#ffffff",
  green: "#6aaa64",
  darkGreen: "#538d4e",
  amber: "#c9b458",
  darkAmber: "#b59f3b",
  grey: "#3a3a3c",
  lightGrey: "#b7b9bc",
  lighterGrey: "#d3d6da",
  darkGrey: "#121213",
  orange: "#e59e4d",
  darkOrange: "#d38a3a",
};

const highContrastColours = {
  blue: "#85c0f9",
  orange: "#f5793a",
};

const prefersDarkTheme = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches;

export type ThemeMode = "light" | "dark" | "system";
